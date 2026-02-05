import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Home,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react";

const VenueManagerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // נתוני דוגמה
  const [bookings] = useState([
    {
      id: 1,
      clientName: "משפחת כהן",
      eventDate: "2026-03-15",
      guests: 250,
      status: "confirmed",
      package: "חבילת זהב",
      totalPrice: 150000,
      bookedDate: "2026-01-10",
    },
    {
      id: 2,
      clientName: "משפחת לוי",
      eventDate: "2026-04-20",
      guests: 180,
      status: "pending",
      package: "חבילת כסף",
      totalPrice: 81000,
      bookedDate: "2026-01-15",
    },
    {
      id: 3,
      clientName: "משפחת מזרחי",
      eventDate: "2026-05-10",
      guests: 300,
      status: "confirmed",
      package: "חבילת זהב",
      totalPrice: 180000,
      bookedDate: "2026-01-20",
    },
    {
      id: 4,
      clientName: "משפחת אברהם",
      eventDate: "2026-03-01",
      guests: 150,
      status: "cancelled",
      package: "חבילת כסף",
      totalPrice: 67500,
      bookedDate: "2025-12-25",
    },
  ]);

  const stats = {
    totalBookings: bookings.filter((b) => b.status !== "cancelled").length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    totalRevenue: bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  };

  useEffect(() => {
    // בדיקה אם המשתמש מחובר
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== "venue") {
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
      confirmed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      confirmed: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    };

    const labels = {
      confirmed: "מאושר",
      pending: "ממתין",
      cancelled: "מבוטל",
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
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
      <aside className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6 shadow-xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">אולם ורסאי</h2>
          </div>
          <p className="text-purple-100 text-sm">מנהל: {user.name}</p>
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
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "bookings"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <Calendar className="w-5 h-5" />
            הזמנות
          </button>

          <button
            onClick={() => setActiveTab("venue-settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "venue-settings"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <Settings className="w-5 h-5" />
            הגדרות אולם
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "messages"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            הודעות
            <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              3
            </span>
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
                שלום, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600">הנה מה שקורה באולם שלך היום</p>
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
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      סה"כ הזמנות
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.totalBookings}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      ממתינות לאישור
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.pendingBookings}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">מאושרות</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.confirmedBookings}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
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
                      {formatPrice(stats.totalRevenue)}
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                הזמנות אחרונות
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        לקוח
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        תאריך אירוע
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        אורחים
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        חבילה
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        סטטוס
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        פעולות
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {booking.clientName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatDate(booking.eventDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {booking.guests}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {booking.package}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ניהול הזמנות
                </h2>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  הזמנה חדשה
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="חיפוש לקוח..."
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                  <option value="all">כל הסטטוסים</option>
                  <option value="confirmed">מאושר</option>
                  <option value="pending">ממתין</option>
                  <option value="cancelled">מבוטל</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      מס׳
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      לקוח
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      תאריך אירוע
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      אורחים
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      חבילה
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      מחיר
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
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-purple-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{booking.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {booking.clientName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(booking.eventDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {booking.guests}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {booking.package}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatPrice(booking.totalPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(booking.status)}
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

        {/* Venue Settings Tab */}
        {activeTab === "venue-settings" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              הגדרות אולם
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם האולם
                </label>
                <input
                  type="text"
                  defaultValue="אולם ורסאי"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור
                </label>
                <textarea
                  rows="4"
                  defaultValue="אולם יוקרתי בלב תל אביב, עם עיצוב קלאסי ושירות ברמה הגבוהה ביותר"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מינימום אורחים
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מקסימום אורחים
                  </label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">הודעות</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        שאלה מ- משפחת כהן
                      </h3>
                      <span className="text-sm text-gray-500">לפני שעה</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      שלום, אני מעוניין לדעת אם יש אפשרות להזמין DJ נוסף...
                    </p>
                  </div>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    חדש
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VenueManagerDashboard;
