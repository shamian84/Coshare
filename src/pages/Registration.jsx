import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields required");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be 6+ characters");
    }

    const toastId = toast.loading("Creating your account...");

    try {
      setLoading(true);
      const res = await api.post("/api/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome to CoShare! ", { id: toastId });
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="w-full max-w-105 z-10">
        <form
          onSubmit={submit}
          className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xl space-y-5 transition-all"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Join CoShare
            </h2>
            <p className="text-gray-500 text-sm">
              Start sharing and managing your files securely
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="pl-10 w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="pl-10 w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 ml-1 uppercase tracking-wider font-bold">
                Minimum 6 characters
              </p>
            </div>
          </div>

          <button
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-semibold transition-all flex justify-center gap-2 items-center shadow-lg shadow-blue-500/20 mt-2
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <UserPlus size={20} />
            )}
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="pt-2 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline underline-offset-4 transition-all"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-400 text-xs uppercase tracking-widest font-medium">
          Start your journey with CoShare
        </p>
      </div>
    </div>
  );
}
