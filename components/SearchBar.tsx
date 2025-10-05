"use client";

import { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { Search } from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
}

interface SearchBarProps {
  placeholder?: string;
  apiPath?: string;
  minChars?: number;
  className?: string;
}

export default function SearchBar({
  placeholder = "Søk etter tittel, regissør eller sjanger...",
  apiPath = "/api/search",
  minChars = 2,
  className = ""
}: SearchBarProps) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);

  // 🔍 Debounced search
  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (q.length < minChars) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`${apiPath}?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Search request failed");
        const data = await res.json();
        setResults(data.results || []);
        setOpen(true);
        setActive(-1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Search error:", err);
          setResults([]);
          setOpen(false);
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [q, apiPath, minChars]);

  // ⌨️ Keyboard navigation
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((cur) => Math.min(cur + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((cur) => Math.max(cur - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && results[active]) {
        onSelect(results[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function onSelect(item: SearchItem) {
    if (item.url) {
      window.location.href = item.url;
    } else {
      setQ(item.title);
      setOpen(false);
    }
  }

  // 🖱️ Close when clicking outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!inputRef.current) return;
      if (!inputRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={inputRef}>
      <label htmlFor="search-input" className="sr-only">
        Søk
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--foreground)]/50 pointer-events-none" />
        <input
          id="search-input"
          className="w-full pl-6 pr-4 py-3 text-base rounded-xl bg-[var(--background)]/50 border border-[var(--border)] focus:border-[var(--accent-cool)] outline-none transition-all placeholder:text-[var(--foreground)]/50"
          placeholder={placeholder}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={open}
          role="combobox"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[var(--accent-cool)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          aria-labelledby="search-input"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-xl backdrop-blur-sm"
        >
          {results.map((r, i) => (
            <li
              key={r.id}
              role="option"
              aria-selected={active === i}
              onMouseDown={(e) => e.preventDefault()} // prevent blur
              onClick={() => onSelect(r)}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-4 py-3 border-b border-[var(--border)]/30 last:border-b-0 transition-colors ${
                active === i ? "bg-[var(--accent-cool)]/10" : "hover:bg-[var(--accent-cool)]/5"
              }`}
            >
              <div className="text-sm font-medium text-[var(--foreground)]">{r.title}</div>
              {r.subtitle && (
                <div className="text-xs text-[var(--foreground)]/60 mt-1">{r.subtitle}</div>
              )}
            </li>
          ))}
        </ul>
      )}

      {open && !loading && results.length === 0 && q.length >= minChars && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-xl backdrop-blur-sm">
          <div className="text-sm text-[var(--foreground)]/60 text-center">
            Ingen resultater funnet for &quot;{q}&quot;
          </div>
        </div>
      )}
    </div>
  );
}