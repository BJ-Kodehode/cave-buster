"use client";

import { useState, useEffect, useRef } from "react";
import { getGenreSearchColor } from "@/lib/genreColors";

interface SearchItem {
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Søk etter tittel, regissør eller sjanger..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() && query.length >= 2) {
        handleSearch(query);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
        setShowResults(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selectedMovie = results[selectedIndex];
          window.location.href = `/movies/${selectedMovie._id}`;
        }
        break;
      case "Escape":
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (movieId: string) => {
    window.location.href = `/movies/${movieId}`;
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      if (!resultsRef.current?.contains(e.relatedTarget as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
          className="
            w-full
            px-4 py-3
            text-base
            rounded-lg
            bg-[#3b2a26] 
            text-gray-200 
            placeholder:text-neutral-400
            focus:outline-none 
            focus:ring-2 focus:ring-amber-500
            transition
            sm:py-2 sm:text-sm
          "
          aria-label="Søk etter filmer"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          aria-controls={showResults ? "search-results" : undefined}
          role="combobox"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div 
          ref={resultsRef}
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-[#3b2a26] border border-amber-500/20 rounded-lg shadow-2xl shadow-black/50 z-50 max-h-80 overflow-y-auto mx-2 sm:mx-0 sm:max-h-96"
          role="listbox"
        >
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-neutral-400">Søker...</span>
            </div>
          )}

          {!isLoading && results.length === 0 && query.trim() && (
            <div className="px-4 py-3 text-neutral-400 text-center">
              Ingen resultater funnet for &ldquo;{query}&rdquo;
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((movie, index) => (
                <button
                  key={movie._id}
                  id={`search-result-${index}`}
                  onClick={() => handleResultClick(movie._id)}
                  className={`w-full px-3 py-3 text-left hover:bg-amber-500/10 transition-colors border-b border-amber-500/10 last:border-b-0 ${
                    selectedIndex === index ? "bg-amber-500/10" : ""
                  }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-200 truncate text-sm sm:text-base">
                        {movie.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 truncate mt-1">
                        {movie.director} • {movie.releaseYear}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-block px-2 py-1 text-xs rounded-md ${getGenreSearchColor(movie.genre)}`}>
                        {movie.genre}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}