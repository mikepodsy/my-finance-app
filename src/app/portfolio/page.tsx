"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface Holding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

const mockHoldings: Holding[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    avgPrice: 150.00,
    currentPrice: 175.50,
    totalValue: 1755.00,
    gainLoss: 255.00,
    gainLossPercent: 17.00
  },
  {
    id: "2",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 5,
    avgPrice: 200.00,
    currentPrice: 185.25,
    totalValue: 926.25,
    gainLoss: -73.75,
    gainLossPercent: -7.38
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 8,
    avgPrice: 300.00,
    currentPrice: 325.75,
    totalValue: 2606.00,
    gainLoss: 206.00,
    gainLossPercent: 8.58
  },
  {
    id: "4",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 3,
    avgPrice: 120.00,
    currentPrice: 135.50,
    totalValue: 406.50,
    gainLoss: 46.50,
    gainLossPercent: 12.92
  }
];

export default function PortfolioPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  
  const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalGainLoss = mockHoldings.reduce((sum, holding) => sum + holding.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$127.50</div>
              <p className="text-xs text-green-600">+2.1%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHoldings.length}</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,234.75</div>
              <p className="text-xs text-muted-foreground">Available for trading</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Portfolio Performance</CardTitle>
              <div className="flex space-x-2">
                {["1W", "1M", "3M", "6M", "1Y", "ALL"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Chart component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Holdings</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Position
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHoldings.map((holding) => (
                <div key={holding.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-semibold">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="font-semibold">{holding.shares} shares</div>
                      <div className="text-sm text-muted-foreground">
                        @ ${holding.avgPrice.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${holding.currentPrice.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Current</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${holding.totalValue.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toFixed(2)}
                      </div>
                      <div className={`text-sm ${holding.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gainLossPercent >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="w-24">
                      <Progress 
                        value={Math.abs(holding.gainLossPercent)} 
                        className={holding.gainLossPercent >= 0 ? "bg-green-100" : "bg-red-100"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Technology</span>
                  </div>
                  <span className="font-semibold">45.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Automotive</span>
                  </div>
                  <span className="font-semibold">18.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Software</span>
                  </div>
                  <span className="font-semibold">36.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bought AAPL</div>
                    <div className="text-sm text-muted-foreground">5 shares @ $175.50</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">-$877.50</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sold TSLA</div>
                    <div className="text-sm text-muted-foreground">2 shares @ $185.25</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">+$370.50</div>
                    <div className="text-sm text-muted-foreground">Yesterday</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bought MSFT</div>
                    <div className="text-sm text-muted-foreground">3 shares @ $325.75</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">-$977.25</div>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 