"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, Shield, DollarSign, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface PerformanceMetric {
  period: string;
  return: number;
  benchmark: number;
  excess: number;
}

interface RiskMetric {
  metric: string;
  value: number;
  benchmark: number;
  status: "good" | "warning" | "poor";
}

const mockPerformance: PerformanceMetric[] = [
  { period: "1M", return: 5.2, benchmark: 3.8, excess: 1.4 },
  { period: "3M", return: 12.5, benchmark: 8.9, excess: 3.6 },
  { period: "6M", return: 18.3, benchmark: 15.2, excess: 3.1 },
  { period: "1Y", return: 24.7, benchmark: 22.1, excess: 2.6 },
  { period: "YTD", return: 8.9, benchmark: 6.4, excess: 2.5 }
];

const mockRiskMetrics: RiskMetric[] = [
  { metric: "Sharpe Ratio", value: 1.85, benchmark: 1.0, status: "good" },
  { metric: "Beta", value: 0.92, benchmark: 1.0, status: "good" },
  { metric: "Alpha", value: 2.1, benchmark: 0.0, status: "good" },
  { metric: "Max Drawdown", value: -8.5, benchmark: -15.0, status: "good" },
  { metric: "Volatility", value: 12.3, benchmark: 15.0, status: "good" },
  { metric: "VaR (95%)", value: -3.2, benchmark: -5.0, status: "good" }
];

const mockSectorAllocation = [
  { sector: "Technology", allocation: 45.2, performance: 18.5 },
  { sector: "Healthcare", allocation: 18.7, performance: 12.3 },
  { sector: "Financials", allocation: 15.3, performance: 8.9 },
  { sector: "Consumer Discretionary", allocation: 12.1, performance: 15.7 },
  { sector: "Energy", allocation: 8.7, performance: -2.1 }
];

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");
  const [selectedMetric, setSelectedMetric] = useState("performance");

  const getStatusColor = (status: RiskMetric["status"]) => {
    switch (status) {
      case "good": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBgColor = (status: RiskMetric["status"]) => {
    switch (status) {
      case "good": return "bg-green-100";
      case "warning": return "bg-yellow-100";
      case "poor": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  const totalAllocation = mockSectorAllocation.reduce((sum, sector) => sum + sector.allocation, 0);
  const totalReturn = mockPerformance.find(p => p.period === "1Y")?.return || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Insights</h1>
            <p className="text-muted-foreground">Deep dive into your portfolio performance and risk metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Insights
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{totalReturn.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">vs 22.1% benchmark</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.85</div>
              <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beta</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.92</div>
              <p className="text-xs text-muted-foreground">Market correlation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-8.5%</div>
              <p className="text-xs text-muted-foreground">Peak to trough</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance vs Benchmark</CardTitle>
              <div className="flex space-x-2">
                {["1M", "3M", "6M", "1Y", "YTD"].map((timeframe) => (
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
              <p className="text-muted-foreground">Performance chart will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        {/* Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Period</th>
                    <th className="text-right py-2">Portfolio Return</th>
                    <th className="text-right py-2">Benchmark</th>
                    <th className="text-right py-2">Excess Return</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPerformance.map((metric) => (
                    <tr key={metric.period} className="border-b">
                      <td className="py-2 font-medium">{metric.period}</td>
                      <td className={`text-right py-2 ${metric.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.return >= 0 ? '+' : ''}{metric.return.toFixed(1)}%
                      </td>
                      <td className="text-right py-2 text-muted-foreground">
                        {metric.benchmark.toFixed(1)}%
                      </td>
                      <td className={`text-right py-2 ${metric.excess >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.excess >= 0 ? '+' : ''}{metric.excess.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRiskMetrics.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusBgColor(metric.status)}`}></div>
                      <span className="font-medium">{metric.metric}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getStatusColor(metric.status)}`}>
                        {metric.value.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        vs {metric.benchmark.toFixed(1)} benchmark
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSectorAllocation.map((sector) => (
                  <div key={sector.sector} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{sector.sector}</span>
                      <div className="text-right">
                        <div className="font-semibold">{sector.allocation.toFixed(1)}%</div>
                        <div className={`text-xs ${sector.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress value={sector.allocation} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <h3 className="font-semibold">Portfolio Strength</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your portfolio shows strong risk-adjusted returns with a Sharpe ratio of 1.85, 
                    significantly outperforming the market benchmark.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <h3 className="font-semibold">Diversification Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Technology sector overweight (45.2%) may increase volatility. Consider 
                    rebalancing to reduce concentration risk.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <h3 className="font-semibold">Risk Assessment</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Beta of 0.92 indicates your portfolio moves closely with the market but 
                    with slightly lower volatility, providing good downside protection.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <h3 className="font-semibold">Opportunity Alert</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Healthcare sector showing strong momentum. Consider increasing allocation 
                    from current 18.7% to capture growth potential.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Correlation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Correlation Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-6 gap-2 text-center text-sm">
                  <div className="font-semibold p-2">Asset</div>
                  <div className="font-semibold p-2">AAPL</div>
                  <div className="font-semibold p-2">MSFT</div>
                  <div className="font-semibold p-2">GOOGL</div>
                  <div className="font-semibold p-2">TSLA</div>
                  <div className="font-semibold p-2">SPY</div>
                  
                  {["AAPL", "MSFT", "GOOGL", "TSLA", "SPY"].map((asset, i) => (
                    <div key={asset} className="font-semibold p-2 border-t">{asset}</div>
                  ))}
                  
                  {[
                    [1.00, 0.85, 0.78, 0.45, 0.92],
                    [0.85, 1.00, 0.82, 0.52, 0.89],
                    [0.78, 0.82, 1.00, 0.48, 0.85],
                    [0.45, 0.52, 0.48, 1.00, 0.65],
                    [0.92, 0.89, 0.85, 0.65, 1.00]
                  ].map((row, i) => 
                    row.map((corr, j) => (
                      <div key={`${i}-${j}`} className={`p-2 border-t ${i === j ? 'bg-muted' : ''}`}>
                        {corr.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 