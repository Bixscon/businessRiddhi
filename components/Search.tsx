"use client";

import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useId, useState } from "react";
import useSuggestions from "@/components/hooks/useSuggestions";


interface SearchBoxProps {
  divClassName?: string;
  formClassName?: string;
}

const SearchBox = ({ divClassName, formClassName }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const id = useId();
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const { suggestions } = useSuggestions(searchQuery);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      router.push(`/search?query=${encodeURIComponent(suggestions[activeSuggestion])}`);
    } else {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((s) => (s < suggestions.length - 1 ? s + 1 : s));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((s) => (s > 0 ? s - 1 : -1));
    } else if (e.key === 'Enter') {
      // let form submit handler pick up selection
    }
  };

  return (
    <div className={`${divClassName}`}>
      <form onSubmit={handleSearchSubmit} className={`${formClassName}`}>
        <div className="relative w-full">
          <Input
            className="flex-1 pr-10 border-none py-6 bg-white"
            type="text"
            placeholder="Type to Search.."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setActiveSuggestion(-1); }}
            onKeyDown={handleKeyDown}
            onFocus={() => {}}
            aria-autocomplete="list"
            aria-controls={`search-suggestions-${id}`}
            aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${id}-${activeSuggestion}` : undefined}
          />
          {suggestions.length > 0 && (
            <div id={`search-suggestions-${id}`} role="listbox" className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  id={`suggestion-${id}-${i}`}
                  role="option"
                  aria-selected={i === activeSuggestion}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => router.push(`/search?query=${encodeURIComponent(s)}`)}
                  className={i === activeSuggestion ? 'px-4 py-2 bg-pink-100 text-gray-900' : 'px-4 py-2 hover:bg-gray-100 text-gray-700'}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </span>
      </form>
    </div>
  );
};

export default SearchBox;
