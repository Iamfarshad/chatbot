import { useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const fakeSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // ⬇️ Navigation logic after signup / login
      if (mode === "signup") {
        navigate("/Chat");
      }
      if (mode === "login") {
        navigate("/Chat");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background glowing circles */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -top-32 -left-20 animate-pulse" />
      <div className="absolute w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl bottom-10 right-10" />

      {/* AI Orb */}
      <div className="absolute top-20 w-full flex justify-center z-10">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse"></div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/70 to-primary/40 backdrop-blur-xl border border-primary/40 shadow-xl flex items-center justify-center animate-float">
            <MessageSquare className="h-10 w-10 text-white opacity-90" />
          </div>

          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-wave"></div>
        </div>
      </div>

      {/* Glass Card */}
      <div className="relative z-10 mt-44 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/60">
          {mode === "login" && "Welcome Back"}
          {mode === "signup" && "Create Account"}
          {mode === "forgot" && "Reset Password"}
        </h2>

        <p className="text-gray-300 text-center mt-2 mb-6">
          {mode === "login" && "Sign in to continue your AI experience"}
          {mode === "signup" && "Start your journey with our AI"}
          {mode === "forgot" && "We'll send you a reset link"}
        </p>

        {/* Form */}
        <form onSubmit={fakeSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Full Name</label>
              <input
                className="bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Email</label>
            <input
              className="bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode !== "forgot" && (
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Password</label>
              <input
                className="bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading && (
              <Loader2 className="inline-block h-5 w-5 animate-spin mr-2" />
            )}
            {mode === "login" && "Sign In"}
            {mode === "signup" && "Sign Up"}
            {mode === "forgot" && "Send Reset Link"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm space-y-2">
          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("forgot")}
                className="text-primary hover:underline"
              >
                Forgot password?
              </button>
              <div>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {mode === "signup" && (
            <div>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-primary hover:underline"
              >
                Sign In
              </button>
            </div>
          )}

          {mode === "forgot" && (
            <button
              onClick={() => setMode("login")}
              className="text-primary hover:underline"
            >
              Back to Sign In
            </button>
          )}
        </div>
      </div>

      {/* Animations */}
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

export default Auth;
