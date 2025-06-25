import Link from "next/link";
import { 
  BarChart3, 
  TrendingUp, 
  Bell, 
  BookOpen, 
  Settings, 
  Home,
  Eye,
  Target
} from "lucide-react";

export function Sidebar() {
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Portfolio", href: "/portfolio", icon: BarChart3 },
    { name: "Watchlist", href: "/watchlist", icon: Eye },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "News", href: "/news", icon: BookOpen },
    { name: "Policy Tracker", href: "/policy", icon: Target },
    { name: "Analytics", href: "/analytics", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">V</span>
          </div>
          <h1 className="text-xl font-bold text-green-400">Viper</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Financial Intelligence</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 