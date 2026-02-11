import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronDown,
  Lock,
  Heart,
  ArrowRight,
  Check,
  TrendingUp,
  Award,
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
} from "lucide-react";

// נתוני דוגמה לאולמות
const generateVenues = () => {
  return [
    {
      id: 1,
      name: "אולם ורסאי",
      location: "תל אביב",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 127,
      minGuests: 100,
      maxGuests: 500,
      features: ["חניה", "גן אירועים", "מטבח כשר", "מזגן"],
      availableDates: ["2026-03-15", "2026-04-20", "2026-05-10"],
      description:
        "אולם יוקרתי בלב תל אביב, עם עיצוב קלאסי ושירות ברמה הגבוהה ביותר",
      featured: true,
      priceRange: "₪₪₪₪",
    },
    {
      id: 2,
      name: "גן האירועים הקסום",
      location: "הרצליה",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 203,
      minGuests: 150,
      maxGuests: 400,
      features: ["גן פתוח", "נוף לים", "חופה מעוצבת", "תאורה רומנטית"],
      availableDates: ["2026-03-22", "2026-04-15", "2026-06-01"],
      description: "גן אירועים מרהיב עם נוף פנורמי לים התיכון ואווירה רומנטית",
      featured: true,
      priceRange: "₪₪₪₪",
    },
    {
      id: 3,
      name: "ארמון הזהב",
      location: "ירושלים",
      image:
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      minGuests: 200,
      maxGuests: 600,
      features: ["2 אולמות", "במה מרכזית", "מערכת הגברה", "חדר כלה"],
      availableDates: ["2026-04-05", "2026-05-18", "2026-06-20"],
      description: "אולם מפואר בירושלים, מושלם לחתונות גדולות ומרשימות",
      featured: false,
      priceRange: "₪₪₪",
    },
    {
      id: 4,
      name: "אולם המלכים",
      location: "פתח תקווה",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      minGuests: 80,
      maxGuests: 350,
      features: ["מיקום מרכזי", "חניה מקורה", "מטבח כשר למהדרין", "DJ במקום"],
      availableDates: ["2026-03-28", "2026-04-25", "2026-05-30"],
      description: "אולם אינטימי ומעוצב, מתאים לחתונות בסגנון מודרני",
      featured: false,
      priceRange: "₪₪",
    },
    {
      id: 5,
      name: "וילה טוסקנה",
      location: "רעננה",
      image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 178,
      minGuests: 120,
      maxGuests: 300,
      features: ["סגנון איטלקי", "גן מעוצב", "ברביקיו", "פינת קוקטיילים"],
      availableDates: ["2026-04-10", "2026-05-05", "2026-06-15"],
      description: "וילה מהממת בסגנון טוסקני, מושלמת לחתונות בוטיק ייחודיות",
      featured: true,
      priceRange: "₪₪₪₪",
    },
    {
      id: 6,
      name: "נוף הגליל",
      location: "טבריה",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 134,
      minGuests: 100,
      maxGuests: 400,
      features: ["נוף לכנרת", "גן פתוח", "לינה באתר", "ברביקיו"],
      availableDates: ["2026-03-18", "2026-04-22", "2026-05-27"],
      description: "אולם מרהיב בצפון עם נוף עוצר נשימה לכנרת והרי הגליל",
      featured: false,
      priceRange: "₪₪₪",
    },
    {
      id: 7,
      name: "גני התבור",
      location: "מודיעין",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 92,
      minGuests: 150,
      maxGuests: 450,
      features: ["גן ירוק", "בריכה דקורטיבית", "מפלי מים", "תאורה מיוחדת"],
      availableDates: ["2026-04-08", "2026-05-12", "2026-06-18"],
      description: "גני אירועים מעוצבים עם אלמנטים טבעיים ואווירה קסומה",
      featured: false,
      priceRange: "₪₪",
    },
    {
      id: 8,
      name: "ארמון הים",
      location: "נתניה",
      image:
        "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 245,
      minGuests: 180,
      maxGuests: 550,
      features: ["חוף ים פרטי", "שקיעה רומנטית", "מרפסת נוף", "שף פרטי"],
      availableDates: ["2026-03-25", "2026-04-30", "2026-06-05"],
      description: "אולם יוקרה מול הים, חוויה בלתי נשכחת לכל חתונה",
      featured: true,
      priceRange: "₪₪₪₪",
    },
  ];
};

const WeddingHallCustomerHomepage = () => {
  const navigate = useNavigate();
  const [venues] = useState(generateVenues());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [guestCount, setGuestCount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // קבלת רשימת מיקומים ייחודיים
  const locations = useMemo(() => {
    return [...new Set(venues.map((v) => v.location))].sort();
  }, [venues]);

  // סינון ומיון אולמות
  const filteredVenues = useMemo(() => {
    let filtered = venues.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === "all" || venue.location === selectedLocation;

      const matchesGuests =
        !guestCount ||
        (venue.minGuests <= parseInt(guestCount) &&
          venue.maxGuests >= parseInt(guestCount));

      const matchesDate =
        !selectedDate || venue.availableDates.includes(selectedDate);

      return matchesSearch && matchesLocation && matchesGuests && matchesDate;
    });

    // מיון
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "featured":
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [venues, searchTerm, selectedLocation, guestCount, selectedDate, sortBy]);

  const handleBookNow = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  const handleViewDetails = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Modern Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-rose-500 to-purple-600 p-2.5 rounded-2xl shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  אולמות חתונה
                </h1>
                <p className="text-xs text-gray-500">החתונה המושלמת שלכם</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="#venues"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                אולמות
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                אודות
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                צור קשר
              </a>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Lock className="w-4 h-4" />
                כניסה למנהלים
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#venues"
                className="block text-gray-700 hover:text-rose-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                אולמות
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-rose-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                אודות
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-rose-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                צור קשר
              </a>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                <Lock className="w-4 h-4" />
                כניסה למנהלים
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Ultra Modern */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 border border-rose-100">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-semibold text-gray-700">
                #1 בישראל להזמנת אולמות
              </span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                החתונה שחלמתם עליה
              </span>
              <br />
              <span className="text-gray-900">מתחילה כאן</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              גלו את אוסף האולמות המובחרים ביותר בישראל. חיפוש חכם, הזמנה קלה,
              וחתונה מושלמת.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-rose-100">
                <div className="text-2xl sm:text-3xl font-bold text-rose-600 mb-1">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">אולמות</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-100">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">חתונות</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-pink-100">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
                  4.9★
                </div>
                <div className="text-xs sm:text-sm text-gray-600">דירוג</div>
              </div>
            </div>

            {/* Search Box - Modern Design */}
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-5xl mx-auto border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Location */}
                <div className="relative group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-rose-500 focus:bg-white outline-none text-gray-700 font-medium transition-all cursor-pointer hover:bg-gray-100"
                  >
                    <option value="all">כל המיקומים</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="relative group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none text-gray-700 font-medium transition-all hover:bg-gray-100"
                  />
                </div>

                {/* Guests */}
                <div className="relative group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    placeholder="מספר אורחים"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-500 focus:bg-white outline-none text-gray-700 font-medium transition-all placeholder:text-gray-400 hover:bg-gray-100"
                  />
                </div>

                {/* Search Button */}
                <button className="bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group">
                  <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">חיפוש</span>
                </button>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full text-gray-600 hover:text-rose-600 font-medium flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "הסתר סינונים" : "סינונים מתקדמים"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        מיון לפי
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-rose-500 focus:bg-white outline-none text-gray-700 font-medium transition-all"
                      >
                        <option value="featured">מומלצים</option>
                        <option value="rating">דירוג גבוה</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        חיפוש חופשי
                      </label>
                      <input
                        type="text"
                        placeholder="חפש לפי שם אולם..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-rose-500 focus:bg-white outline-none text-gray-700 font-medium transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              למה לבחור בנו?
            </h2>
            <p className="text-lg text-gray-600">
              אנחנו הופכים את תהליך הבחירה לפשוט, מהיר ונעים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-rose-50 to-white p-8 rounded-3xl border-2 border-rose-100 hover:border-rose-300 transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                הזמנה מהירה
              </h3>
              <p className="text-gray-600 leading-relaxed">
                הזמינו את האולם שלכם תוך דקות ספורות עם מערכת ההזמנות החכמה שלנו
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                אולמות מאומתים
              </h3>
              <p className="text-gray-600 leading-relaxed">
                כל האולמות עברו אימות קפדני כדי להבטיח לכם איכות ושירות מעולים
              </p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                תמיכה 24/7
              </h3>
              <p className="text-gray-600 leading-relaxed">
                הצוות שלנו זמין עבורכם בכל שעה לעזרה ותמיכה לאורך כל הדרך
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section id="venues" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                גלו את האולמות שלנו
              </h2>
              <p className="text-lg text-gray-600">
                {filteredVenues.length} אולמות מתאימים נמצאו
              </p>
            </div>
          </div>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Featured Badge */}
                    {venue.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl backdrop-blur-sm">
                        <Star className="w-4 h-4 fill-white" />
                        מומלץ
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                      {venue.priceRange}
                    </div>

                    {/* Quick Actions - Shown on Hover */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleBookNow(venue.id)}
                        className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-xl"
                      >
                        הזמן עכשיו
                      </button>
                      <button
                        onClick={() => handleViewDetails(venue.id)}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-xl hover:bg-white transition-all duration-300 shadow-xl"
                      >
                        <ArrowRight className="w-5 h-5 text-gray-900" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                          {venue.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-rose-500" />
                          <span className="text-sm font-medium">
                            {venue.location}
                          </span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 px-3 py-2 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">
                            {venue.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 text-center">
                          {venue.reviews}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {venue.description}
                    </p>

                    {/* Capacity */}
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl mb-4">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {venue.minGuests}-{venue.maxGuests} אורחים
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {venue.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-rose-50 to-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-100"
                        >
                          {feature}
                        </span>
                      ))}
                      {venue.features.length > 3 && (
                        <span className="text-rose-600 text-xs font-bold px-2 py-1.5">
                          +{venue.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleViewDetails(venue.id)}
                        className="border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                      >
                        פרטים
                      </button>
                      <button
                        onClick={() => handleBookNow(venue.id)}
                        className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        הזמן
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                לא נמצאו אולמות מתאימים
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                נסו לשנות את קריטריוני החיפוש או להרחיב את האפשרויות
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("all");
                  setGuestCount("");
                  setSelectedDate("");
                }}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                אפס סינונים
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm inline-block px-6 py-3 rounded-full mb-8 border border-white/20">
            <p className="text-white font-semibold">💍 החתונה שלכם מחכה</p>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            מוכנים להתחיל את המסע?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            הצוות שלנו כאן לעזור לכם למצוא את האולם המושלם.
            <br />
            צרו קשר עוד היום ותתחילו לתכנן את החתונה של חייכם!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:03-1234567"
              className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              התקשרו: 03-1234567
            </a>
            <a
              href="mailto:info@weddinghalls.co.il"
              className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              שלחו הודעה
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Modern Design */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-rose-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">אולמות חתונה</h3>
                  <p className="text-gray-400 text-sm">החתונה המושלמת שלכם</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                אנחנו כאן כדי להפוך את החתונה שלכם לבלתי נשכחת. עם מגוון רחב של
                אולמות יוקרתיים ושירות מעולה, אנחנו נדאג שהיום הכי חשוב בחייכם
                יהיה מושלם.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">קישורים מהירים</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#venues"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    אולמות
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    אודות
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    צור קשר
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    תנאי שימוש
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6">יצירת קשר</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">טלפון</div>
                    <div>03-1234567</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">אימייל</div>
                    <div>info@weddinghalls.co.il</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">שעות פעילות</div>
                    <div>ראשון-חמישי: 9:00-18:00</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 אולמות חתונה. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                מדיניות פרטיות
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                תנאי שימוש
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                נגישות
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WeddingHallCustomerHomepage;
