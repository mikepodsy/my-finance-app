import { TrendingUp, TrendingDown, Plus } from "lucide-react";

interface WatchlistStock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

interface WatchlistWidgetProps {
  stocks: WatchlistStock[];
  onAddStock: () => void;
}

export function WatchlistWidget({ stocks, onAddStock }: WatchlistWidgetProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Watchlist</h3>
        <button
          onClick={onAddStock}
          className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Stock</span>
        </button>
      </div>

      <div className="space-y-3">
        {stocks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-2">No stocks in watchlist</p>
            <button
              onClick={onAddStock}
              className="text-green-400 hover:text-green-300 text-sm"
            >
              Add your first stock
            </button>
          </div>
        ) : (
          stocks.map((stock) => {
            const isPositive = stock.change >= 0;
            return (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-white">{stock.symbol}</h4>
                    <span className="text-xs text-gray-400">{stock.name}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-white">${stock.currentPrice}</p>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
} 