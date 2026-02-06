import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Heart,
  Phone,
  Mail,
  Check,
  X,
  ArrowRight,
  Share2,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  Music,
  Utensils,
  Home,
  CheckCircle2,
  XCircle,
  Play,
  ExternalLink,
} from "lucide-react";

// נתוני אולמות מלאים (בפרודקשן יגיעו מה-API)
const venuesData = {
  1: {
    id: 1,
    name: "אולם ורסאי",
    location: "תל אביב",
    address: "רחוב הרצל 123, תל אביב",
    images: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=800&fit=crop",
    ],
    videos: [
      {
        id: 1,
        title: "סיור וירטואלי באולם",
        thumbnail:
          "https://images.unsplash.com/photo-1519167758481-83f29da8ba0a?w=600&h=400&fit=crop",
        url: "https://www.youtube.com/watch?v=example1",
        duration: "3:45",
      },
      {
        id: 2,
        title: "אירוע לדוגמה - חתונה של שרה ויוסי",
        thumbnail:
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
        url: "https://www.youtube.com/watch?v=example2",
        duration: "5:20",
      },
      {
        id: 3,
        title: "המטבח והאוכל שלנו",
        thumbnail:
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop",
        url: "https://www.youtube.com/watch?v=example3",
        duration: "2:15",
      },
    ],
    socialMedia: {
      facebook: "https://www.facebook.com/versailleshall",
      instagram: "https://www.instagram.com/versailleshall",
      tiktok: "https://www.tiktok.com/@versailleshall",
      waze: "https://waze.com/ul/hsv8yx4321",
    },
    rating: 4.9,
    reviews: 127,
    minGuests: 100,
    maxGuests: 500,
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
};

// Social Media Icons (SVG components)
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const WazeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.84 6.03c-.75 0-1.37.62-1.37 1.37 0 .76.62 1.37 1.37 1.37.76 0 1.37-.61 1.37-1.37 0-.75-.61-1.37-1.37-1.37zM9.48 6.03c-.75 0-1.37.62-1.37 1.37 0 .76.62 1.37 1.37 1.37.76 0 1.37-.61 1.37-1.37 0-.75-.61-1.37-1.37-1.37zM12 0C6.27 0 1.62 4.1 1.62 9.14c0 1.69.53 3.29 1.49 4.7.03.06.03.14.01.21l-.9 3.48c-.11.42.25.78.67.67l3.48-.9c.07-.02.15-.02.21.01 1.41.96 3.01 1.49 4.7 1.49 5.9 0 10.72-4.1 10.72-9.14C22.72 4.1 17.9 0 12 0zm0 17.14c-1.48 0-2.87-.38-4.08-1.05l-2.31.59.59-2.31c-.67-1.21-1.05-2.6-1.05-4.08 0-4.52 3.88-8.14 8.72-8.14s8.72 3.62 8.72 8.14-3.88 8.14-8.72 8.14z" />
  </svg>
);

const VenueDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const venueId = id || "1";
  const venue = venuesData[venueId];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

            {/* Videos Section */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                סרטונים מהאולם
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venue.videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 group-hover:bg-white rounded-full p-4 group-hover:scale-110 transition-all">
                          <Play className="w-8 h-8 text-purple-600 fill-purple-600" />
                        </div>
                      </div>
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-t from-gray-50 to-white">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                עקבו אחרינו ברשתות החברתיות
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href={venue.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all hover:scale-105 group"
                >
                  <div className="text-blue-600 group-hover:scale-110 transition-transform">
                    <FacebookIcon />
                  </div>
                  <span className="font-semibold text-gray-900">Facebook</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={venue.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-pink-50 hover:bg-pink-100 rounded-xl transition-all hover:scale-105 group"
                >
                  <div className="text-pink-600 group-hover:scale-110 transition-transform">
                    <InstagramIcon />
                  </div>
                  <span className="font-semibold text-gray-900">Instagram</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={venue.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-gray-900 hover:bg-gray-800 rounded-xl transition-all hover:scale-105 group"
                >
                  <div className="text-white group-hover:scale-110 transition-transform">
                    <TikTokIcon />
                  </div>
                  <span className="font-semibold text-white">TikTok</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>

                <a
                  href={venue.socialMedia.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-all hover:scale-105 group"
                >
                  <div className="text-cyan-600 group-hover:scale-110 transition-transform">
                    <WazeIcon />
                  </div>
                  <span className="font-semibold text-gray-900">
                    ניווט Waze
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
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

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                שלח בקשה להזמנה
              </h2>

              {/* Booking Form */}
              <form className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="הכנס שם מלא"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    אימייל *
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון *
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      required
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="050-1234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תאריך מועדף *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      required
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    תיאור האירוע
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    placeholder="ספר לנו על האירוע שלך, מספר אורחים משוער, דרישות מיוחדות..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  שלח בקשה
                </button>
              </form>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">
                  או צור קשר ישירות
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
    </div>
  );
};

export default VenueDetailsPage;
