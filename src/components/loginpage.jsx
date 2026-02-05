import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  Shield,
  ArrowRight,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("venue"); // venue / admin
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // נתוני משתמשים לדוגמה (בפרודקשן יגיעו מה-API)
  const users = {
    venue: {
      email: "venue@example.com",
      password: "123456",
      name: "מנהל אולם ורסאי",
      venueId: 1,
    },
    admin: {
      email: "admin@example.com",
      password: "admin123",
      name: "מנהל מערכת",
    },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // סימולציה של בדיקת התחברות
    setTimeout(() => {
      const user = users[userType];

      if (email === user.email && password === user.password) {
        // שמירת פרטי המשתמש ב-localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            name: user.name,
            type: userType,
            venueId: user.venueId,
          }),
        );

        // ניווט לדף המתאים
        if (userType === "venue") {
          navigate("/venue-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else {
        setError("אימייל או סיסמה שגויים");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
        חזרה לדף הבית
      </button>

      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            כניסה למערכת
          </h1>
          <p className="text-gray-600">התחבר לחשבון שלך כדי לנהל את האולמות</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setUserType("venue")}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === "venue"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <Building2
                className={`w-8 h-8 mx-auto mb-2 ${
                  userType === "venue" ? "text-purple-600" : "text-gray-400"
                }`}
              />
              <p
                className={`font-semibold ${
                  userType === "venue" ? "text-purple-600" : "text-gray-600"
                }`}
              >
                מנהל אולם
              </p>
            </button>

            <button
              onClick={() => setUserType("admin")}
              className={`p-4 rounded-xl border-2 transition-all ${
                userType === "admin"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <Shield
                className={`w-8 h-8 mx-auto mb-2 ${
                  userType === "admin" ? "text-purple-600" : "text-gray-400"
                }`}
              />
              <p
                className={`font-semibold ${
                  userType === "admin" ? "text-purple-600" : "text-gray-600"
                }`}
              >
                מנהל מערכת
              </p>
            </button>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-semibold mb-2">
              פרטי התחברות לדוגמה:
            </p>
            {userType === "venue" ? (
              <div className="text-sm text-blue-700">
                <p>📧 אימייל: venue@example.com</p>
                <p>🔒 סיסמה: 123456</p>
              </div>
            ) : (
              <div className="text-sm text-blue-700">
                <p>📧 אימייל: admin@example.com</p>
                <p>🔒 סיסמה: admin123</p>
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אימייל
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="mr-2 text-sm text-gray-600">זכור אותי</span>
              </label>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                שכחת סיסמה?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "מתחבר..." : "התחבר"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">או</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              אין לך חשבון?{" "}
              <a
                href="#"
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                הירשם עכשיו
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2026 מערכת ניהול אולמות חתונה
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
