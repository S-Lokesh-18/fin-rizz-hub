import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, AlertTriangle, XCircle, CheckCircle, Zap } from "lucide-react";
import { expenseCategories, Transaction } from "@/data/financeData";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  lastUsed: string | null;
  daysInactive: number;
  cancelled: boolean;
}

// Scan transactions to find recurring payments (same name, same amount appearing monthly)
function detectZombieSubscriptions(): Subscription[] {
  const allTransactions: Transaction[] = expenseCategories.flatMap((c) => c.transactions);

  // Group by name
  const byName: Record<string, Transaction[]> = {};
  allTransactions.forEach((tx) => {
    const key = tx.name.toLowerCase();
    if (!byName[key]) byName[key] = [];
    byName[key].push(tx);
  });

  // Known subscription services to flag
  const subscriptionKeywords = ["netflix", "spotify", "gym", "internet", "phone bill", "electricity"];
  
  const subs: Subscription[] = [];
  
  Object.entries(byName).forEach(([key, txs]) => {
    const isSubscription = subscriptionKeywords.some((kw) => key.includes(kw));
    if (isSubscription && txs.length > 0) {
      const tx = txs[0];
      // Simulate usage data — some services are "unused"
      const unusedServices = ["netflix", "spotify", "gym"];
      const isUnused = unusedServices.some((s) => key.includes(s));
      
      subs.push({
        id: tx.id,
        name: tx.name,
        amount: tx.amount,
        lastUsed: isUnused ? null : "Recently",
        daysInactive: isUnused ? Math.floor(Math.random() * 30 + 15) : 0,
        cancelled: false,
      });
    }
  });

  return subs;
}

const ZombieSubscriptions = () => {
  const detectedSubs = useMemo(() => detectZombieSubscriptions(), []);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(detectedSubs);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const zombies = subscriptions.filter((s) => s.daysInactive > 0 && !s.cancelled);
  const totalWaste = zombies.reduce((sum, s) => sum + s.amount, 0);

  const handleCancel = (id: string) => {
    setCancelling(id);
    // Mock API call
    setTimeout(() => {
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, cancelled: true } : s))
      );
      setCancelling(null);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card glow-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Skull className="w-5 h-5 text-destructive" />
          </motion.div>
          <h3 className="font-display font-semibold text-foreground">Zombie Subscriptions</h3>
        </div>
        {totalWaste > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold text-destructive bg-destructive/10 px-3 py-1 rounded-full"
          >
            Wasting ₹{totalWaste.toFixed(0)}/mo
          </motion.span>
        )}
      </div>

      {zombies.length === 0 && subscriptions.some((s) => s.cancelled) ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <CheckCircle className="w-10 h-10 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">All zombie subscriptions cancelled! 🎉</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {subscriptions.map((sub, i) => {
              const isZombie = sub.daysInactive > 0 && !sub.cancelled;
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    sub.cancelled
                      ? "bg-primary/5 border border-primary/20"
                      : isZombie
                      ? "bg-destructive/5 border border-destructive/20"
                      : "bg-muted/30 border border-border/30"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      sub.cancelled ? "bg-primary/10" : isZombie ? "bg-destructive/10" : "bg-muted"
                    }`}>
                      {sub.cancelled ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : isZombie ? (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      ) : (
                        <Zap className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${sub.cancelled ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {sub.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sub.cancelled
                          ? "Autopay cancelled"
                          : isZombie
                          ? `Inactive ${sub.daysInactive} days — save ₹${sub.amount.toFixed(0)}/mo`
                          : "Active"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-display font-semibold text-foreground whitespace-nowrap">
                      ₹{sub.amount.toFixed(0)}
                    </span>
                    {isZombie && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancel(sub.id)}
                        disabled={cancelling === sub.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/30 transition-all disabled:opacity-50"
                      >
                        {cancelling === sub.id ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}>
                            <XCircle className="w-3 h-3" />
                          </motion.div>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Cancel
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default ZombieSubscriptions;
