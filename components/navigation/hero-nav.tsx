"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, List } from "@phosphor-icons/react/dist/ssr";
import { ExitIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeroNav({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch suggestions based on search input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const res = await fetch(`/api/search-businesses?query=${encodeURIComponent(search)}`);
        const data = await res.json();
        
        // Extract unique business names and categories
        const uniqueSuggestions = new Set<string>();
        if (data.businesses) {
          data.businesses.forEach((b: any) => {
            if (b.name) uniqueSuggestions.add(b.name);
            if (b.category) uniqueSuggestions.add(b.category);
          });
        }
        
        setSuggestions(Array.from(uniqueSuggestions).slice(0, 5));
        setShowSuggestions(true);
        setActiveSuggestion(-1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleSearchSubmit = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearch("");
      setMobileSearch("");
      setIsExpanded(false);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, searchQuery: string, isMobile: boolean = false) => {
    if (e.key === "Enter") {
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        handleSearchSubmit(suggestions[activeSuggestion]);
      } else {
        handleSearchSubmit(searchQuery);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearchSubmit(suggestion);
  };

  const handleSearchIconClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => desktopInputRef.current?.focus(), 0);
    } else {
      handleSearchSubmit(search);
    }
  };

  return (
    <header className="sticky top-0 bg-[#FFFDFE] px-4 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full transition-all duration-300 z-40">
      <nav className={cn("flex items-center justify-between", className)}>
        <div className="shrink-0 lg:w-48 cursor-pointer transition-transform duration-300 hover:scale-105">
          <Link href="/">
            <Image
              src="/logo-black.webp"
              width={81}
              height={42}
              alt="visey logo"
            />
          </Link>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="hidden lg:flex relative items-center">
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isExpanded ? "w-64 opacity-100" : "w-0 opacity-0"
              )}
            >
              <Input
                ref={desktopInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, search)}
                onFocus={() => setShowSuggestions(search.trim().length >= 2)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search"
                className="bg-white pr-12 w-full transition-all duration-300"
                style={{
                  transform: isExpanded ? "translateX(0)" : "translateX(20px)",
                }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={cn(
                        "px-4 py-2 cursor-pointer transition-colors",
                        index === activeSuggestion
                          ? "bg-pink-100 text-gray-900"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className={cn(
                "transition-all duration-300 ease-in-out",
                isExpanded ? "absolute right-0 top-1/2 -translate-y-1/2" : ""
              )}
              onClick={handleSearchIconClick}
            >
              <MagnifyingGlass
                className={cn(
                  "shrink-0 size-5 cursor-pointer transition-all duration-300",
                  isExpanded
                    ? "mr-4 text-neutrals-600"
                    : "mr-4 text-black hover:scale-110"
                )}
              />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-8">
            {" "}
            {[
              { name: "Features", link: "/features" },
              { name: "About", link: "/about" },
              { name: "Pricing", link: "/pricing" },
              { name: "Contact Us", link: "/contact-us" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm font-semibold text-black transition-all duration-300 hover:opacity-80"
              >
                {item.name}
              </Link>
            ))}{" "}
            <a
              href="https://luma.com/z6mf925b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="nav"
                size="md"
                style={{
                  color: "black",
                  borderRadius: "20px",
                  padding: "9px 20px",
                  background:
                    "linear-gradient(#B8F272, #B8F272) padding-box, linear-gradient(90deg, #FF64A3, #CF0E5E) border-box",
                  border: "2px solid transparent",
                }}
              >
                Join as Resource Provider
              </Button>
            </a>
            <a
              href="https://luma.com/yzrt8u4r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="nav"
                size="md"
                style={{
                  color: "black",
                  borderRadius: "20px",
                  padding: "9px 20px",
                  background:
                    "linear-gradient(#B8F272, #B8F272) padding-box, linear-gradient(90deg, #FF64A3, #CF0E5E) border-box",
                  border: "2px solid transparent",
                }}
              >
                Join as Startup
              </Button>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <a
            href="https://luma.com/z6mf925b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              style={{
                color: "black",
                borderRadius: "20px",
                padding: "9px 20px",
                background:
                  "linear-gradient(#B8F272, #B8F272) padding-box, linear-gradient(90deg, #FF64A3, #CF0E5E) border-box",
                border: "2px solid transparent",
              }}
              variant="nav"
              size="md"
            >
              Join as Resource Provider
            </Button>
          </a>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <List className="w-6 h-6 text-black" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] bg-primary-100 flex flex-col gap-2 pt-2 pb-2 mr-4 ring-8 ring-[#f3f3f35a] text-base">
                <div className="px-4 flex flex-col gap-2">
                  {" "}
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={"/features"}>
                        <span>Features</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={"/about"}>
                        <span>About</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={"/pricing"}>
                        <span>Pricing</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={"/contact-us"}>
                        <span>Contact Us</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href="/login">List Business Free</Link>
                    </span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuItem className="flex justify-center cursor-pointer shadow-[0_0_10px_5px_#E27C9D]">
                  <Link href={"/login"}>
                    <span className="flex gap-x-2 items-center">
                      <ExitIcon className="" />
                      <span>Login/ Sign Up</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="relative z-10 mt-4 shadow-inner lg:hidden">
        <Input
          ref={mobileInputRef}
          className="flex-1 pr-10 border-gray-100 py-6 bg-white"
          type="text"
          placeholder="Type to Search.."
          value={mobileSearch}
          onChange={(e) => setMobileSearch(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, mobileSearch, true)}
          onFocus={() => setShowSuggestions(mobileSearch.trim().length >= 2)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "px-4 py-2 cursor-pointer transition-colors text-sm",
                  index === activeSuggestion
                    ? "bg-pink-100 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <button
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer hover:scale-110 transition-transform"
          onClick={() => handleSearchSubmit(mobileSearch)}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
