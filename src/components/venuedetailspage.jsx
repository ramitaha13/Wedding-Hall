import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Heart,
  Phone,
  Mail,
  Clock,
  Check,
  X,
  ArrowRight,
  Share2,
  MessageCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Music,
  Utensils,
  Home,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// נתוני אולמות מלאים (בפרודקשן יגיעו מה-API)
const venuesData = {
  1: {
    id: 1,
    name: "אולם ורסאי",
    location: "תל אביב",
    address: "רחוב הרצל 123, תל אביב",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29da8ba0a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=800&fit=crop",
    ],
    rating: 4.9,
    reviews: 127,
    minGuests: 100,
    maxGuests: 500,
    pricePerGuest: 450,
    description:
      "אולם ורסאי הוא אולם יוקרתי ומפואר בלב תל אביב, המציע חוויית אירוח ברמה הגבוהה ביותר. האולם משלב עיצוב קלאסי עם טכנולוגיה מתקדמת ושירות אישי ומסור. עם ניסיון של למעלה מ-20 שנה בתחום האירוח, אנו מתחייבים להפוך את החתונה שלכם לאירוע בלתי נשכח.",
    features: [
      { name: "חניה פרטית", icon: Car, available: true },
      { name: "גן אירועים מעוצב", icon: Home, available: true },
      { name: "מטבח כשר למהדרין", icon: Utensils, available: true },
      { name: "מיזוג אוויר מרכזי", icon: Home, available: true },
      { name: "WiFi חופשי", icon: Wifi, available: true },
      { name: "DJ ומערכת הגברה", icon: Music, available: true },
      { name: "במה מרכזית", icon: Music, available: true },
      { name: "חדר כלה מפואר", icon: Home, available: true },
    ],
    amenities: [
      "מערכת הגברה מקצועית",
      "תאורה אמביינטלית",
      "מסכי LED ענקיים",
      "חדר ניהול אירוע",
      "שירותים נגישים",
      "חניה מקורה ל-150 רכבים",
      "גנרטור חירום",
      "מערכת אבטחה 24/7",
    ],
    packages: [
      {
        name: "חבילת ברונזה",
        price: 350,
        features: [
          "אולם מעוצב",
          "כיסאות וסידור שולחנות",
          "מפות ומפיות",
          "מערכת הגברה בסיסית",
        ],
      },
      {
        name: "חבילת כסף",
        price: 450,
        features: [
          "כל מה שבחבילת ברונזה",
          "עיצוב פרחים מלא",
          "DJ מקצועי",
          "תאורה מיוחדת",
          "בר משקאות",
        ],
        popular: true,
      },
      {
        name: "חבילת זהב",
        price: 600,
        features: [
          "כל מה שבחבילת כסף",
          "צלם ווידאו מקצועי",
          "אלבום דיגיטלי",
          "פינת קוקטיילים",
          "שף פרטי",
          "עוגת חתונה מעוצבת",
        ],
      },
    ],
    availableDates: [
      "2026-03-15",
      "2026-03-22",
      "2026-04-05",
      "2026-04-20",
      "2026-05-10",
      "2026-05-24",
      "2026-06-07",
      "2026-06-21",
    ],
    workingHours: {
      sunday: "9:00 - 23:00",
      monday: "9:00 - 23:00",
      tuesday: "9:00 - 23:00",
      wednesday: "9:00 - 23:00",
      thursday: "9:00 - 24:00",
      friday: "סגור",
      saturday: "20:00 - 02:00",
    },
    contactInfo: {
      phone: "03-1234567",
      mobile: "050-1234567",
      email: "info@versailles-hall.co.il",
      website: "www.versailles-hall.co.il",
    },
    testimonials: [
      {
        name: "שרה ויוסי כהן",
        date: "15/02/2026",
        rating: 5,
        text: "חתונה מושלמת! האולם היה מדהים והצוות היה מקצועי ומסור. תודה רבה על הכל!",
      },
      {
        name: "רחל ודוד לוי",
        date: "08/01/2026",
        rating: 5,
        text: "השירות היה ברמה הגבוהה ביותר, האוכל מעולה והאווירה פשוט קסומה. ממליצים בחום!",
      },
      {
        name: "מיכל ואבי מזרחי",
        date: "22/12/2025",
        rating: 4,
        text: "אולם יפהפה עם תשומת לב לפרטים הקטנים. האורחים היו מאוד מרוצים.",
      },
    ],
    policies: {
      cancellation:
        "ביטול עד 90 יום לפני האירוע - החזר מלא. 30-90 יום - החזר 50%.",
      deposit: "מקדמה של 30% נדרשת עם ההזמנה.",
      payment: "ניתן לשלם במזומן, העברה בנקאית או כרטיס אשראי.",
      minGuests: "מינימום 100 אורחים לאירוע.",
    },
  },
  // ניתן להוסיף עוד אולמות כאן...
};

const VenueDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // במקרה שאין id בURL, נשתמש ב-id 1 כדוגמה
  const venueId = id || "1";
  const venue = venuesData[venueId];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [guestCount, setGuestCount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            אולם לא נמצא
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700"
          >
            חזרה לדף הבית
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === venue.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? venue.images.length - 1 : prev - 1,
    );
  };

  const calculateTotalPrice = () => {
    if (!guestCount) return 0;
    const packagePrice = venue.packages[selectedPackage].price;
    return parseInt(guestCount) * packagePrice;
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

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">חזרה</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-400"
                  }`}
                />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative h-96 sm:h-[500px] bg-gray-900">
        <img
          src={venue.images[currentImageIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>
        <button
          onClick={nextImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-1/2 translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
          {currentImageIndex + 1} / {venue.images.length}
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-4 right-4 left-4 flex gap-2 overflow-x-auto">
          {venue.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                idx === currentImageIndex
                  ? "border-white"
                  : "border-transparent opacity-60"
              }`}
            >
              <img
                src={img}
                alt={`תמונה ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {venue.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900">
                    {venue.rating}
                  </span>
                  <span className="text-gray-600">
                    ({venue.reviews} ביקורות)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{venue.address}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>
                    {venue.minGuests}-{venue.maxGuests} אורחים
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                אודות האולם
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {venue.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                מתקנים ושירותים
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {venue.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                    >
                      {feature.available ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <Icon className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {feature.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  שירותים נוספים:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {venue.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                חבילות ומחירים
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {venue.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPackage(idx)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage === idx
                        ? "border-purple-600 bg-purple-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        פופולרי ביותר
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-purple-600">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-gray-600">/אורח</span>
                    </div>

                    <ul className="space-y-2">
                      {pkg.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                מה אומרים הלקוחות
              </h2>
              <div className="space-y-6">
                {venue.testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.date}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                מדיניות האולם
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    מדיניות ביטול:
                  </h3>
                  <p className="text-gray-700">{venue.policies.cancellation}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">מקדמה:</h3>
                  <p className="text-gray-700">{venue.policies.deposit}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">תשלום:</h3>
                  <p className="text-gray-700">{venue.policies.payment}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    מינימום אורחים:
                  </h3>
                  <p className="text-gray-700">{venue.policies.minGuests}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-center mb-4">
                  <span className="text-gray-600">מחיר התחלתי מ-</span>
                  <div className="text-4xl font-bold text-purple-600">
                    {formatPrice(venue.packages[0].price)}
                  </div>
                  <span className="text-gray-600">לאורח</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מספר אורחים
                  </label>
                  <div className="relative">
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder={`${venue.minGuests}-${venue.maxGuests}`}
                      min={venue.minGuests}
                      max={venue.maxGuests}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תאריך מועדף
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                    >
                      <option value="">בחר תאריך</option>
                      {venue.availableDates.map((date) => (
                        <option key={date} value={date}>
                          {formatDate(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">חבילה נבחרת:</span>
                    <span className="font-semibold text-gray-900">
                      {venue.packages[selectedPackage].name}
                    </span>
                  </div>
                  {guestCount && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">מספר אורחים:</span>
                        <span className="font-semibold text-gray-900">
                          {guestCount}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-purple-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            סה"כ משוער:
                          </span>
                          <span className="text-2xl font-bold text-purple-600">
                            {formatPrice(calculateTotalPrice())}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105 mb-3"
              >
                הזמן עכשיו
              </button>

              <button className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors mb-6">
                שלח שאלה
              </button>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">
                  פרטי התקשרות
                </h3>
                <a
                  href={`tel:${venue.contactInfo.phone}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{venue.contactInfo.phone}</span>
                </a>
                <a
                  href={`tel:${venue.contactInfo.mobile}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{venue.contactInfo.mobile}</span>
                </a>
                <a
                  href={`mailto:${venue.contactInfo.email}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{venue.contactInfo.email}</span>
                </a>
              </div>

              {/* Working Hours */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  שעות פעילות
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ראשון-רביעי:</span>
                    <span className="text-gray-900">
                      {venue.workingHours.sunday}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">חמישי:</span>
                    <span className="text-gray-900">
                      {venue.workingHours.thursday}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">שישי:</span>
                    <span className="text-gray-900">
                      {venue.workingHours.friday}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">שבת:</span>
                    <span className="text-gray-900">
                      {venue.workingHours.saturday}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">טופס הזמנה</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="הכנס שם מלא"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  טלפון
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="050-1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הערות
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                  placeholder="ספר לנו על האירוע שלך..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200"
              >
                שלח בקשה
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueDetailsPage;
