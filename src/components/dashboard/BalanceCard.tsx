import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface BalanceCardProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export function BalanceCard({ totalValue, dailyChange, dailyChangePercent }: BalanceCardProps) {
  const isPositive = dailyChange >= 0;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Portfolio Value</h3>
        <DollarSign className="w-5 h-5 text-green-400" />
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-bold text-white">
          ${totalValue.toLocaleString()}
        </div>
        
        <div className="flex items-center space-x-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{dailyChange.toFixed(2)} ({dailyChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
} 