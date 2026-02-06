import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Bell,
  Settings,
  LogOut,
  Home,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  Image as ImageIcon,
  Menu,
  X,
  BarChart3,
  Save,
  Upload,
  Trash2,
  Plus,
  Edit,
  Globe,
  Phone,
  Mail,
  Wifi,
  Car,
  Music,
  Utensils,
  ExternalLink,
} from "lucide-react";

const VenueSettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  // נתוני האולם
  const [venueData, setVenueData] = useState({
    name: "אולם ורסאי",
    location: "תל אביב",
    address: "רחוב הרצל 123, תל אביב",
    minGuests: 100,
    maxGuests: 500,
    description:
      "אולם ורסאי הוא אולם יוקרתי ומפואר בלב תל אביב, המציע חוויית אירוח ברמה הגבוהה ביותר. האולם משלב עיצוב קלאסי עם טכנולוגיה מתקדמת ושירות אישי ומסור.",
  });

  const [features, setFeatures] = useState([
    { name: "חניה פרטית", icon: "Car", available: true },
    { name: "גן אירועים מעוצב", icon: "Home", available: true },
    { name: "מטבח כשר למהדרין", icon: "Utensils", available: true },
    { name: "מיזוג אוויר מרכזי", icon: "Home", available: true },
    { name: "WiFi חופשי", icon: "Wifi", available: true },
    { name: "DJ ומערכת הגברה", icon: "Music", available: true },
    { name: "במה מרכזית", icon: "Music", available: true },
    { name: "חדר כלה מפואר", icon: "Home", available: true },
  ]);

  const [amenities, setAmenities] = useState([
    "מערכת הגברה מקצועית",
    "תאורה אמביינטלית",
    "מסכי LED ענקיים",
    "חדר ניהול אירוע",
    "שירותים נגישים",
    "חניה מקורה ל-150 רכבים",
    "גנרטור חירום",
    "מערכת אבטחה 24/7",
  ]);

  const [contactInfo, setContactInfo] = useState({
    phone: "03-1234567",
    mobile: "050-1234567",
    email: "info@versailles-hall.co.il",
    website: "www.versailles-hall.co.il",
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: "https://www.facebook.com/versailleshall",
    instagram: "https://www.instagram.com/versailleshall",
    tiktok: "https://www.tiktok.com/@versailleshall",
    waze: "https://waze.com/ul/hsv8yx4321",
  });

  const [workingHours, setWorkingHours] = useState({
    sunday: "9:00 - 23:00",
    monday: "9:00 - 23:00",
    tuesday: "9:00 - 23:00",
    wednesday: "9:00 - 23:00",
    thursday: "9:00 - 24:00",
    friday: "סגור",
    saturday: "20:00 - 02:00",
  });

  const [policies, setPolicies] = useState({
    cancellation:
      "ביטול עד 90 יום לפני האירוע - החזר מלא. 30-90 יום - החזר 50%.",
    deposit: "מקדמה של 30% נדרשת עם ההזמנה.",
    payment: "ניתן לשלם במזומן, העברה בנקאית או כרטיס אשראי.",
    minGuests: "מינימום 100 אורחים לאירוע.",
  });

  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop",
      title: "אולם ראשי",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      title: "גן אירועים",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop",
      title: "במה מרכזית",
    },
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "סיור וירטואלי באולם",
      url: "https://www.youtube.com/watch?v=example1",
      duration: "3:45",
    },
    {
      id: 2,
      title: "אירוע לדוגמה - חתונה של שרה ויוסי",
      url: "https://www.youtube.com/watch?v=example2",
      duration: "5:20",
    },
  ]);

  const [newAmenity, setNewAmenity] = useState("");

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

  const handleSave = () => {
    alert("הנתונים נשמרו בהצלחה!");
    console.log("Saving venue data:", {
      venueData,
      features,
      amenities,
      contactInfo,
      socialMedia,
      workingHours,
      policies,
    });
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const toggleFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].available = !updatedFeatures[index].available;
    setFeatures(updatedFeatures);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Uploading images:", files);
      alert("תמונות הועלו בהצלחה!");
    }
  };

  const handleDeleteImage = (imageId) => {
    if (confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) {
      setImages(images.filter((img) => img.id !== imageId));
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

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-white/20 font-semibold">
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
                הגדרות אולם
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                ערוך את כל המידע והפרטים של האולם שלך
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

        {/* Section Navigation */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveSection("basic")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "basic"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              מידע בסיסי
            </button>
            <button
              onClick={() => setActiveSection("features")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "features"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              מתקנים ושירותים
            </button>
            <button
              onClick={() => setActiveSection("media")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "media"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              תמונות וסרטונים
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "contact"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              פרטי התקשרות
            </button>
            <button
              onClick={() => setActiveSection("social")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "social"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              רשתות חברתיות
            </button>
            <button
              onClick={() => setActiveSection("hours")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "hours"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              שעות פעילות
            </button>
            <button
              onClick={() => setActiveSection("policies")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSection === "policies"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              מדיניות
            </button>
          </div>
        </div>

        {/* Basic Info Section */}
        {activeSection === "basic" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              מידע בסיסי על האולם
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם האולם *
                </label>
                <input
                  type="text"
                  value={venueData.name}
                  onChange={(e) =>
                    setVenueData({ ...venueData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    עיר *
                  </label>
                  <input
                    type="text"
                    value={venueData.location}
                    onChange={(e) =>
                      setVenueData({ ...venueData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    כתובת מלאה *
                  </label>
                  <input
                    type="text"
                    value={venueData.address}
                    onChange={(e) =>
                      setVenueData({ ...venueData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תיאור האולם *
                </label>
                <textarea
                  rows="6"
                  value={venueData.description}
                  onChange={(e) =>
                    setVenueData({ ...venueData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  placeholder="ספר על האולם, היסטוריה, נקודות מבדלות..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מינימום אורחים *
                  </label>
                  <input
                    type="number"
                    value={venueData.minGuests}
                    onChange={(e) =>
                      setVenueData({
                        ...venueData,
                        minGuests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מקסימום אורחים *
                  </label>
                  <input
                    type="number"
                    value={venueData.maxGuests}
                    onChange={(e) =>
                      setVenueData({
                        ...venueData,
                        maxGuests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        {activeSection === "features" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                מתקנים עיקריים
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {feature.available ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium text-gray-900">
                        {feature.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFeature(idx)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        feature.available
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {feature.available ? "פעיל" : "לא פעיל"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                שירותים נוספים
              </h2>

              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="הוסף שירות חדש..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
                />
                <button
                  onClick={handleAddAmenity}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  הוסף
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                  >
                    <span className="text-gray-700">{amenity}</span>
                    <button
                      onClick={() => handleRemoveAmenity(idx)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="mt-6 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Media Section */}
        {activeSection === "media" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                העלאת תמונות
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors mb-6">
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

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">סרטונים</h2>
              <div className="space-y-4">
                {videos.map((video, idx) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => {
                          const newVideos = [...videos];
                          newVideos[idx].title = e.target.value;
                          setVideos(newVideos);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="כותרת הסרטון"
                      />
                      <input
                        type="url"
                        value={video.url}
                        onChange={(e) => {
                          const newVideos = [...videos];
                          newVideos[idx].url = e.target.value;
                          setVideos(newVideos);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="קישור YouTube"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setVideos(videos.filter((v) => v.id !== video.id))
                      }
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setVideos([
                      ...videos,
                      {
                        id: Date.now(),
                        title: "",
                        url: "",
                        duration: "0:00",
                      },
                    ])
                  }
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  הוסף סרטון
                </button>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              פרטי התקשרות
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline ml-2" />
                    טלפון קווי
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline ml-2" />
                    טלפון נייד
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.mobile}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline ml-2" />
                  אימייל
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline ml-2" />
                  אתר אינטרנט
                </label>
                <input
                  type="url"
                  value={contactInfo.website}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, website: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Social Media Section */}
        {activeSection === "social" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              רשתות חברתיות
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={socialMedia.facebook}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, facebook: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://www.facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={socialMedia.instagram}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      instagram: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://www.instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TikTok
                </label>
                <input
                  type="url"
                  value={socialMedia.tiktok}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, tiktok: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://www.tiktok.com/@..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waze (קישור ניווט)
                </label>
                <input
                  type="url"
                  value={socialMedia.waze}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, waze: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://waze.com/ul/..."
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Working Hours Section */}
        {activeSection === "hours" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              שעות פעילות
            </h2>
            <div className="space-y-4">
              {Object.entries(workingHours).map(([day, hours]) => {
                const dayNames = {
                  sunday: "ראשון",
                  monday: "שני",
                  tuesday: "שלישי",
                  wednesday: "רביעי",
                  thursday: "חמישי",
                  friday: "שישי",
                  saturday: "שבת",
                };

                return (
                  <div
                    key={day}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <label className="w-24 font-medium text-gray-700">
                      {dayNames[day]}:
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) =>
                        setWorkingHours({
                          ...workingHours,
                          [day]: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="09:00 - 23:00"
                    />
                  </div>
                );
              })}

              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}

        {/* Policies Section */}
        {activeSection === "policies" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              מדיניות האולם
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מדיניות ביטול
                </label>
                <textarea
                  rows="3"
                  value={policies.cancellation}
                  onChange={(e) =>
                    setPolicies({ ...policies, cancellation: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מדיניות מקדמה
                </label>
                <textarea
                  rows="2"
                  value={policies.deposit}
                  onChange={(e) =>
                    setPolicies({ ...policies, deposit: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אמצעי תשלום
                </label>
                <textarea
                  rows="2"
                  value={policies.payment}
                  onChange={(e) =>
                    setPolicies({ ...policies, payment: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  דרישת מינימום אורחים
                </label>
                <textarea
                  rows="2"
                  value={policies.minGuests}
                  onChange={(e) =>
                    setPolicies({ ...policies, minGuests: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                שמור שינויים
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VenueSettingsPage;
