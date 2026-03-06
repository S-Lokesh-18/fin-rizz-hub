import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Receipt } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import CreditCardVisual from "@/components/CreditCardVisual";
import CategoryList from "@/components/CategoryList";
import TransactionDetail from "@/components/TransactionDetail";
import { expenseCategories, totalBalance, totalExpenses } from "@/data/financeData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCat = expenseCategories.find((c) => c.id === selectedCategory) ?? null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Fin <span className="text-primary">Rizz</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Your money, your moves 💸</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <span className="text-primary font-display font-bold text-sm">AJ</span>
          </motion.div>
        </motion.header>

        {/* Credit Card + Balance Row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center lg:justify-start"
          >
            <CreditCardVisual />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <BalanceCard
              label="Available Balance"
              amount={totalBalance}
              trend="up"
              trendValue="+2.4%"
            />
            <BalanceCard
              label="Total Expenses"
              amount={totalExpenses}
              trend="down"
              trendValue="+8.1% vs last month"
              variant="expense"
            />
          </div>
        </div>

        {/* Expenses Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Receipt className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">Expense Breakdown</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <CategoryList
              categories={expenseCategories}
              selectedId={selectedCategory}
              onSelect={(id) => setSelectedCategory(id === selectedCategory ? null : id)}
              totalExpenses={totalExpenses}
            />

            {activeCat ? (
              <TransactionDetail category={activeCat} onBack={() => setSelectedCategory(null)} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8 flex flex-col items-center justify-center text-center"
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <Wallet className="w-12 h-12 text-muted-foreground/40 mb-4" />
                </motion.div>
                <p className="text-muted-foreground text-sm">Select a category to see transactions</p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
