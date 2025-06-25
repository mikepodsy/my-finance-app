"use client";

import { useState } from "react";
import { DashboardLayout } from "~/components/dashboard/DashboardLayout";
import { BalanceCard } from "~/components/dashboard/BalanceCard";
import { ImpactAlertCard } from "~/components/dashboard/ImpactAlertCard";
import { WatchlistWidget } from "~/components/dashboard/WatchlistWidget";

// Mock data for demonstration
const mockAlerts = [
  {
    id: "1",
    stockSymbol: "AAPL",
    stockName: "Apple Inc.",
    currentPrice: 175.43,
    newsTitle: "Apple announces new AI features for iPhone 16",
    newsSource: "Reuters",
    impactScore: 8.5,
    predictedImpact: 3.2,
    confidenceLevel: 0.85,
    explanation: "Positive sentiment around new AI capabilities could drive increased consumer demand and market share gains."
  },
  {
    id: "2",
    stockSymbol: "TSLA",
    stockName: "Tesla Inc.",
    currentPrice: 248.50,
    newsTitle: "Tesla faces regulatory scrutiny over autonomous driving claims",
    newsSource: "Bloomberg",
    impactScore: 7.2,
    predictedImpact: -2.1,
    confidenceLevel: 0.78,
    explanation: "Regulatory concerns could impact consumer confidence and delay autonomous driving features."
  },
  {
    id: "3",
    stockSymbol: "NVDA",
    stockName: "NVIDIA Corporation",
    currentPrice: 892.37,
    newsTitle: "NVIDIA reports record quarterly earnings, beats expectations",
    newsSource: "CNBC",
    impactScore: 9.1,
    predictedImpact: 4.8,
    confidenceLevel: 0.92,
    explanation: "Strong earnings performance and continued AI chip demand position NVIDIA for sustained growth."
  }
];

const mockWatchlist = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 175.43,
    change: 2.15,
    changePercent: 1.24
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    currentPrice: 378.85,
    change: -1.23,
    changePercent: -0.32
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 142.56,
    change: 0.89,
    changePercent: 0.63
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    currentPrice: 145.24,
    change: 3.45,
    changePercent: 2.43
  }
];

export default function Dashboard() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleAddStock = () => {
    // TODO: Implement add stock functionality
    console.log("Add stock clicked");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s your financial intelligence overview.</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard
            totalValue={125430.67}
            dailyChange={2345.89}
            dailyChangePercent={1.91}
          />
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Top Performers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white">NVDA</span>
                <span className="text-green-400">+4.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">AAPL</span>
                <span className="text-green-400">+3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">AMZN</span>
                <span className="text-green-400">+2.4%</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Market Sentiment</h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">Bullish</div>
              <div className="text-sm text-gray-400">Based on 24h news analysis</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Impact Alerts */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">High Impact Alerts</h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <ImpactAlertCard
                    key={alert.id}
                    {...alert}
                    onDismiss={handleDismissAlert}
                  />
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No high-impact alerts at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Watchlist */}
          <div>
            <WatchlistWidget
              stocks={mockWatchlist}
              onAddStock={handleAddStock}
            />
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Market News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Federal Reserve signals potential rate cuts in 2024",
                source: "Wall Street Journal",
                sentiment: "positive",
                time: "1 hour ago"
              },
              {
                title: "Tech sector leads market rally as AI adoption accelerates",
                source: "Reuters",
                sentiment: "positive",
                time: "2 hours ago"
              },
              {
                title: "Oil prices stabilize after OPEC+ production agreement",
                source: "Bloomberg",
                sentiment: "neutral",
                time: "3 hours ago"
              }
            ].map((news, index) => (
              <div key={index} className="bg-gray-700 rounded p-4 hover:bg-gray-600 transition-colors cursor-pointer">
                <h4 className="font-medium text-white mb-2">{news.title}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{news.source}</span>
                  <span className="text-gray-500">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
