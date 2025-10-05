"use client";

import { useState } from "react";
import { Search, Filter, SortAsc } from "lucide-react";

export interface FilterState {
  search: string;
  genre: string;
  sortBy: string;
  yearRange: [number, number];
}

// Interface moved up to be before the component for better organization

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
    <div className="space-y-6">
      {/* Statistics Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Filmanmeldelser</h2>
          <p className="text-[var(--foreground)]/60">
            Utforsk og del dine meninger om filmer
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--accent-cool)]">{totalMovies}</div>
            <div className="text-[var(--foreground)]/60">Filmer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--accent-warm)]">{availableGenres.length}</div>
            <div className="text-[var(--foreground)]/60">Sjangere</div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="card rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[var(--accent-cool)]" />
            <h3 className="font-semibold text-[var(--foreground)]">Filtre og sortering</h3>
          </div>
          <div className="text-sm text-[var(--foreground)]/60">
            Viser {filteredCount} av {totalMovies} filmer
          </div>
        </div>

        {/* Prominent Search Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Søk etter filmer, regissører, sjangere..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-14 pr-4 py-3 text-lg rounded-xl bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Genre */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--foreground)]/80">
              Sjanger
            </label>
            <select
              value={filters.genre}
              onChange={(e) => updateFilters({ genre: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-colors"
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
              className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-colors"
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
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-colors"
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
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-colors"
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
            className="px-4 py-2 text-sm text-[var(--foreground)]/60 hover:text-[var(--accent-cool)] transition-colors rounded-lg hover:bg-[var(--accent-cool)]/10"
          >
            Nullstill filtre
          </button>
        </div>
      </div>
    </div>
  );
}
