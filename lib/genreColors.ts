// Sentral fargekonfigurering for sjangere
// Brukes på tvers av hele applikasjonen for konsistens

export const genreColors: Record<string, {
  badge: string;
  border: string;
  hover: string;
  shadow: string;
  background: string;
  cardClass: string;
}> = {
  "Action": {
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
    border: "border-cyan-500/30",
    hover: "hover:border-cyan-400",
    shadow: "hover:shadow-cyan-500/20",
    background: "bg-cyan-900/20",
    cardClass: "bg-cyan-900/20 border-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/20"
  },
  "Adventure": {
    badge: "bg-orange-500/20 text-orange-200 border-orange-500/30",
    border: "border-orange-500/30",
    hover: "hover:border-orange-400",
    shadow: "hover:shadow-orange-500/20",
    background: "bg-orange-900/20",
    cardClass: "bg-orange-900/20 border-orange-500/30 hover:border-orange-400 hover:shadow-orange-500/20"
  },
  "Animation": {
    badge: "bg-pink-500/20 text-pink-200 border-pink-500/30",
    border: "border-pink-500/30",
    hover: "hover:border-pink-400",
    shadow: "hover:shadow-pink-500/20",
    background: "bg-pink-900/20",
    cardClass: "bg-pink-900/20 border-pink-500/30 hover:border-pink-400 hover:shadow-pink-500/20"
  },
  "Comedy": {
    badge: "bg-yellow-500/20 text-yellow-200 border-yellow-500/30",
    border: "border-yellow-500/30",
    hover: "hover:border-yellow-400",
    shadow: "hover:shadow-yellow-500/20",
    background: "bg-yellow-900/20",
    cardClass: "bg-yellow-900/20 border-yellow-500/30 hover:border-yellow-400 hover:shadow-yellow-500/20"
  },
  "Crime": {
    badge: "bg-gray-500/20 text-gray-200 border-gray-500/30",
    border: "border-gray-500/30",
    hover: "hover:border-gray-400",
    shadow: "hover:shadow-gray-500/20",
    background: "bg-gray-900/20",
    cardClass: "bg-gray-900/20 border-gray-500/30 hover:border-gray-400 hover:shadow-gray-500/20"
  },
  "Documentary": {
    badge: "bg-blue-500/20 text-blue-200 border-blue-500/30",
    border: "border-blue-500/30",
    hover: "hover:border-blue-400",
    shadow: "hover:shadow-blue-500/20",
    background: "bg-blue-900/20",
    cardClass: "bg-blue-900/20 border-blue-500/30 hover:border-blue-400 hover:shadow-blue-500/20"
  },
  "Drama": {
    badge: "bg-purple-500/20 text-purple-200 border-purple-500/30",
    border: "border-purple-500/30",
    hover: "hover:border-purple-400",
    shadow: "hover:shadow-purple-500/20",
    background: "bg-purple-900/20",
    cardClass: "bg-purple-900/20 border-purple-500/30 hover:border-purple-400 hover:shadow-purple-500/20"
  },
  "Family": {
    badge: "bg-green-500/20 text-green-200 border-green-500/30",
    border: "border-green-500/30",
    hover: "hover:border-green-400",
    shadow: "hover:shadow-green-500/20",
    background: "bg-green-900/20",
    cardClass: "bg-green-900/20 border-green-500/30 hover:border-green-400 hover:shadow-green-500/20"
  },
  "Fantasy": {
    badge: "bg-violet-500/20 text-violet-200 border-violet-500/30",
    border: "border-violet-500/30",
    hover: "hover:border-violet-400",
    shadow: "hover:shadow-violet-500/20",
    background: "bg-violet-900/20",
    cardClass: "bg-violet-900/20 border-violet-500/30 hover:border-violet-400 hover:shadow-violet-500/20"
  },
  "History": {
    badge: "bg-amber-500/20 text-amber-200 border-amber-500/30",
    border: "border-amber-500/30",
    hover: "hover:border-amber-400",
    shadow: "hover:shadow-amber-500/20",
    background: "bg-amber-900/20",
    cardClass: "bg-amber-900/20 border-amber-500/30 hover:border-amber-400 hover:shadow-amber-500/20"
  },
  "Horror": {
    badge: "bg-red-600/20 text-red-300 border-red-600/30",
    border: "border-red-600/30",
    hover: "hover:border-red-500",
    shadow: "hover:shadow-red-600/20",
    background: "bg-red-900/20",
    cardClass: "bg-red-900/20 border-red-600/30 hover:border-red-500 hover:shadow-red-600/20"
  },
  "Music": {
    badge: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30",
    border: "border-indigo-500/30",
    hover: "hover:border-indigo-400",
    shadow: "hover:shadow-indigo-500/20",
    background: "bg-indigo-900/20",
    cardClass: "bg-indigo-900/20 border-indigo-500/30 hover:border-indigo-400 hover:shadow-indigo-500/20"
  },
  "Mystery": {
    badge: "bg-slate-500/20 text-slate-200 border-slate-500/30",
    border: "border-slate-500/30",
    hover: "hover:border-slate-400",
    shadow: "hover:shadow-slate-500/20",
    background: "bg-slate-900/20",
    cardClass: "bg-slate-900/20 border-slate-500/30 hover:border-slate-400 hover:shadow-slate-500/20"
  },
  "Romance": {
    badge: "bg-rose-500/20 text-rose-200 border-rose-500/30",
    border: "border-rose-500/30",
    hover: "hover:border-rose-400",
    shadow: "hover:shadow-rose-500/20",
    background: "bg-rose-900/20",
    cardClass: "bg-rose-900/20 border-rose-500/30 hover:border-rose-400 hover:shadow-rose-500/20"
  },
  "Science Fiction": {
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
    border: "border-cyan-500/30",
    hover: "hover:border-cyan-400",
    shadow: "hover:shadow-cyan-500/20",
    background: "bg-cyan-900/20",
    cardClass: "bg-cyan-900/20 border-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/20"
  },
  "Sci-Fi": {
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
    border: "border-cyan-500/30",
    hover: "hover:border-cyan-400",
    shadow: "hover:shadow-cyan-500/20",
    background: "bg-cyan-900/20",
    cardClass: "bg-cyan-900/20 border-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/20"
  },
  "TV Movie": {
    badge: "bg-teal-500/20 text-teal-200 border-teal-500/30",
    border: "border-teal-500/30",
    hover: "hover:border-teal-400",
    shadow: "hover:shadow-teal-500/20",
    background: "bg-teal-900/20",
    cardClass: "bg-teal-900/20 border-teal-500/30 hover:border-teal-400 hover:shadow-teal-500/20"
  },
  "Thriller": {
    badge: "bg-purple-600/20 text-purple-300 border-purple-600/30",
    border: "border-purple-600/30",
    hover: "hover:border-purple-500",
    shadow: "hover:shadow-purple-600/20",
    background: "bg-purple-900/20",
    cardClass: "bg-purple-900/20 border-purple-600/30 hover:border-purple-500 hover:shadow-purple-600/20"
  },
  "War": {
    badge: "bg-stone-500/20 text-stone-200 border-stone-500/30",
    border: "border-stone-500/30",
    hover: "hover:border-stone-400",
    shadow: "hover:shadow-stone-500/20",
    background: "bg-stone-900/20",
    cardClass: "bg-stone-900/20 border-stone-500/30 hover:border-stone-400 hover:shadow-stone-500/20"
  },
  "Western": {
    badge: "bg-yellow-600/20 text-yellow-300 border-yellow-600/30",
    border: "border-yellow-600/30",
    hover: "hover:border-yellow-500",
    shadow: "hover:shadow-yellow-600/20",
    background: "bg-yellow-900/20",
    cardClass: "bg-yellow-900/20 border-yellow-600/30 hover:border-yellow-500 hover:shadow-yellow-600/20"
  }
};

// Helper-funksjoner for enkel bruk
export const getGenreBadgeColor = (genre: string): string => {
  return genreColors[genre]?.badge || "bg-[var(--accent-warm)]/20 text-[var(--accent-warm)] border-[var(--accent-warm)]/30";
};

export const getGenreCardColor = (genre: string): string => {
  const colors = genreColors[genre];
  if (!colors) {
    return "bg-[var(--accent-warm)]/10 border-[var(--accent-warm)]/30 hover:border-[var(--accent-warm)] hover:shadow-[var(--accent-warm)]/20";
  }
  return colors.cardClass;
};

export const getGenreSearchColor = (genre: string): string => {
  return genreColors[genre]?.badge.replace("border-", "").replace("/30", "") || "bg-[var(--accent-warm)]/20 text-[var(--accent-warm)]";
};