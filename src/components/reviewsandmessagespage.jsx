import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Bell,
  Settings,
  LogOut,
  Home,
  Star,
  MessageSquare,
  Image as ImageIcon,
  Menu,
  X,
  BarChart3,
  Send,
  Trash2,
  Reply,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";

const ReviewsAndMessagesPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("reviews"); // reviews or messages

  // ביקורות לקוחות מה-VenueDetailsPage
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "שרה ויוסי כהן",
      date: "15/02/2026",
      rating: 5,
      text: "חתונה מושלמת! האולם היה מדהים והצוות היה מקצועי ומסור. תודה רבה על הכל!",
      visible: true,
      likes: 12,
      eventType: "חתונה",
    },
    {
      id: 2,
      name: "רחל ודוד לוי",
      date: "08/01/2026",
      rating: 5,
      text: "השירות היה ברמה הגבוהה ביותר, האוכל מעולה והאווירה פשוט קסומה. ממליצים בחום!",
      visible: true,
      likes: 8,
      eventType: "חתונה",
    },
    {
      id: 3,
      name: "מיכל ואבי מזרחי",
      date: "22/12/2025",
      rating: 4,
      text: "אולם יפהפה עם תשומת לב לפרטים הקטנים. האורחים היו מאוד מרוצים.",
      visible: true,
      likes: 15,
      eventType: "אירוסין",
    },
    {
      id: 4,
      name: "דני ושירה אברהם",
      date: "10/11/2025",
      rating: 5,
      text: "אירוע מושלם! הכל היה מדויק בדיוק כמו שרצינו. תודה על החוויה הנפלאה!",
      visible: false,
      likes: 6,
      eventType: "בר מצווה",
    },
    {
      id: 5,
      name: "נועה ויוסי לוי",
      date: "05/10/2025",
      rating: 5,
      text: "המקום הכי יפה לחתונה! כל פרט היה מושלם, מהאוכל ועד לשירות. ממליצים בחום!",
      visible: true,
      likes: 20,
      eventType: "חתונה",
    },
  ]);

  // הודעות מלקוחות
  const [messages, setMessages] = useState([
    {
      id: 1,
      clientName: "משפחת כהן",
      email: "cohen@example.com",
      phone: "050-1234567",
      subject: "שאלה לגבי תפריט כשרות",
      message:
        "שלום, אנחנו מעוניינים להזמין את האולם לחתונה ביוני. האם יש אפשרות לקבל תפריט כשר למהדרין? ומה המחיר לאורח?",
      date: "2026-02-06T10:30:00",
      status: "new", // new, replied, archived
      priority: "high",
    },
    {
      id: 2,
      clientName: "משפחת לוי",
      email: "levi@example.com",
      phone: "052-9876543",
      subject: "בקשה לשינוי תאריך",
      message:
        "היי, הזמנו את האולם ל-15/03 אבל יש לנו בעיה. האם אפשר לשנות ל-22/03? תודה!",
      date: "2026-02-05T15:45:00",
      status: "replied",
      priority: "medium",
      reply: "שלום, בדקנו והתאריך 22/03 פנוי. נשמח לעדכן את ההזמנה שלכם.",
    },
    {
      id: 3,
      clientName: "משפחת מזרחי",
      email: "mizrachi@example.com",
      phone: "054-5555555",
      subject: "שאלה לגבי חניה",
      message: "שלום, כמה מקומות חניה יש? האירוע שלנו יהיה עם 300 אורחים.",
      date: "2026-02-04T09:20:00",
      status: "replied",
      priority: "low",
      reply: "שלום, יש לנו חניה מקורה ל-150 רכבים ועוד חניה חיצונית.",
    },
    {
      id: 4,
      clientName: "משפחת דוד",
      email: "david@example.com",
      phone: "050-8888888",
      subject: "בקשה למידע נוסף",
      message: "מעוניינים לקבוע פגישה לסיור באולם. מתי אפשר להגיע?",
      date: "2026-02-03T14:10:00",
      status: "new",
      priority: "medium",
    },
    {
      id: 5,
      clientName: "משפחת שמעון",
      email: "shimon@example.com",
      phone: "052-4444444",
      subject: "תודה על האירוע המדהים",
      message:
        "רצינו להודות על החתונה המושלמת אתמול! הכל היה מעל ומעבר. תודה רבה!",
      date: "2026-02-02T11:00:00",
      status: "archived",
      priority: "low",
    },
  ]);

  const [replyText, setReplyText] = useState({});
  const [filterStatus, setFilterStatus] = useState("all"); // all, new, replied, archived

  useEffect(() => {
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

  const toggleReviewVisibility = (id) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, visible: !t.visible } : t,
      ),
    );
  };

  const deleteReview = (id) => {
    if (confirm("האם אתה בטוח שברצונך למחוק ביקורת זו?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleReply = (messageId) => {
    const reply = replyText[messageId];
    if (!reply || !reply.trim()) {
      alert("אנא כתוב תשובה");
      return;
    }

    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, status: "replied", reply: reply } : m,
      ),
    );

    setReplyText({ ...replyText, [messageId]: "" });
    alert("התשובה נשלחה בהצלחה!");
  };

  const archiveMessage = (messageId) => {
    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, status: "archived" } : m,
      ),
    );
  };

  const deleteMessage = (messageId) => {
    if (confirm("האם אתה בטוח שברצונך למחוק הודעה זו?")) {
      setMessages(messages.filter((m) => m.id !== messageId));
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `לפני ${diffMins} דקות`;
    if (diffHours < 24) return `לפני ${diffHours} שעות`;
    return `לפני ${diffDays} ימים`;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-green-100 text-green-800 border-green-300",
    };

    const labels = {
      high: "דחוף",
      medium: "רגיל",
      low: "נמוך",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}
      >
        {labels[priority]}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-100 text-blue-800 border-blue-300",
      replied: "bg-green-100 text-green-800 border-green-300",
      archived: "bg-gray-100 text-gray-800 border-gray-300",
    };

    const labels = {
      new: "חדש",
      replied: "נענה",
      archived: "בארכיון",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const filteredMessages =
    filterStatus === "all"
      ? messages
      : messages.filter((m) => m.status === filterStatus);

  const stats = {
    totalReviews: testimonials.length,
    visibleReviews: testimonials.filter((t) => t.visible).length,
    avgRating: (
      testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
    ).toFixed(1),
    newMessages: messages.filter((m) => m.status === "new").length,
    totalMessages: messages.length,
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

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-white/20 font-semibold">
            <MessageSquare className="w-3 h-3" />
            ביקורות והודעות
            {stats.newMessages > 0 && (
              <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {stats.newMessages}
              </span>
            )}
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
                ביקורות והודעות
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                נהל את הביקורות של הלקוחות וענה להודעות
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  דירוג ממוצע
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.avgRating}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  ביקורות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalReviews}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ThumbsUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  הודעות חדשות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.newMessages}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  סה"כ הודעות
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalMessages}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection("reviews")}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === "reviews"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                <span>ביקורות לקוחות</span>
              </div>
            </button>
            <button
              onClick={() => setActiveSection("messages")}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all relative ${
                activeSection === "messages"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>הודעות</span>
                {stats.newMessages > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {stats.newMessages}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        {activeSection === "reviews" && (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h3>
                      <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        {testimonial.eventType}
                      </span>
                      {testimonial.visible ? (
                        <Eye className="w-5 h-5 text-green-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {testimonial.date}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{testimonial.likes} לייקים</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toggleReviewVisibility(testimonial.id)}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition-all ${
                      testimonial.visible
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {testimonial.visible ? (
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>מוצג באתר</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <EyeOff className="w-4 h-4" />
                        <span>מוסתר</span>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => deleteReview(testimonial.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">מחק</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages Section */}
        {activeSection === "messages" && (
          <div>
            {/* Filter */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "all"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  הכל ({messages.length})
                </button>
                <button
                  onClick={() => setFilterStatus("new")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "new"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  חדשות ({messages.filter((m) => m.status === "new").length})
                </button>
                <button
                  onClick={() => setFilterStatus("replied")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "replied"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  נענו ({messages.filter((m) => m.status === "replied").length})
                </button>
                <button
                  onClick={() => setFilterStatus("archived")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "archived"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  ארכיון (
                  {messages.filter((m) => m.status === "archived").length})
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {message.clientName}
                        </h3>
                        {getStatusBadge(message.status)}
                        {getPriorityBadge(message.priority)}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {getTimeAgo(message.date)} •{" "}
                        {formatDateTime(message.date)}
                      </p>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {message.subject}
                      </h4>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{message.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{message.phone}</span>
                    </div>
                  </div>

                  {message.reply && (
                    <div className="mb-4 bg-green-50 p-4 rounded-lg border-r-4 border-green-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-900">
                          התשובה שלך:
                        </span>
                      </div>
                      <p className="text-gray-700">{message.reply}</p>
                    </div>
                  )}

                  {message.status === "new" && (
                    <div className="space-y-3">
                      <textarea
                        rows="3"
                        value={replyText[message.id] || ""}
                        onChange={(e) =>
                          setReplyText({
                            ...replyText,
                            [message.id]: e.target.value,
                          })
                        }
                        placeholder="כתוב תשובה..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                      ></textarea>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReply(message.id)}
                          className="flex-1 sm:flex-none bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          שלח תשובה
                        </button>
                        <button
                          onClick={() => archiveMessage(message.id)}
                          className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          העבר לארכיון
                        </button>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {message.status === "replied" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => archiveMessage(message.id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        העבר לארכיון
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {message.status === "archived" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        מחק לצמיתות
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    אין הודעות
                  </h3>
                  <p className="text-gray-600">אין הודעות בקטגוריה זו כרגע</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewsAndMessagesPage;
