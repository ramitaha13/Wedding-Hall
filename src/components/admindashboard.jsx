import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MessageSquare,
  FileText,
  Download,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // נתוני דוגמה
  const [venues] = useState([
    {
      id: 1,
      name: "אולם ורסאי",
      location: "תל אביב",
      manager: "יוסי כהן",
      status: "active",
      bookings: 15,
      revenue: 450000,
      rating: 4.9,
    },
    {
      id: 2,
      name: "גן האירועים הקסום",
      location: "הרצליה",
      manager: "שרה לוי",
      status: "active",
      bookings: 12,
      revenue: 380000,
      rating: 4.8,
    },
    {
      id: 3,
      name: "ארמון הזהב",
      location: "ירושלים",
      manager: "דוד מזרחי",
      status: "pending",
      bookings: 8,
      revenue: 250000,
      rating: 4.7,
    },
    {
      id: 4,
      name: "אולם המלכים",
      location: "פתח תקווה",
      manager: "רחל אברהם",
      status: "active",
      bookings: 10,
      revenue: 320000,
      rating: 4.6,
    },
  ]);

  const [systemUsers] = useState([
    {
      id: 1,
      name: "יוסי כהן",
      email: "yossi@example.com",
      role: "venue_manager",
      venue: "אולם ורסאי",
      status: "active",
      lastLogin: "2026-02-05",
    },
    {
      id: 2,
      name: "שרה לוי",
      email: "sara@example.com",
      role: "venue_manager",
      venue: "גן האירועים הקסום",
      status: "active",
      lastLogin: "2026-02-04",
    },
    {
      id: 3,
      name: "דוד מזרחי",
      email: "david@example.com",
      role: "venue_manager",
      venue: "ארמון הזהב",
      status: "pending",
      lastLogin: "2026-02-03",
    },
  ]);

  const totalStats = {
    totalVenues: venues.length,
    activeVenues: venues.filter((v) => v.status === "active").length,
    totalBookings: venues.reduce((sum, v) => sum + v.bookings, 0),
    totalRevenue: venues.reduce((sum, v) => sum + v.revenue, 0),
    totalUsers: systemUsers.length,
    activeUsers: systemUsers.filter((u) => u.status === "active").length,
  };

  useEffect(() => {
    // בדיקה אם המשתמש מחובר
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "admin") {
      navigate("/login");
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      active: <CheckCircle className="w-4 h-4" />,
      pending: <AlertCircle className="w-4 h-4" />,
      inactive: <XCircle className="w-4 h-4" />,
    };

    const labels = {
      active: "פעיל",
      pending: "ממתין",
      inactive: "לא פעיל",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
      >
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 shadow-xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">ניהול מערכת</h2>
          </div>
          <p className="text-purple-100 text-sm">{user.name}</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "overview"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            סקירה כללית
          </button>

          <button
            onClick={() => setActiveTab("venues")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "venues"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <Building2 className="w-5 h-5" />
            ניהול אולמות
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "users"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <Users className="w-5 h-5" />
            ניהול משתמשים
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "reports"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <FileText className="w-5 h-5" />
            דוחות
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <Settings className="w-5 h-5" />
            הגדרות מערכת
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            התנתק
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mr-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                לוח בקרה ראשי 🎯
              </h1>
              <p className="text-gray-600">ניהול ומעקב אחר כל האולמות במערכת</p>
            </div>
            <div className="flex gap-3">
              <button className="relative p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 left-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700 font-medium"
              >
                חזרה לאתר
              </button>
            </div>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      סה"כ אולמות
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {totalStats.totalVenues}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {totalStats.activeVenues} פעילים
                    </p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Building2 className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      סה"כ משתמשים
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {totalStats.totalUsers}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {totalStats.activeUsers} פעילים
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      סה"כ הזמנות
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {totalStats.totalBookings}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      +12% מהחודש שעבר
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      סה"כ הכנסות
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {formatPrice(totalStats.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      +18% מהחודש שעבר
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Venues */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  אולמות מובילים
                </h2>
                <div className="space-y-4">
                  {venues
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((venue, idx) => (
                      <div
                        key={venue.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {venue.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {venue.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-gray-900">
                            {formatPrice(venue.revenue)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {venue.bookings} הזמנות
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  פעילות אחרונה
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">אולם חדש נוסף</p>
                      <p className="text-sm text-gray-600">
                        אולם המלכים - לפני שעתיים
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-500 p-2 rounded-full">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">הזמנה אושרה</p>
                      <p className="text-sm text-gray-600">
                        אולם ורסאי - לפני 3 שעות
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">משתמש חדש</p>
                      <p className="text-sm text-gray-600">
                        רחל אברהם - לפני 5 שעות
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Venues Tab */}
        {activeTab === "venues" && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ניהול אולמות
                </h2>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  הוסף אולם חדש
                </button>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="חיפוש אולם..."
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option value="all">כל הסטטוסים</option>
                  <option value="active">פעיל</option>
                  <option value="pending">ממתין</option>
                  <option value="inactive">לא פעיל</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      שם האולם
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      מיקום
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      מנהל
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      הזמנות
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      הכנסות
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      דירוג
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      סטטוס
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      פעולות
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {venues.map((venue) => (
                    <tr key={venue.id} className="hover:bg-indigo-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {venue.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {venue.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {venue.manager}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {venue.bookings}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatPrice(venue.revenue)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{venue.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(venue.status)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ניהול משתמשים
                </h2>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  הוסף משתמש חדש
                </button>
              </div>

              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="חיפוש משתמש..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      שם
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      אימייל
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      תפקיד
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      אולם
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      התחברות אחרונה
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      סטטוס
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      פעולות
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {systemUsers.map((systemUser) => (
                    <tr key={systemUser.id} className="hover:bg-indigo-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {systemUser.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {systemUser.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        מנהל אולם
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {systemUser.venue}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {systemUser.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(systemUser.status)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              דוחות מערכת
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-right">
                <Download className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  דוח הזמנות חודשי
                </h3>
                <p className="text-sm text-gray-600">
                  סיכום כל ההזמנות בחודש האחרון
                </p>
              </button>

              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-right">
                <Download className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">דוח הכנסות</h3>
                <p className="text-sm text-gray-600">
                  סיכום הכנסות לפי אולם ותקופה
                </p>
              </button>

              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-right">
                <Download className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  דוח ביצועים
                </h3>
                <p className="text-sm text-gray-600">
                  ניתוח ביצועי אולמות ומנהלים
                </p>
              </button>

              <button className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-right">
                <Download className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">דוח לקוחות</h3>
                <p className="text-sm text-gray-600">
                  רשימת לקוחות והזמנות שביצעו
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              הגדרות מערכת
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם המערכת
                </label>
                <input
                  type="text"
                  defaultValue="מערכת ניהול אולמות חתונה"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אימייל תמיכה
                </label>
                <input
                  type="email"
                  defaultValue="support@weddinghalls.co.il"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  עמלת מערכת (%)
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                שמור הגדרות
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
