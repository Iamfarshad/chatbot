import os
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaLLM


# -------------------------
# 1. CHAT SAVE FOLDER
# -------------------------
CHAT_DIR = "backend/chats"
os.makedirs(CHAT_DIR, exist_ok=True)

chat_filename = datetime.datetime.now().strftime("chat_%Y-%m-%d_%H-%M-%S.txt")
chat_filepath = os.path.join(CHAT_DIR, chat_filename)

def save_chat(user, ai):
    with open(chat_filepath, "a", encoding="utf-8") as f:
        f.write(f"User: {user}\nAI: {ai}\n")
        f.write("-" * 50 + "\n")


# -------------------------
# 2. FASTAPI APP
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# 3. BUILD RAG SYSTEM ON STARTUP
# -------------------------
PDF_FOLDER = "data"
VECTOR_DIR = "vectorstore"


@app.on_event("startup")
def init_rag():

    print("\nLoading PDFs...")
    docs = []
    for file in os.listdir(PDF_FOLDER):
        if file.lower().endswith(".pdf"):
            path = os.path.join(PDF_FOLDER, file)
            print(f" → {file}")
            loader = PyPDFLoader(path)
            docs.extend(loader.load())

    print("\nChunking...")
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=100
    )
    chunks = splitter.split_documents(docs)

    print("\nEmbeddings...")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    print("\nChroma DB...")
    global retriever
    db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=VECTOR_DIR,
        collection_name="local_rag"
    )
    db.persist()
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

    print("\nLoading LLM...")
    global llm
    llm = OllamaLLM(model="llama3.2:1b")

    print("\n🔥 RAG Backend Ready")


# -------------------------
# 4. CHAT ENDPOINT
# -------------------------
@app.post("/chat")
async def chat_api(req: dict):
    question = req.get("question", "")

    retrieved_docs = retriever.invoke(question)
    context = "\n\n---\n\n".join(doc.page_content for doc in retrieved_docs)

    prompt = f"""
    You are an expert AI assistant. Use ONLY the context below to answer the question.

    ### CONTEXT
    {context}

    ### QUESTION
    {question}

    ### ANSWER
    """

    answer = llm.invoke(prompt)

    save_chat(question, answer)

    return {"answer": answer}
