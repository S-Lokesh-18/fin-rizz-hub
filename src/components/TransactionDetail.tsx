import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ExpenseCategory } from "@/data/financeData";

interface TransactionDetailProps {
  category: ExpenseCategory | null;
  onBack: () => void;
}

const TransactionDetail = ({ category, onBack }: TransactionDetailProps) => {
  return (
    <AnimatePresence mode="wait">
      {category && (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-5"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to categories
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.transactions.length} transactions · Total ₹{category.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {category.transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <span className="text-sm font-semibold text-destructive ml-3 whitespace-nowrap">
                  -${tx.amount.toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionDetail;
