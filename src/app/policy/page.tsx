"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, TrendingUp, TrendingDown, FileText, Users, Clock, CheckCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

interface PolicyEvent {
  id: string;
  title: string;
  description: string;
  category: "regulation" | "legislation" | "enforcement" | "guidance" | "deadline";
  status: "upcoming" | "active" | "completed" | "delayed";
  impact: "high" | "medium" | "low";
  date: Date;
  deadline?: Date;
  affectedSectors: string[];
  complianceStatus: "compliant" | "pending" | "non-compliant" | "exempt";
  marketImpact: "positive" | "negative" | "neutral";
}

const mockPolicyEvents: PolicyEvent[] = [
  {
    id: "1",
    title: "SEC Climate Disclosure Rules",
    description: "New requirements for public companies to disclose climate-related risks and greenhouse gas emissions.",
    category: "regulation",
    status: "active",
    impact: "high",
    date: new Date("2024-03-15"),
    deadline: new Date("2024-12-31"),
    affectedSectors: ["Technology", "Energy", "Financials"],
    complianceStatus: "pending",
    marketImpact: "negative"
  },
  {
    id: "2",
    title: "Federal Reserve Rate Decision",
    description: "FOMC meeting to discuss interest rate policy and economic outlook.",
    category: "guidance",
    status: "upcoming",
    impact: "high",
    date: new Date("2024-03-20"),
    affectedSectors: ["Financials", "Real Estate", "Consumer Discretionary"],
    complianceStatus: "exempt",
    marketImpact: "neutral"
  },
  {
    id: "3",
    title: "Digital Asset Regulation Framework",
    description: "Comprehensive regulatory framework for cryptocurrency and digital asset trading.",
    category: "legislation",
    status: "upcoming",
    impact: "medium",
    date: new Date("2024-04-01"),
    deadline: new Date("2024-06-30"),
    affectedSectors: ["Technology", "Financials"],
    complianceStatus: "pending",
    marketImpact: "positive"
  },
  {
    id: "4",
    title: "ESG Reporting Standards",
    description: "Mandatory ESG reporting requirements for institutional investors.",
    category: "regulation",
    status: "completed",
    impact: "medium",
    date: new Date("2024-01-15"),
    affectedSectors: ["Financials", "Energy", "Consumer Staples"],
    complianceStatus: "compliant",
    marketImpact: "positive"
  },
  {
    id: "5",
    title: "Antitrust Investigation - Tech Sector",
    description: "Ongoing antitrust investigation into major technology companies' market practices.",
    category: "enforcement",
    status: "active",
    impact: "high",
    date: new Date("2024-02-01"),
    affectedSectors: ["Technology"],
    complianceStatus: "exempt",
    marketImpact: "negative"
  },
  {
    id: "6",
    title: "Tax Filing Deadline Extension",
    description: "Extended deadline for corporate tax filings due to system updates.",
    category: "deadline",
    status: "upcoming",
    impact: "low",
    date: new Date("2024-04-15"),
    deadline: new Date("2024-05-15"),
    affectedSectors: ["All Sectors"],
    complianceStatus: "pending",
    marketImpact: "neutral"
  }
];

export default function PolicyPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | PolicyEvent["category"]>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | PolicyEvent["status"]>("all");
  const [selectedImpact, setSelectedImpact] = useState<"all" | PolicyEvent["impact"]>("all");

  const filteredEvents = mockPolicyEvents.filter(event => {
    if (selectedCategory !== "all" && event.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && event.status !== selectedStatus) return false;
    if (selectedImpact !== "all" && event.impact !== selectedImpact) return false;
    return true;
  });

  const getStatusColor = (status: PolicyEvent["status"]) => {
    switch (status) {
      case "upcoming": return "text-blue-600 bg-blue-100";
      case "active": return "text-orange-600 bg-orange-100";
      case "completed": return "text-green-600 bg-green-100";
      case "delayed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getImpactColor = (impact: PolicyEvent["impact"]) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getComplianceColor = (status: PolicyEvent["complianceStatus"]) => {
    switch (status) {
      case "compliant": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "non-compliant": return "text-red-600";
      case "exempt": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getMarketImpactColor = (impact: PolicyEvent["marketImpact"]) => {
    switch (impact) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      case "neutral": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getMarketImpactIcon = (impact: PolicyEvent["marketImpact"]) => {
    switch (impact) {
      case "positive": return <TrendingUp className="h-4 w-4" />;
      case "negative": return <TrendingDown className="h-4 w-4" />;
      case "neutral": return <div className="h-4 w-4" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const daysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingEvents = mockPolicyEvents.filter(event => event.status === "upcoming").length;
  const activeEvents = mockPolicyEvents.filter(event => event.status === "active").length;
  const highImpactEvents = mockPolicyEvents.filter(event => event.impact === "high").length;
  const compliantEvents = mockPolicyEvents.filter(event => event.complianceStatus === "compliant").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Policy Tracker</h1>
            <p className="text-muted-foreground">Monitor regulatory changes and policy impacts on your investments</p>
          </div>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Compliance Report
          </Button>
        </div>

        {/* Policy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{activeEvents}</div>
              <p className="text-xs text-muted-foreground">Currently in effect</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Impact</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highImpactEvents}</div>
              <p className="text-xs text-muted-foreground">Critical policies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {((compliantEvents / mockPolicyEvents.length) * 100).toFixed(0)}%
              </div>
              <p className="text-xs text-muted-foreground">Fully compliant</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex space-x-2">
                {["all", "regulation", "legislation", "enforcement", "guidance", "deadline"].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category as "all" | "regulation" | "legislation" | "enforcement" | "guidance" | "deadline")}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                {["all", "upcoming", "active", "completed", "delayed"].map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status as "all" | "upcoming" | "active" | "completed" | "delayed")}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                {["all", "high", "medium", "low"].map((impact) => (
                  <Button
                    key={impact}
                    variant={selectedImpact === impact ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedImpact(impact as "all" | "high" | "medium" | "low")}
                  >
                    {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policy Events */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Events ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge className={getImpactColor(event.impact)}>
                          {event.impact} Impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        {event.deadline && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Deadline: {formatDate(event.deadline)} ({daysUntilDeadline(event.deadline)} days)</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{event.affectedSectors.join(", ")}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Compliance:</span>
                          <span className={`text-sm ${getComplianceColor(event.complianceStatus)}`}>
                            {event.complianceStatus}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Market Impact:</span>
                          <div className={`flex items-center space-x-1 ${getMarketImpactColor(event.marketImpact)}`}>
                            {getMarketImpactIcon(event.marketImpact)}
                            <span className="text-sm">{event.marketImpact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No policy events match your current filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["compliant", "pending", "non-compliant", "exempt"].map((status) => {
                  const count = mockPolicyEvents.filter(event => event.complianceStatus === status).length;
                  const percentage = (count / mockPolicyEvents.length) * 100;
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{status}</span>
                        <span className="text-sm text-muted-foreground">{count} events</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["positive", "negative", "neutral"].map((impact) => {
                  const count = mockPolicyEvents.filter(event => event.marketImpact === impact).length;
                  const percentage = (count / mockPolicyEvents.length) * 100;
                  return (
                    <div key={impact} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getMarketImpactIcon(impact as PolicyEvent["marketImpact"])}
                          <span className="text-sm font-medium capitalize">{impact}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{count} events</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPolicyEvents
                .filter(event => event.deadline && event.status !== "completed")
                .sort((a, b) => a.deadline!.getTime() - b.deadline!.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Deadline: {formatDate(event.deadline!)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${daysUntilDeadline(event.deadline!) <= 30 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {daysUntilDeadline(event.deadline!)} days
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.complianceStatus}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 