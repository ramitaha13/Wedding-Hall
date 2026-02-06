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
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
      dir="rtl"
    >
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Login Button for Managers */}
            <div className="absolute top-6 left-6">
              <button
                onClick={() => navigate("/login")}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200 flex items-center gap-2 border border-white/30"
              >
                <Lock className="w-5 h-5" />
                כניסה למנהלים
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              החתונה המושלמת שלכם מתחילה כאן
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-pink-100">
              מצאו את אולם החלומות שלכם מתוך מגוון אולמות יוקרתיים ברחבי הארץ
            </p>

            {/* Quick Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700"
                  >
                    <option value="all">כל המיקומים</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="מספר אורחים"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700"
                  />
                </div>

                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  חיפוש
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mt-4 text-purple-600 font-medium flex items-center gap-2 mx-auto hover:text-purple-700"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "הסתר סינונים מתקדמים" : "הצג סינונים מתקדמים"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700"
                  >
                    <option value="featured">מומלצים</option>
                    <option value="rating">דירוג גבוה</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#FFF5F7"
            />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            נמצאו {filteredVenues.length} אולמות מתאימים
          </h2>
          <p className="text-gray-600 mt-1">בחרו את האולם המושלם לחתונה שלכם</p>
        </div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden group">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {venue.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-white" />
                      מומלץ
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {venue.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">
                        {venue.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({venue.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {venue.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {venue.features.length > 3 && (
                      <span className="text-purple-600 text-xs font-medium px-2 py-1">
                        +{venue.features.length - 3} נוספים
                      </span>
                    )}
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-2 text-gray-700 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {venue.minGuests}-{venue.maxGuests} אורחים
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleBookNow(venue.id)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      הזמן עכשיו
                    </button>
                    <button
                      onClick={() => handleViewDetails(venue.id)}
                      className="border-2 border-purple-600 text-purple-600 px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                    >
                      פרטים נוספים
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              לא נמצאו אולמות מתאימים
            </h3>
            <p className="text-gray-600 mb-6">
              נסו לשנות את קריטריוני החיפוש או להרחיב את האפשרויות
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("all");
                setGuestCount("");
                setSelectedDate("");
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              אפס סינונים
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              צריכים עזרה בבחירת האולם?
            </h2>
            <p className="text-xl mb-8 text-pink-100">
              הצוות שלנו כאן לעזור לכם למצוא את האולם המושלם לחתונה שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:03-1234567"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                התקשרו אלינו
              </a>
              <a
                href="mailto:info@weddinghalls.co.il"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                שלחו הודעה
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                אולמות חתונה
              </h3>
              <p className="text-gray-400">
                מחפשים את אולם החלומות? אנחנו כאן לעזור לכם למצוא את המקום
                המושלם לחתונה שלכם.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">קישורים מהירים</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    אודות
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    צור קשר
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    שאלות נפוצות
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    תנאי שימוש
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">יצירת קשר</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  03-1234567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@weddinghalls.co.il
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  ראשון-חמישי: 9:00-18:00
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 כל הזכויות שמורות | מערכת הזמנות אולמות חתונה</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingHallCustomerHomepage;
