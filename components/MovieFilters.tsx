"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import SearchBar from "./SearchBar";

export interface FilterState {
  search: string;
  genre: string;
  sortBy: string;
  yearRange: [number, number];
  minRating: string;
}

export interface MovieFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  availableGenres: string[];
  totalMovies: number;
  filteredCount: number;
}

export default function MovieFilters({ 
  onFilterChange, 
  availableGenres, 
  totalMovies, 
  filteredCount 
}: MovieFiltersProps) {
  const currentYear = new Date().getFullYear();
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "",
    sortBy: "year-desc",
    yearRange: [1888, currentYear + 5],
    minRating: "",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const resetFilters = () => {
    const def: FilterState = {
      search: "",
      genre: "",
      sortBy: "year-desc",
      yearRange: [1888, currentYear + 5],
      minRating: "",
    };
    setFilters(def);
    onFilterChange(def);
  };

  const hasActiveFilters =
    filters.search ||
    filters.genre ||
    filters.sortBy !== "year-desc" ||
    filters.yearRange[0] !== 1888 ||
    filters.yearRange[1] !== currentYear + 5 ||
    filters.minRating;

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* Search bar */}
      <div className="flex justify-center">
        <SearchBar 
          onSearch={(query) => updateFilters({ search: query })}
          placeholder="Søk etter tittel, regissør eller sjanger..."
        />
      </div>

      {/* Toggle + reset */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-900/50 transition-all text-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">Filtre</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 transition-all"
          >
            <X className="w-4 h-4" />
            Nullstill
          </button>
        )}

        <div className="text-sm text-gray-500 mt-2 sm:mt-0 sm:ml-auto">
          Viser {filteredCount} av {totalMovies} filmer
        </div>
      </div>

      {/* Collapsible filters */}
      {showFilters && (
        <div className="space-y-6 p-4 sm:p-6 border border-gray-800 rounded-xl bg-gray-900/30">
          {/* Genre, Sort, and Rating - Mobile: Stack, Desktop: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Genre filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">
                Sjanger
              </label>

              <div className="relative">
                <select
                  value={filters.genre}
                  onChange={(e) => updateFilters({ genre: e.target.value })}
                  className="w-full appearance-none pr-10 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:ring-2 focus:ring-[#6c47ff] focus:border-transparent text-gray-300 cursor-pointer hover:border-gray-700 text-sm sm:text-base"
                >
                  <option value="" className="bg-[#0a0a0a] text-gray-300">
                    Alle sjangere
                  </option>
                  {availableGenres.map((genre) => (
                    <option
                      key={genre}
                      value={genre}
                      className="bg-[#0a0a0a] text-gray-300"
                    >
                      {genre}
                    </option>
                  ))}
                </select>

                {/* Custom chevron */}
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">
                Sorter etter
              </label>

              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    updateFilters({
                      sortBy: e.target.value as FilterState["sortBy"],
                    })
                  }
                  className="w-full appearance-none pr-10 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:ring-2 focus:ring-[#6c47ff] focus:border-transparent text-gray-300 cursor-pointer hover:border-gray-700 text-sm sm:text-base"
                >
                  <option
                    value="year-desc"
                    className="bg-[#0a0a0a] text-gray-300"
                  >
                    Nyeste år
                  </option>
                  <option value="year-asc" className="bg-[#0a0a0a] text-gray-300">
                    Eldste år
                  </option>
                  <option
                    value="title-asc"
                    className="bg-[#0a0a0a] text-gray-300"
                  >
                    Tittel A-Z
                  </option>
                  <option
                    value="title-desc"
                    className="bg-[#0a0a0a] text-gray-300"
                  >
                    Tittel Z-A
                  </option>
                  <option value="rating-desc" className="bg-[#0a0a0a] text-gray-300">
                    Høyest rangert
                  </option>
                  <option value="rating-asc" className="bg-[#0a0a0a] text-gray-300">
                    Lavest rangert
                  </option>
                  <option value="reviews-desc" className="bg-[#0a0a0a] text-gray-300">
                    Flest anmeldelser
                  </option>
                  <option value="newest" className="bg-[#0a0a0a] text-gray-300">
                    Sist lagt til
                  </option>
                  <option value="oldest" className="bg-[#0a0a0a] text-gray-300">
                    Først lagt til
                  </option>
                </select>

                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Minimum Rating filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">
                Minimum rangering
              </label>

              <div className="relative">
                <select
                  value={filters.minRating}
                  onChange={(e) => updateFilters({ minRating: e.target.value })}
                  className="w-full appearance-none pr-10 px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:ring-2 focus:ring-[#6c47ff] focus:border-transparent text-gray-300 cursor-pointer hover:border-gray-700 text-sm sm:text-base"
                >
                  <option value="" className="bg-[#0a0a0a] text-gray-300">
                    Alle rangeringer
                  </option>
                  <option value="1" className="bg-[#0a0a0a] text-gray-300">
                    1+ stjerner
                  </option>
                  <option value="2" className="bg-[#0a0a0a] text-gray-300">
                    2+ stjerner
                  </option>
                  <option value="3" className="bg-[#0a0a0a] text-gray-300">
                    3+ stjerner
                  </option>
                  <option value="4" className="bg-[#0a0a0a] text-gray-300">
                    4+ stjerner
                  </option>
                  <option value="5" className="bg-[#0a0a0a] text-gray-300">
                    Kun 5 stjerner
                  </option>
                </select>

                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Year range */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-300">
              År: {filters.yearRange[0]} - {filters.yearRange[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={1888}
                max={currentYear + 5}
                value={filters.yearRange[0]}
                onChange={(e) =>
                  updateFilters({
                    yearRange: [parseInt(e.target.value), filters.yearRange[1]],
                  })
                }
                className="w-full accent-[#6c47ff]"
              />
              <input
                type="range"
                min={1888}
                max={currentYear + 5}
                value={filters.yearRange[1]}
                onChange={(e) =>
                  updateFilters({
                    yearRange: [filters.yearRange[0], parseInt(e.target.value)],
                  })
                }
                className="w-full accent-[#6c47ff]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

