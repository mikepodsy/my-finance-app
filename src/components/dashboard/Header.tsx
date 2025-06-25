import { Bell, Search, User } from "lucide-react";
import { useState, useRef } from "react";

interface StockResult {
  symbol: string;
  name: string;
}

export function Header() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<StockResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function isStockResultArray(data: unknown): data is { results: StockResult[] } {
    return (
      typeof data === "object" &&
      data !== null &&
      Array.isArray((data as { results?: unknown }).results) &&
      ((data as { results: unknown[] }).results.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as StockResult).symbol === "string" &&
          typeof (item as StockResult).name === "string"
      ))
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.length === 0) {
      setResults([]);
      setShowDropdown(false);
      setHasMore(false);
      return;
    }
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      fetch(`/api/search-stocks?q=${encodeURIComponent(value)}`)
        .then((res) => res.json())
        .then((data: unknown) => {
          if (isStockResultArray(data)) {
            setResults(data.results.slice(0, 3));
            setHasMore(data.results.length > 3);
            setShowDropdown(true);
          } else {
            setResults([]);
            setHasMore(false);
            setShowDropdown(false);
          }
        })
        .catch(() => {
          setResults([]);
          setHasMore(false);
          setShowDropdown(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 relative">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stocks, news, or policies..."
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
              value={search}
              onChange={handleSearchChange}
              onFocus={() => search && setShowDropdown(true)}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {showDropdown && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                {loading ? (
                  <div className="p-4 text-gray-400 text-center">Searching...</div>
                ) : results.length === 0 ? (
                  <div className="p-4 text-gray-400 text-center">No stocks found</div>
                ) : (
                  <>
                    {results.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex flex-col"
                      >
                        <span className="font-semibold text-white">{stock.symbol}</span>
                        <span className="text-xs text-gray-400">{stock.name}</span>
                      </div>
                    ))}
                    {hasMore && (
                      <button className="w-full px-4 py-2 text-green-400 hover:bg-gray-800 text-sm font-medium border-t border-gray-700">See more stocks</button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 