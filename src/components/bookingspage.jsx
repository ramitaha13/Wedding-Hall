import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Bell,
  LogOut,
  Home,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Settings,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
  Menu,
  X,
} from "lucide-react";

const BookingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookingsFilter, setBookingsFilter] = useState("all"); // all, pending, confirmed
  const [searchTerm, setSearchTerm] = useState("");

  // נתוני דוגמה להזמנות
  const [bookings] = useState([
    {
      id: 1,
      clientName: "משפחת כהן",
      eventDate: "2026-03-15",
      guests: 250,
      status: "confirmed",
      package: "חבילת זהב",
      bookedDate: "2026-01-10",
      phone: "050-1234567",
      email: "cohen@example.com",
      eventType: "חתונה",
    },
    {
      id: 2,
      clientName: "משפחת לוי",
      eventDate: "2026-04-20",
      guests: 180,
      status: "pending",
      package: "חבילת כסף",
      bookedDate: "2026-01-15",
      phone: "052-9876543",
      email: "levi@example.com",
      eventType: "אירוסין",
    },
    {
      id: 3,
      clientName: "משפחת מזרחי",
      eventDate: "2026-05-10",
      guests: 300,
      status: "confirmed",
      package: "חבילת זהב",
      bookedDate: "2026-01-20",
      phone: "054-5555555",
      email: "mizrachi@example.com",
      eventType: "חתונה",
    },
    {
      id: 4,
      clientName: "משפחת אברהם",
      eventDate: "2026-03-01",
      guests: 150,
      status: "cancelled",
      package: "חבילת כסף",
      bookedDate: "2025-12-25",
      phone: "053-7777777",
      email: "avraham@example.com",
      eventType: "בר מצווה",
    },
    {
      id: 5,
      clientName: "משפחת דוד",
      eventDate: "2026-06-12",
      guests: 220,
      status: "pending",
      package: "חבילת זהב",
      bookedDate: "2026-01-25",
      phone: "050-8888888",
      email: "david@example.com",
      eventType: "חתונה",
    },
    {
      id: 6,
      clientName: "משפחת שמעון",
      eventDate: "2026-07-08",
      guests: 190,
      status: "confirmed",
      package: "חבילת כסף",
      bookedDate: "2026-01-28",
      phone: "052-4444444",
      email: "shimon@example.com",
      eventType: "אירוסין",
    },
    {
      id: 7,
      clientName: "משפחת יעקב",
      eventDate: "2026-08-15",
      guests: 280,
      status: "pending",
      package: "חבילת זהב",
      bookedDate: "2026-02-01",
      phone: "054-3333333",
      email: "yaakov@example.com",
      eventType: "חתונה",
    },
    {
      id: 8,
      clientName: "משפחת רחל",
      eventDate: "2026-09-20",
      guests: 160,
      status: "confirmed",
      package: "חבילת כסף",
      bookedDate: "2026-02-03",
      phone: "050-2222222",
      email: "rachel@example.com",
      eventType: "בת מצווה",
    },
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };

    const icons = {
      confirmed: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    };

    const labels = {
      confirmed: "מאושר",
      pending: "ממתין לאישור",
      cancelled: "מבוטל",
    };

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border-2 ${styles[status]}`}
      >
        {icons[status]}
        {labels[status]}
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
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // סינון הזמנות
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      bookingsFilter === "all" || booking.status === bookingsFilter;
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // סטטיסטיקות
  const stats = {
    total: bookings.filter((b) => b.status !== "cancelled").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
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

  const handleDeleteBooking = (bookingId) => {
    if (confirm("האם אתה בטוח שברצונך למחוק הזמנה זו?")) {
      console.log("Deleting booking:", bookingId);
      alert("ההזמנה נמחקה בהצלחה!");
    }
  };

  const handleEditBooking = (bookingId) => {
    console.log("Editing booking:", bookingId);
    alert("מעבר לעמוד עריכת הזמנה #" + bookingId);
  };

  const handleViewDetails = (bookingId) => {
    console.log("Viewing booking details:", bookingId);
    alert("מעבר לפרטי הזמנה #" + bookingId);
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
              navigate("/venuemanagerdashboard");
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
          >
            <BarChart3 className="w-5 h-5" />
            סקירה כללית
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-white/20 font-semibold">
            <Calendar className="w-5 h-5" />
            הזמנות
          </button>

          <button
            onClick={() => {
              navigate("/dashboard");
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
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
            ביקורת והודעות
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
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                ניהול הזמנות
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                אולם ורסאי - כל ההזמנות במקום אחד
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow hidden lg:block">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 left-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden sm:flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow hover:shadow-md transition-shadow text-gray-700 font-medium"
              >
                <Home className="w-5 h-5" />
                <span>דשבורד</span>
              </button>
            </div>
          </div>
        </header>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  סה"כ הזמנות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
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
                <p className="text-gray-600 text-sm font-medium mb-1">בהמתנה</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.pending}
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
                <p className="text-gray-600 text-sm font-medium mb-1">
                  מאושרות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.confirmed}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  מבוטלות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.cancelled}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBookingsFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  bookingsFilter === "all"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                הכל ({stats.total})
              </button>
              <button
                onClick={() => setBookingsFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  bookingsFilter === "pending"
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                בהמתנה ({stats.pending})
              </button>
              <button
                onClick={() => setBookingsFilter("confirmed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  bookingsFilter === "confirmed"
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                מאושרות ({stats.confirmed})
              </button>
              <button
                onClick={() => setBookingsFilter("cancelled")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  bookingsFilter === "cancelled"
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                מבוטלות ({stats.cancelled})
              </button>
            </div>

            <button className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              הזמנה חדשה
            </button>
          </div>

          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="חיפוש לפי שם לקוח, טלפון או אימייל..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Bookings Cards Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-r-4 border-purple-500"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500 font-medium">
                          הזמנה #{booking.id}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-purple-600 font-medium">
                          {booking.eventType}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {booking.clientName}
                      </h3>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">
                      תאריך האירוע: {formatDate(booking.eventDate)}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600 font-medium">
                          מספר אורחים
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {booking.guests}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600 font-medium">
                          חבילה
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {booking.package}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Phone className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Mail className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </div>
                      <span>
                        תאריך הזמנה: {formatDateShort(booking.bookedDate)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleViewDetails(booking.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                      <Eye className="w-5 h-5" />
                      <span className="hidden sm:inline">צפייה</span>
                    </button>
                    <button
                      onClick={() => handleEditBooking(booking.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                    >
                      <Edit className="w-5 h-5" />
                      <span className="hidden sm:inline">עריכה</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="hidden sm:inline">מחיקה</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              לא נמצאו הזמנות
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "נסה לשנות את מילות החיפוש"
                : "אין הזמנות מסוג זה כרגע"}
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              צור הזמנה חדשה
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingsPage;
