"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Bell, TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface WatchlistStock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  dividend: number;
  isWatched: boolean;
  alertPrice?: number;
}

const mockWatchlist: WatchlistStock[] = [
  {
    id: "1",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    currentPrice: 485.75,
    change: 12.50,
    changePercent: 2.64,
    volume: 45678900,
    marketCap: 1198000000000,
    pe: 75.2,
    dividend: 0.16,
    isWatched: true,
    alertPrice: 500.00
  },
  {
    id: "2",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    currentPrice: 125.30,
    change: -2.15,
    changePercent: -1.69,
    volume: 23456700,
    marketCap: 202500000000,
    pe: 45.8,
    dividend: 0.00,
    isWatched: true
  },
  {
    id: "3",
    symbol: "META",
    name: "Meta Platforms, Inc.",
    currentPrice: 378.90,
    change: 8.75,
    changePercent: 2.36,
    volume: 18923400,
    marketCap: 965000000000,
    pe: 28.4,
    dividend: 0.00,
    isWatched: true,
    alertPrice: 400.00
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    currentPrice: 145.25,
    change: 3.45,
    changePercent: 2.43,
    volume: 34567800,
    marketCap: 1510000000000,
    pe: 62.1,
    dividend: 0.00,
    isWatched: true
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    currentPrice: 185.25,
    change: -5.75,
    changePercent: -3.01,
    volume: 56789000,
    marketCap: 589000000000,
    pe: 45.2,
    dividend: 0.00,
    isWatched: true
  }
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>(mockWatchlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyWatched, setShowOnlyWatched] = useState(true);
  const [sortBy, setSortBy] = useState<"symbol" | "change" | "price">("symbol");

  const filteredWatchlist = watchlist
    .filter(stock => 
      (showOnlyWatched ? stock.isWatched : true) &&
      (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
       stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "symbol":
          return a.symbol.localeCompare(b.symbol);
        case "change":
          return Math.abs(b.changePercent) - Math.abs(a.changePercent);
        case "price":
          return b.currentPrice - a.currentPrice;
        default:
          return 0;
      }
    });

  const toggleWatch = (stockId: string) => {
    setWatchlist(prev => 
      prev.map(stock => 
        stock.id === stockId 
          ? { ...stock, isWatched: !stock.isWatched }
          : stock
      )
    );
  };

  const removeFromWatchlist = (stockId: string) => {
    setWatchlist(prev => prev.filter(stock => stock.id !== stockId));
  };

  const setAlertPrice = (stockId: string, price: number) => {
    setWatchlist(prev => 
      prev.map(stock => 
        stock.id === stockId 
          ? { ...stock, alertPrice: price }
          : stock
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Watchlist</h1>
            <p className="text-muted-foreground">Track your favorite stocks and set price alerts</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant={showOnlyWatched ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowOnlyWatched(!showOnlyWatched)}
                >
                  {showOnlyWatched ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                  {showOnlyWatched ? "Watched Only" : "Show All"}
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "symbol" | "change" | "price")}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="symbol">Sort by Symbol</option>
                  <option value="change">Sort by Change</option>
                  <option value="price">Sort by Price</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Watchlist Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stocks ({filteredWatchlist.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredWatchlist.map((stock) => (
                <div key={stock.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-semibold text-lg">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="font-semibold">${stock.currentPrice.toFixed(2)}</div>
                      <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Vol: {(stock.volume / 1000000).toFixed(1)}M</div>
                      <div>P/E: {stock.pe.toFixed(1)}</div>
                    </div>
                    
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Market Cap: ${(stock.marketCap / 1000000000).toFixed(1)}B</div>
                      <div>Div: {stock.dividend > 0 ? `${stock.dividend.toFixed(2)}%` : 'N/A'}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {stock.alertPrice && (
                        <Badge variant="secondary" className="text-xs">
                          Alert: ${stock.alertPrice}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWatch(stock.id)}
                      >
                        {stock.isWatched ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAlertPrice(stock.id, stock.currentPrice)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWatchlist(stock.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Gainers</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {watchlist
                  .filter(stock => stock.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.id} className="flex justify-between text-sm">
                      <span>{stock.symbol}</span>
                      <span className="text-green-600">+{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Losers</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {watchlist
                  .filter(stock => stock.changePercent < 0)
                  .sort((a, b) => a.changePercent - b.changePercent)
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.id} className="flex justify-between text-sm">
                      <span>{stock.symbol}</span>
                      <span className="text-red-600">{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {watchlist
                  .sort((a, b) => b.volume - a.volume)
                  .slice(0, 3)
                  .map((stock) => (
                    <div key={stock.id} className="flex justify-between text-sm">
                      <span>{stock.symbol}</span>
                      <span className="text-muted-foreground">{(stock.volume / 1000000).toFixed(1)}M</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Price Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {watchlist
                .filter(stock => stock.alertPrice)
                .map((stock) => (
                  <div key={stock.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        Alert at ${stock.alertPrice} (Current: ${stock.currentPrice.toFixed(2)})
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={stock.currentPrice >= stock.alertPrice! ? "default" : "secondary"}
                      >
                        {stock.currentPrice >= stock.alertPrice! ? "Triggered" : "Active"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              {watchlist.filter(stock => stock.alertPrice).length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No price alerts set. Click the bell icon next to any stock to set an alert.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 