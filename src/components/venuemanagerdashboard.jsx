import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
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
  Menu,
  X,
  Upload,
  Camera,
} from "lucide-react";

const VenueManagerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookingsFilter, setBookingsFilter] = useState("pending"); // pending or confirmed

  // נתוני דוגמה
  const [bookings] = useState([
    {
      id: 1,
      clientName: "משפחת כהן",
      eventDate: "2026-03-15",
      guests: 250,
      status: "confirmed",
      package: "חבילת זהב",
      bookedDate: "2026-01-10",
    },
    {
      id: 2,
      clientName: "משפחת לוי",
      eventDate: "2026-04-20",
      guests: 180,
      status: "pending",
      package: "חבילת כסף",
      bookedDate: "2026-01-15",
    },
    {
      id: 3,
      clientName: "משפחת מזרחי",
      eventDate: "2026-05-10",
      guests: 300,
      status: "confirmed",
      package: "חבילת זהב",
      bookedDate: "2026-01-20",
    },
    {
      id: 4,
      clientName: "משפחת אברהם",
      eventDate: "2026-03-01",
      guests: 150,
      status: "cancelled",
      package: "חבילת כסף",
      bookedDate: "2025-12-25",
    },
    {
      id: 5,
      clientName: "משפחת דוד",
      eventDate: "2026-06-12",
      guests: 220,
      status: "pending",
      package: "חבילת זהב",
      bookedDate: "2026-01-25",
    },
    {
      id: 6,
      clientName: "משפחת שמעון",
      eventDate: "2026-07-08",
      guests: 190,
      status: "confirmed",
      package: "חבילת כסף",
      bookedDate: "2026-01-28",
    },
  ]);

  const [venueImages, setVenueImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519167758481-83f29da8ba0a?w=400&h=300&fit=crop",
      title: "אולם ראשי",
      uploadDate: "2026-01-15",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      title: "גן אירועים",
      uploadDate: "2026-01-16",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop",
      title: "במה מרכזית",
      uploadDate: "2026-01-17",
    },
  ]);

  const stats = {
    totalBookings: bookings.filter((b) => b.status !== "cancelled").length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
  };

  const filteredBookingsList = bookings.filter(
    (b) => b.status === bookingsFilter,
  );

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
      confirmed: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
      pending: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />,
      cancelled: <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
    };

    const labels = {
      confirmed: "מאושר",
      pending: "ממתין",
      cancelled: "מבוטל",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${styles[status]}`}
      >
        {icons[status]}
        <span className="hidden sm:inline">{labels[status]}</span>
        <span className="sm:hidden">{labels[status].slice(0, 3)}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("he-IL", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // כאן תוכל להוסיף לוגיקה להעלאת התמונות לשרת
      console.log("Uploading images:", files);
      alert("תמונות הועלו בהצלחה!");
    }
  };

  const handleDeleteImage = (imageId) => {
    if (confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) {
      setVenueImages(venueImages.filter((img) => img.id !== imageId));
    }
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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg z-40">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Home className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">אולם ורסאי</h2>
          </div>
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-full w-64 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6 shadow-xl z-50 transition-transform duration-300 ${
          isSidebarOpen ? "right-0" : "-right-64"
        } lg:right-0 lg:translate-x-0`}
      >
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
            onClick={() => {
              setActiveTab("overview");
              setIsSidebarOpen(false);
            }}
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
            onClick={() => {
              navigate("/bookingspage");
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
          >
            <Calendar className="w-5 h-5" />
            הזמנות
          </button>

          <button
            onClick={() => {
              setActiveTab("images");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "images"
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            ניהול תמונות
          </button>

          <button
            onClick={() => {
              navigate("/venuesettingspage");
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
          >
            <Settings className="w-5 h-5" />
            הגדרות אולם
          </button>

          <button
            onClick={() => {
              navigate("/reviewsandmessagespage");
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
          >
            <MessageSquare className="w-5 h-5" />
            ביקורות והודעות
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
      <main className="lg:mr-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {/* Desktop Header */}
        <header className="mb-6 sm:mb-8 hidden lg:block">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                שלום, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                הנה מה שקורה באולם שלך היום
              </p>
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

        {/* Mobile Welcome */}
        <div className="lg:hidden mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            שלום, {user.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-gray-600">הנה מה שקורה באולם שלך היום</p>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-t-4 border-blue-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="w-full">
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                      סה"כ הזמנות
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stats.totalBookings}
                    </p>
                  </div>
                  <div className="hidden sm:block bg-blue-100 p-3 rounded-full mt-2 sm:mt-0">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-t-4 border-yellow-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="w-full">
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                      ממתינות
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stats.pendingBookings}
                    </p>
                  </div>
                  <div className="hidden sm:block bg-yellow-100 p-3 rounded-full mt-2 sm:mt-0">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-t-4 border-green-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="w-full">
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                      מאושרות
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stats.confirmedBookings}
                    </p>
                  </div>
                  <div className="hidden sm:block bg-green-100 p-3 rounded-full mt-2 sm:mt-0">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/bookings")}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold mb-1">הזמנות בהמתנה</h3>
                    <p className="text-yellow-100">
                      {stats.pendingBookings} הזמנות ממתינות לאישור
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate("/bookings")}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold mb-1">הזמנות מאושרות</h3>
                    <p className="text-green-100">
                      {stats.confirmedBookings} הזמנות מאושרות
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("images")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold mb-1">העלאת תמונות</h3>
                    <p className="text-purple-100">
                      {venueImages.length} תמונות באולם
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  ניהול הזמנות
                </h2>
                <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  הזמנה חדשה
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setBookingsFilter("pending")}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all ${
                    bookingsFilter === "pending"
                      ? "bg-yellow-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>בהמתנה ({stats.pendingBookings})</span>
                  </div>
                </button>
                <button
                  onClick={() => setBookingsFilter("confirmed")}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all ${
                    bookingsFilter === "confirmed"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>מאושרות ({stats.confirmedBookings})</span>
                  </div>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="חיפוש לקוח..."
                    className="w-full pr-9 sm:pr-10 pl-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hidden lg:block">
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
                      סטטוס
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      פעולות
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookingsList.map((booking) => (
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filteredBookingsList.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-gray-500">
                        #{booking.id}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm mt-0.5">
                        {booking.clientName}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {formatDate(booking.eventDate)}
                      </p>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-3.5 h-3.5" />
                      <span>{booking.guests} אורחים</span>
                    </div>
                    <div className="text-gray-600">
                      <span>{booking.package}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                    <button className="p-1.5 text-blue-600 bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-green-600 bg-green-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-red-600 bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBookingsList.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  אין הזמנות{" "}
                  {bookingsFilter === "pending" ? "בהמתנה" : "מאושרות"}
                </h3>
                <p className="text-gray-600">
                  {bookingsFilter === "pending"
                    ? "כל ההזמנות אושרו או שאין הזמנות חדשות"
                    : "עדיין אין הזמנות מאושרות"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                העלאת תמונות לאולם
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="bg-purple-100 p-6 rounded-full mb-4">
                    <Upload className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    גרור קבצים לכאן או לחץ להעלאה
                  </h3>
                  <p className="text-gray-600 text-sm">PNG, JPG, GIF עד 10MB</p>
                  <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all">
                    בחר תמונות
                  </button>
                </label>
              </div>
            </div>

            {/* Images Grid */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                תמונות קיימות ({venueImages.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {venueImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium">
                        {image.title}
                      </p>
                      <p className="text-white/80 text-xs">
                        {formatDateShort(image.uploadDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Venue Settings Tab */}
        {activeTab === "venue-settings" && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              הגדרות אולם
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם האולם
                </label>
                <input
                  type="text"
                  defaultValue="אולם ורסאי"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור
                </label>
                <textarea
                  rows="4"
                  defaultValue="אולם יוקרתי בלב תל אביב, עם עיצוב קלאסי ושירות ברמה הגבוהה ביותר"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-sm sm:text-base"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מינימום אורחים
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מקסימום אורחים
                  </label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base">
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              הודעות
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 sm:mb-2 gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        שאלה מ- משפחת כהן
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                        לפני שעה
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                      שלום, אני מעוניין לדעת אם יש אפשרות להזמין DJ נוסף...
                    </p>
                  </div>
                  <span className="bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
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
