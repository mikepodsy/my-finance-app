import { AlertTriangle, ExternalLink, X } from "lucide-react";

interface ImpactAlertCardProps {
  id: string;
  stockSymbol: string;
  stockName: string;
  currentPrice: number;
  newsTitle: string;
  newsSource: string;
  impactScore: number;
  predictedImpact: number;
  confidenceLevel: number;
  explanation: string;
  onDismiss: (id: string) => void;
}

export function ImpactAlertCard({
  id,
  stockSymbol,
  stockName,
  currentPrice,
  newsTitle,
  newsSource,
  impactScore,
  predictedImpact,
  confidenceLevel,
  explanation,
  onDismiss
}: ImpactAlertCardProps) {
  const getImpactColor = (score: number) => {
    if (score >= 7) return "text-red-400";
    if (score >= 4) return "text-yellow-400";
    return "text-green-400";
  };

  const getImpactBgColor = (score: number) => {
    if (score >= 7) return "bg-red-500/20";
    if (score >= 4) return "bg-yellow-500/20";
    return "bg-green-500/20";
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-gray-300">High Impact Alert</span>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white">{stockSymbol}</h4>
            <p className="text-sm text-gray-400">{stockName}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-white">${currentPrice}</p>
            <p className={`text-sm font-medium ${predictedImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {predictedImpact >= 0 ? '+' : ''}{predictedImpact.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-gray-700 rounded p-3">
          <p className="text-sm text-white mb-2">{newsTitle}</p>
          <p className="text-xs text-gray-400">{newsSource}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Impact Score:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactBgColor(impactScore)} ${getImpactColor(impactScore)}`}>
              {impactScore}/10
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Confidence:</span>
            <span className="text-sm text-white">{(confidenceLevel * 100).toFixed(0)}%</span>
          </div>
        </div>

        <p className="text-sm text-gray-300">{explanation}</p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <button className="flex items-center space-x-1 text-green-400 hover:text-green-300 text-sm transition-colors">
            <ExternalLink className="w-3 h-3" />
            <span>Read More</span>
          </button>
          <span className="text-xs text-gray-500">2 min ago</span>
        </div>
      </div>
    </div>
  );
} 