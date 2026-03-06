import { motion, AnimatePresence } from "framer-motion";
import { ExpenseCategory } from "@/data/financeData";

interface CategoryListProps {
  categories: ExpenseCategory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  totalExpenses: number;
}

const CategoryList = ({ categories, selectedId, onSelect, totalExpenses }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {categories.map((cat, i) => {
        const isActive = selectedId === cat.id;
        const pct = ((cat.total / totalExpenses) * 100).toFixed(1);
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(cat.id)}
            className={`glass-card p-4 text-left transition-all duration-200 cursor-pointer ${
              isActive
                ? "ring-2 ring-primary/60 border-primary/40"
                : "hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground truncate">{cat.name}</span>
            </div>
            <p className="stat-value text-lg text-foreground">
              ${cat.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-2 w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                className={`h-full rounded-full bg-${cat.color}`}
                style={{ backgroundColor: `hsl(var(--${cat.color}))` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{pct}%</p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryList;
