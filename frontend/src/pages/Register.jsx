import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md px-4"
      >
        {/* Logo/Brand Section */}
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-3xl mb-4">
            <span className="text-5xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Style AI</h1>
          <p className="text-purple-200/80">Start Your Fashion Journey Today</p>
        </motion.div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl">
            {/* Card Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-10" />
            
            {/* Decorative Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600" />
            
            <CardContent className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Sign up to get personalized style recommendations
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <span>👤</span> Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 bg-white/80"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <span>📧</span> Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 bg-white/80"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <span>🔒</span> Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-12 rounded-xl border-2 border-slate-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 bg-white/80"
                    required
                  />
                </div>

                {/* Password Requirements Hint */}
                <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
                  <p className="flex items-center gap-1 mb-1">
                    <span className="text-green-500">✓</span> At least 8 characters
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Include letters and numbers
                  </p>
                </div>

                {/* Register Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✨</span> Create Account
                  </span>
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-400">Already registered?</span>
                </div>
              </div>

              {/* Login Link Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full h-12 border-2 border-purple-200 hover:border-purple-400 text-purple-600 hover:text-purple-700 rounded-xl font-semibold transition-all duration-300 bg-transparent hover:bg-purple-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>🚀</span> Sign In Instead
                  </span>
                </Button>
              </motion.div>

              {/* Terms */}
              <p className="text-xs text-center text-slate-400 mt-6">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-sm text-purple-200/60"
        >
          <p>© 2024 Style AI. All rights reserved.</p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Register;