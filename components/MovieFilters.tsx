"use client";

import { useState } from "react";
import { Search, Filter, SortAsc } from "lucide-react";

export interface FilterState {
  search: string;
  genre: string;
  sortBy: string;
  yearRange: [number, number];
}

interface MovieFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  availableGenres: string[];
}

export default function MovieFilters({ onFilterChange, availableGenres }: MovieFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "",
    sortBy: "newest",
    yearRange: [1888, new Date().getFullYear() + 5],
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="card rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-[var(--accent-cool)]" />
        <h3 className="font-semibold text-[var(--foreground)]">Filtrer filmer</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--foreground)]/80">
            Søk
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground)]/60" />
            <input
              type="text"
              placeholder="Tittel, regissør..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg outline-none transition-colors"
            />
          </div>
        </div>

        {/* Genre */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--foreground)]/80">
            Sjanger
          </label>
          <select
            value={filters.genre}
            onChange={(e) => updateFilters({ genre: e.target.value })}
            className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
          >
            <option value="">Alle sjangere</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--foreground)]/80">
            <SortAsc className="inline w-4 h-4 mr-1" />
            Sortering
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
          >
            <option value="newest">Nyeste først</option>
            <option value="oldest">Eldste først</option>
            <option value="title-asc">Tittel A-Å</option>
            <option value="title-desc">Tittel Å-A</option>
            <option value="year-desc">År (nyeste)</option>
            <option value="year-asc">År (eldste)</option>
          </select>
        </div>

        {/* Year Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--foreground)]/80">
            År
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Fra"
              min="1888"
              max={new Date().getFullYear() + 5}
              value={filters.yearRange[0]}
              onChange={(e) => updateFilters({ 
                yearRange: [parseInt(e.target.value) || 1888, filters.yearRange[1]] 
              })}
              className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
            />
            <input
              type="number"
              placeholder="Til"
              min="1888"
              max={new Date().getFullYear() + 5}
              value={filters.yearRange[1]}
              onChange={(e) => updateFilters({ 
                yearRange: [filters.yearRange[0], parseInt(e.target.value) || new Date().getFullYear() + 5] 
              })}
              className="w-full px-3 py-2 rounded-lg outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Reset filters */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            const resetFilters: FilterState = {
              search: "",
              genre: "",
              sortBy: "newest",
              yearRange: [1888, new Date().getFullYear() + 5],
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="px-4 py-2 text-sm text-[var(--foreground)]/60 hover:text-[var(--accent-cool)] transition-colors"
        >
          Nullstill filtre
        </button>
      </div>
    </div>
  );
}
