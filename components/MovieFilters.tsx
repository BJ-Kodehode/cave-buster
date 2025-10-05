"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import SearchBar from "./SearchBar";

export interface FilterState {
  search: string;
  genre: string;
  sortBy: string;
  yearRange: [number, number];
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

      {/* Advanced Search */}
      <div className="card rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[var(--accent-cool)]" />
            <h3 className="font-semibold text-[var(--foreground)]">Søk og filtrer</h3>
          </div>
          <div className="text-sm text-[var(--foreground)]/60">
            Viser {filteredCount} av {totalMovies} filmer
          </div>
        </div>

        {/* Advanced Search Bar */}
        <SearchBar 
          placeholder="Søk etter tittel, regissør eller sjanger..."
          className="max-w-full"
        />

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

