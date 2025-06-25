"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bookmark, Share2, TrendingUp, TrendingDown, Globe, Clock, Filter, Search } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  url: string;
  publishedAt: Date;
  category: "market" | "earnings" | "policy" | "tech" | "economy" | "crypto";
  sentiment: "positive" | "negative" | "neutral";
  symbols: string[];
  isBookmarked: boolean;
  readTime: number;
}

const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cuts in 2024",
    summary: "The Federal Reserve indicated a dovish stance in its latest meeting, suggesting potential interest rate cuts could begin as early as March 2024.",
    content: "Federal Reserve officials signaled Wednesday that they expect to cut interest rates three times next year, a more dovish stance than many investors had anticipated...",
    source: "Wall Street Journal",
    url: "https://example.com/fed-rate-cuts-2024",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: "policy",
    sentiment: "positive",
    symbols: ["SPY", "QQQ", "IWM"],
    isBookmarked: false,
    readTime: 5
  },
  {
    id: "2",
    title: "NVIDIA Reports Record Q4 Earnings, Stock Surges 8%",
    summary: "NVIDIA exceeded analyst expectations with record-breaking quarterly earnings, driven by strong demand for AI chips.",
    content: "NVIDIA Corporation reported fiscal fourth-quarter earnings that exceeded analyst expectations, with revenue reaching $22.1 billion...",
    source: "Reuters",
    url: "https://example.com/nvidia-earnings-q4",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    category: "earnings",
    sentiment: "positive",
    symbols: ["NVDA", "AMD", "INTC"],
    isBookmarked: true,
    readTime: 4
  },
  {
    id: "3",
    title: "Tech Sector Faces Regulatory Scrutiny Over AI Development",
    summary: "Major technology companies face increased regulatory oversight as concerns grow over AI development and data privacy.",
    content: "Technology giants including Microsoft, Google, and Meta are facing increased regulatory scrutiny as lawmakers and regulators express concerns...",
    source: "Bloomberg",
    url: "https://example.com/tech-regulation-ai",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    category: "tech",
    sentiment: "negative",
    symbols: ["MSFT", "GOOGL", "META"],
    isBookmarked: false,
    readTime: 6
  },
  {
    id: "4",
    title: "Bitcoin Reaches New All-Time High Above $50,000",
    summary: "Bitcoin surged past $50,000 for the first time since 2021, driven by institutional adoption and ETF inflows.",
    content: "Bitcoin reached a new all-time high above $50,000 on Wednesday, marking a significant milestone for the cryptocurrency...",
    source: "CoinDesk",
    url: "https://example.com/bitcoin-50k-high",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    category: "crypto",
    sentiment: "positive",
    symbols: ["BTC", "ETH", "COIN"],
    isBookmarked: false,
    readTime: 3
  },
  {
    id: "5",
    title: "Inflation Data Shows Cooling Trend, Markets Rally",
    summary: "Latest inflation data indicates a continued cooling trend, boosting market optimism about economic stability.",
    content: "Consumer price index data released today showed inflation continuing to cool, with the annual rate falling to 3.1%...",
    source: "CNBC",
    url: "https://example.com/inflation-cooling-markets",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    category: "economy",
    sentiment: "positive",
    symbols: ["SPY", "DIA", "VTI"],
    isBookmarked: false,
    readTime: 4
  },
  {
    id: "6",
    title: "Tesla Faces Production Challenges Amid Supply Chain Issues",
    summary: "Tesla reports production delays due to ongoing supply chain disruptions, affecting Q1 delivery targets.",
    content: "Tesla Inc. announced today that it expects to miss its first-quarter delivery targets due to ongoing supply chain challenges...",
    source: "MarketWatch",
    url: "https://example.com/tesla-production-challenges",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    category: "market",
    sentiment: "negative",
    symbols: ["TSLA", "F", "GM"],
    isBookmarked: false,
    readTime: 5
  }
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>(mockNews);
  const [selectedCategory, setSelectedCategory] = useState<"all" | NewsArticle["category"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "sentiment" | "popular">("latest");

  const filteredNews = news
    .filter(article => {
      if (selectedCategory !== "all" && article.category !== selectedCategory) return false;
      if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !article.summary.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        case "sentiment":
          const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
          return sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment];
        case "popular":
          return b.readTime - a.readTime;
        default:
          return 0;
      }
    });

  const toggleBookmark = (articleId: string) => {
    setNews(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const getSentimentColor = (sentiment: NewsArticle["sentiment"]) => {
    switch (sentiment) {
      case "positive": return "text-green-600 bg-green-100";
      case "negative": return "text-red-600 bg-red-100";
      case "neutral": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryColor = (category: NewsArticle["category"]) => {
    switch (category) {
      case "market": return "bg-blue-100 text-blue-800";
      case "earnings": return "bg-green-100 text-green-800";
      case "policy": return "bg-purple-100 text-purple-800";
      case "tech": return "bg-orange-100 text-orange-800";
      case "economy": return "bg-yellow-100 text-yellow-800";
      case "crypto": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const positiveNews = news.filter(article => article.sentiment === "positive").length;
  const negativeNews = news.filter(article => article.sentiment === "negative").length;
  const neutralNews = news.filter(article => article.sentiment === "neutral").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial News</h1>
            <p className="text-muted-foreground">Stay informed with the latest market insights and analysis</p>
          </div>
          <Button>
            <Globe className="h-4 w-4 mr-2" />
            Refresh News
          </Button>
        </div>

        {/* Market Sentiment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{news.length}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{positiveNews}</div>
              <p className="text-xs text-muted-foreground">
                {((positiveNews / news.length) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negative Sentiment</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{negativeNews}</div>
              <p className="text-xs text-muted-foreground">
                {((negativeNews / news.length) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {news.filter(article => article.isBookmarked).length}
              </div>
              <p className="text-xs text-muted-foreground">Saved articles</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {["all", "market", "earnings", "policy", "tech", "economy", "crypto"].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category as any)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "latest" | "sentiment" | "popular")}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="latest">Latest</option>
                  <option value="sentiment">Sentiment</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <Badge className={getSentimentColor(article.sentiment)}>
                        {article.sentiment}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2">
                      {article.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-3">
                      {article.summary}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{article.source}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                  
                  {article.symbols.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Related:</span>
                      {article.symbols.map((symbol) => (
                        <Badge key={symbol} variant="outline" className="text-xs">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm">
                      Read Full Article
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                      >
                        <Bookmark className={`h-4 w-4 ${article.isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No news articles match your current filters</p>
            </CardContent>
          </Card>
        )}

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Federal Reserve", "AI Stocks", "Earnings Season", "Crypto Rally", "Tech Regulation", "Market Volatility"].map((topic) => (
                <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  #{topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 