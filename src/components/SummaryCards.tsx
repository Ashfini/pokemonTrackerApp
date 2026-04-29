import type { PokemonSummary } from "../types";

interface SummaryCardsProps {
  summary: PokemonSummary;
}

function SummaryCards({ summary }: SummaryCardsProps) {
  // Helper function to format a number as currency
  const formatCurrency = (amount: number): string => {
    return "$" + Math.abs(amount).toFixed(2);
  };

  return (
    <div className="summary">
      
       {/* Total Pokémon Count Card */}
      <div className="summary-card income"> 
        <div className="label">Total Pokémon</div>
        <div className="amount">{summary.totalCount}</div>
      </div>

      {/* Average Rating Card */}
      <div className="summary-card expenses">
        <div className="label">Average Rating</div>
        <div className="amount">{summary.averageRating.toFixed(1)}</div>
      </div>

      {/* Total Value Card */}
      <div className={`summary-card balance`}>
        <div className="label">Total Value</div>
        <div className="amount">
          {formatCurrency(summary.totalValue)}
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;