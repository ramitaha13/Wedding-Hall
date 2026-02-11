import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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

// Helper component for scroll reveal animations
const ScrollRevealSection = ({ children }) => {
  return <>{children}</>;
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: isMobile ? 10 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 150 : 100,
        damping: isMobile ? 15 : 10,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: isMobile ? 1 : 1.03,
      y: isMobile ? 0 : -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

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
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 transform-origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Modern Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-rose-500 to-purple-600 p-2.5 rounded-2xl shadow-lg"
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  אולמות חתונה
                </h1>
                <p className="text-xs text-gray-500">החתונה המושלמת שלכם</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:flex items-center gap-8"
            >
              {["אולמות", "אודות", "צור קשר"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item === "אולמות" ? "venues" : item === "אודות" ? "about" : "contact"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, color: "#f43f5e" }}
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Lock className="w-4 h-4" />
                כניסה למנהלים
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-6 space-y-4"
            >
              {["אולמות", "אודות", "צור קשר"].map((item) => (
                <motion.a
                  key={item}
                  variants={itemVariants}
                  href={`#${item === "אולמות" ? "venues" : item === "אודות" ? "about" : "contact"}`}
                  className="block text-gray-700 hover:text-rose-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                <Lock className="w-4 h-4" />
                כניסה למנהלים
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section - Ultra Modern */}
      <motion.section
        style={isMobile ? {} : { opacity, scale }}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
      >
        {/* Animated Background - Simplified for mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
          {!isMobile && (
            <div className="absolute inset-0 opacity-30">
              <motion.div
                animate={{
                  x: [0, 30, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-20 right-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-40 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"
              ></motion.div>
              <motion.div
                animate={{
                  x: [0, 15, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4,
                }}
                className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"
              ></motion.div>
            </div>
          )}
        </div>

        {/* Floating Hearts - Only on desktop */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: "100%",
                  x: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  y: "-100%",
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear",
                }}
                className="absolute"
              >
                <Heart className="w-8 h-8 text-rose-300 fill-rose-300" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              whileHover={isMobile ? {} : { scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 border border-rose-100"
            >
              {!isMobile ? (
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-rose-500" />
                </motion.div>
              ) : (
                <Sparkles className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-sm font-semibold text-gray-700">
                #1 בישראל להזמנת אולמות
              </span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                החתונה שחלמתם עליה
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-900"
              >
                מתחילה כאן
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              גלו את אוסף האולמות המובחרים ביותר בישראל. חיפוש חכם, הזמנה קלה,
              וחתונה מושלמת.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12"
            >
              {[
                { value: "500+", label: "אולמות", color: "rose" },
                { value: "10K+", label: "חתונות", color: "purple" },
                { value: "4.9★", label: "דירוג", color: "pink" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={scaleInVariants}
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.5 },
                        }
                  }
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-${stat.color}-100 ${isMobile ? "" : "cursor-pointer"}`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 mb-1`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Search Box - Modern Design */}
            <motion.div
              variants={fadeInUpVariants}
              className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-5xl mx-auto border border-gray-100"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
              >
                {/* Location */}
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500"
                  >
                    <MapPin className="w-5 h-5" />
                  </motion.div>
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
                </motion.div>

                {/* Date */}
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500"
                  >
                    <Calendar className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none text-gray-700 font-medium transition-all hover:bg-gray-100"
                  />
                </motion.div>

                {/* Guests */}
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="number"
                    placeholder="מספר אורחים"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-500 focus:bg-white outline-none text-gray-700 font-medium transition-all placeholder:text-gray-400 hover:bg-gray-100"
                  />
                </motion.div>

                {/* Search Button */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search className="w-5 h-5" />
                  </motion.div>
                  <span className="hidden sm:inline">חיפוש</span>
                </motion.button>
              </motion.div>

              {/* Advanced Filters Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="w-full text-gray-600 hover:text-rose-600 font-medium flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "הסתר סינונים" : "סינונים מתקדמים"}
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* Advanced Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
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
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <ScrollRevealSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                למה לבחור בנו?
              </h2>
              <p className="text-lg text-gray-600">
                אנחנו הופכים את תהליך הבחירה לפשוט, מהיר ונעים
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "הזמנה מהירה",
                  description:
                    "הזמינו את האולם שלכם תוך דקות ספורות עם מערכת ההזמנות החכמה שלנו",
                  color: "rose",
                  delay: 0.1,
                  gradient: "from-rose-500 to-pink-500",
                },
                {
                  icon: Award,
                  title: "אולמות מאומתים",
                  description:
                    "כל האולמות עברו אימות קפדני כדי להבטיח לכם איכות ושירות מעולים",
                  color: "purple",
                  delay: 0.2,
                  gradient: "from-purple-500 to-indigo-500",
                },
                {
                  icon: Heart,
                  title: "תמיכה 24/7",
                  description:
                    "הצוות שלנו זמין עבורכם בכל שעה לעזרה ותמיכה לאורך כל הדרך",
                  color: "pink",
                  delay: 0.3,
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: isMobile ? 0 : feature.delay,
                    duration: 0.5,
                  }}
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.05,
                          y: -10,
                          transition: { duration: 0.3 },
                        }
                  }
                  className={`group relative bg-gradient-to-br from-${feature.color}-50 to-white p-8 rounded-3xl border-2 border-${feature.color}-100 hover:border-${feature.color}-300 transition-all duration-300 hover:shadow-2xl ${isMobile ? "" : "cursor-pointer"} overflow-hidden`}
                >
                  {/* Particle Effect on Hover - Desktop Only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-${feature.color}-400 rounded-full`}
                          initial={{ scale: 0, x: "50%", y: "50%" }}
                          whileHover={{
                            scale: [0, 1, 0],
                            x: `${50 + (Math.random() - 0.5) * 100}%`,
                            y: `${50 + (Math.random() - 0.5) * 100}%`,
                            transition: {
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            },
                          }}
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: isMobile ? 0 : feature.delay + 0.2,
                      type: "spring",
                      stiffness: 150,
                    }}
                    className="relative z-10"
                  >
                    <motion.div
                      whileHover={
                        isMobile
                          ? {}
                          : {
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.1,
                            }
                      }
                      transition={{ duration: 0.5 }}
                      className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  {/* Glow Effect - Desktop Only */}
                  {!isMobile && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollRevealSection>

      {/* Venues Section */}
      <section id="venues" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                גלו את האולמות שלנו
              </h2>
              <p className="text-lg text-gray-600">
                {filteredVenues.length} אולמות מתאימים נמצאו
              </p>
            </div>
          </motion.div>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: isMobile ? 0 : index * 0.05,
                    duration: isMobile ? 0.3 : 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={isMobile ? {} : "hover"}
                  variants={cardHoverVariants}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200 relative"
                >
                  {/* Sparkle Effects on Hover - Desktop Only */}
                  {!isMobile && (
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut",
                          }}
                          className="absolute"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      whileHover={isMobile ? {} : { scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={venue.image}
                      alt={venue.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Featured Badge */}
                    {venue.featured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: isMobile ? 0 : index * 0.05 + 0.2,
                          type: "spring",
                          stiffness: 150,
                        }}
                        whileHover={
                          isMobile
                            ? {}
                            : {
                                scale: 1.05,
                                transition: { duration: 0.3 },
                              }
                        }
                        className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl backdrop-blur-sm z-20"
                      >
                        <Star className="w-4 h-4 fill-white" />
                        מומלץ
                      </motion.div>
                    )}

                    {/* Price Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: isMobile ? 0 : index * 0.05 + 0.3,
                        type: "spring",
                      }}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg z-20"
                    >
                      {venue.priceRange}
                    </motion.div>

                    {/* Quick Actions - Shown on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 0, y: 20 }}
                      whileHover={isMobile ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 flex gap-2 z-20"
                    >
                      <motion.button
                        whileHover={isMobile ? {} : { scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookNow(venue.id)}
                        className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-xl"
                      >
                        הזמן עכשיו
                      </motion.button>
                      <motion.button
                        whileHover={isMobile ? {} : { scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleViewDetails(venue.id)}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-xl hover:bg-white transition-all duration-300 shadow-xl"
                      >
                        <ArrowRight className="w-5 h-5 text-gray-900" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <motion.h3
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors"
                        >
                          {venue.name}
                        </motion.h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-rose-500" />
                          <span className="text-sm font-medium">
                            {venue.location}
                          </span>
                        </div>
                      </div>

                      {/* Rating */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 px-3 py-2 rounded-xl border border-yellow-200"
                      >
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">
                            {venue.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 text-center">
                          {venue.reviews}
                        </div>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {venue.description}
                    </p>

                    {/* Capacity */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl mb-4"
                    >
                      <Users className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {venue.minGuests}-{venue.maxGuests} אורחים
                      </span>
                    </motion.div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {venue.features.slice(0, 3).map((feature, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + idx * 0.05,
                            type: "spring",
                          }}
                          whileHover={{ scale: 1.1 }}
                          className="bg-gradient-to-r from-rose-50 to-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-100"
                        >
                          {feature}
                        </motion.span>
                      ))}
                      {venue.features.length > 3 && (
                        <span className="text-rose-600 text-xs font-bold px-2 py-1.5">
                          +{venue.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(venue.id)}
                        className="border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                      >
                        פרטים
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookNow(venue.id)}
                        className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                      >
                        הזמן
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center py-20 bg-white rounded-3xl shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-gradient-to-br from-gray-100 to-gray-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <Search className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                לא נמצאו אולמות מתאימים
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                נסו לשנות את קריטריוני החיפוש או להרחיב את האפשרויות
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("all");
                  setGuestCount("");
                  setSelectedDate("");
                }}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                אפס סינונים
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-rose-600 via-purple-600 to-pink-600 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm inline-block px-6 py-3 rounded-full mb-8 border border-white/20"
          >
            <p className="text-white font-semibold">💍 החתונה שלכם מחכה</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            מוכנים להתחיל את המסע?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 mb-10 leading-relaxed"
          >
            הצוות שלנו כאן לעזור לכם למצוא את האולם המושלם.
            <br />
            צרו קשר עוד היום ותתחילו לתכנן את החתונה של חייכם!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              href="tel:03-1234567"
              className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-6 h-6" />
              </motion.div>
              התקשרו: 03-1234567
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:info@weddinghalls.co.il"
              className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-6 h-6" />
              </motion.div>
              שלחו הודעה
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Modern Design */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-rose-500 to-purple-600 p-3 rounded-2xl shadow-lg"
                >
                  <Heart className="w-7 h-7 text-white fill-white" />
                </motion.div>
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
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h4 className="font-bold text-lg mb-6">קישורים מהירים</h4>
              <ul className="space-y-3">
                {["אולמות", "אודות", "צור קשר", "תנאי שימוש"].map(
                  (link, index) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <motion.a
                        href={`#${link === "אולמות" ? "venues" : link === "אודות" ? "about" : "contact"}`}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                        {link}
                      </motion.a>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="font-bold text-lg mb-6">יצירת קשר</h4>
              <ul className="space-y-4">
                {[
                  { icon: Phone, label: "טלפון", value: "03-1234567" },
                  {
                    icon: Mail,
                    label: "אימייל",
                    value: "info@weddinghalls.co.il",
                  },
                  {
                    icon: Clock,
                    label: "שעות פעילות",
                    value: "ראשון-חמישי: 9:00-18:00",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white">
                        {item.label}
                      </div>
                      <div>{item.value}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-400 text-sm">
              © 2026 אולמות חתונה. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6 text-sm">
              {["מדיניות פרטיות", "תנאי שימוש", "נגישות"].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Custom Smooth Scroll */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* GPU Acceleration for better performance */
        .group img,
        .group-hover\\:scale-110 {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Optimize animations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Reduce complexity on mobile */
        @media (max-width: 768px) {
          .backdrop-blur-sm,
          .backdrop-blur-lg {
            backdrop-filter: none;
            background-color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingHallCustomerHomepage;
