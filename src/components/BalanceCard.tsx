import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
  label: string;
  amount: number;
  trend?: "up" | "down";
  trendValue?: string;
  variant?: "primary" | "expense";
}

const BalanceCard = ({ label, amount, trend, trendValue, variant = "primary" }: BalanceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.4 }}
      className="glass-card glow-border p-6 flex-1 min-w-[260px]"
    >
      <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
      <div className="flex items-end gap-3">
        <h2 className={`stat-value ${variant === "expense" ? "text-destructive" : "text-primary"}`}>
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        {trend && trendValue && (
          <span className={`flex items-center gap-1 text-xs font-medium pb-1 ${trend === "up" ? "text-primary" : "text-destructive"}`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default BalanceCard;
