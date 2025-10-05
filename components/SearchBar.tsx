"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

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
    <div className="relative w-full">
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
          className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-[#6c47ff] focus:border-transparent placeholder:text-gray-600 hover:border-gray-700"
          aria-label="Søk etter filmer"
          aria-expanded={showResults}
          aria-haspopup="listbox"
          aria-controls={showResults ? "search-results" : undefined}
          role="combobox"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden="true" />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div 
          ref={resultsRef}
          id="search-results"
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-black/50 z-50 max-h-96 overflow-y-auto"
          role="listbox"
        >
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="w-5 h-5 border-2 border-[#6c47ff] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-gray-400">Søker...</span>
            </div>
          )}

          {!isLoading && results.length === 0 && query.trim() && (
            <div className="px-4 py-3 text-gray-400 text-center">
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
                  className={`w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors border-b border-gray-800/50 last:border-b-0 ${
                    selectedIndex === index ? "bg-gray-800/50" : ""
                  }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-200 truncate">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {movie.director} • {movie.releaseYear}
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span className="inline-block px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300">
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