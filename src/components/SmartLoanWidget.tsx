import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Gauge, Sparkles, CheckCircle } from "lucide-react";

const SmartLoanWidget = () => {
  const [income, setIncome] = useState("");
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [requested, setRequested] = useState(false);

  // Dynamic eligibility scoring
  useEffect(() => {
    const val = parseFloat(income) || 0;
    let s = 0;
    if (val >= 10000) s = 20;
    if (val >= 25000) s = 40;
    if (val >= 50000) s = 60;
    if (val >= 75000) s = 75;
    if (val >= 100000) s = 88;
    if (val >= 200000) s = 95;
    setScore(s);
  }, [income]);

  // Animate score
  useEffect(() => {
    const step = score > animatedScore ? 1 : -1;
    if (animatedScore === score) return;
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev === score) { clearInterval(timer); return prev; }
        return prev + step;
      });
    }, 15);
    return () => clearInterval(timer);
  }, [score, animatedScore]);

  const scoreColor =
    animatedScore >= 75 ? "hsl(var(--primary))" :
    animatedScore >= 50 ? "hsl(var(--chart-food))" :
    animatedScore >= 25 ? "hsl(var(--chart-bills))" :
    "hsl(var(--destructive))";

  const eligible = score >= 50;
  const loanAmount = Math.floor((parseFloat(income) || 0) * 3);

  const handleRequest = () => {
    setRequested(true);
    setTimeout(() => setRequested(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card glow-border p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Banknote className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Smart Loan</h3>
      </div>

      {/* Income Input */}
      <div className="relative mb-6">
        <label className="text-xs text-muted-foreground mb-1.5 block">Monthly Income</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-display font-semibold">₹</span>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-muted/50 border border-border/50 rounded-xl py-3 pl-8 pr-4 text-foreground font-display text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Score Gauge */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${animatedScore * 2.64} 264`}
              style={{ filter: `drop-shadow(0 0 6px ${scoreColor})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold text-foreground">{animatedScore}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Score</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
          <p className="font-display font-bold text-foreground text-lg">
            {score === 0 ? "Enter income" : eligible ? "Eligible ✓" : "Low Score"}
          </p>
          {eligible && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-primary mt-1"
            >
              Up to ₹{loanAmount.toLocaleString("en-IN")} available
            </motion.p>
          )}
        </div>
      </div>

      {/* Request Button */}
      <AnimatePresence mode="wait">
        {requested ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/20 text-primary font-medium text-sm"
          >
            <CheckCircle className="w-5 h-5" /> Request Submitted!
          </motion.div>
        ) : (
          <motion.button
            key="request"
            whileHover={{ scale: eligible ? 1.02 : 1 }}
            whileTap={{ scale: eligible ? 0.98 : 1 }}
            onClick={handleRequest}
            disabled={!eligible}
            className="w-full py-3 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-primary-foreground"
            style={{ background: eligible ? "var(--gradient-primary)" : "hsl(var(--muted))" }}
          >
            <Sparkles className="w-4 h-4" /> Request Micro-Loan
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SmartLoanWidget;
