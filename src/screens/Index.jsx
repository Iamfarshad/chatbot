import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  // 🔥 Auto-Navigate After 5 Seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("⏳ 5 seconds completed → Navigating to /Auth");
      navigate("/Auth");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">

      {/* Glowing Circles */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Main Content */}
      <div className="text-center space-y-10 px-4 relative z-10">

        {/* AI Floating Orb */}
        <div className="relative w-44 h-44 mx-auto">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl animate-pulse"></div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/70 to-primary/40 backdrop-blur-xl border border-primary/40 shadow-2xl flex items-center justify-center animate-float">
            <MessageSquare className="h-16 w-16 text-white opacity-90" />
          </div>

          {/* ChatGPT-style breathing wave */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-wave"></div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/70">
          Your AI Companion
        </h1>

        <p className="text-lg text-gray-300 max-w-md mx-auto">
          Preparing your experience…
        </p>
      </div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes wave {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { opacity: 0; }
        }
        .animate-wave {
          animation: wave 2.5s infinite ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
