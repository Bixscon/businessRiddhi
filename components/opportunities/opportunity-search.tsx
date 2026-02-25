'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useId, useState } from 'react';
import useSuggestions from '@/components/hooks/useSuggestions';

export const OpportunitySearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

  const id = useId();
  const [value, setValue] = useState(searchParams?.get('q') ?? '');
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const { suggestions } = useSuggestions(value);

  const pushWith = (v: string) => {
    router.push(pathname + '?' + createQueryString('q', v));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion((s) => (s < suggestions.length - 1 ? s + 1 : s));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion((s) => (s > 0 ? s - 1 : -1));
    }
  };

  return (
    <div className="relative shadow-inner">
      <div className="relative">
        <Input
          className="flex-1 pr-10 border-none py-4"
          type="text"
          placeholder="Find in opportunities"
          value={value}
          onChange={(e) => { setValue(e.target.value); pushWith(e.target.value); setActiveSuggestion(-1); }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls={`op-suggestions-${id}`}
          aria-activedescendant={activeSuggestion >= 0 ? `op-suggestion-${id}-${activeSuggestion}` : undefined}
        />

        {suggestions.length > 0 && (
          <div id={`op-suggestions-${id}`} role="listbox" className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {suggestions.map((s, i) => (
              <div
                key={i}
                id={`op-suggestion-${id}-${i}`}
                role="option"
                aria-selected={i === activeSuggestion}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setValue(s); pushWith(s); }}
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
    </div>
  );
};
