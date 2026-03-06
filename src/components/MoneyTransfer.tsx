import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowRight, CheckCircle, User } from "lucide-react";

const quickContacts = [
  { id: "1", name: "Priya", initials: "PS", color: "hsl(var(--primary))" },
  { id: "2", name: "Rahul", initials: "RK", color: "hsl(var(--chart-transport))" },
  { id: "3", name: "Sneha", initials: "SM", color: "hsl(var(--chart-shopping))" },
  { id: "4", name: "Amit", initials: "AJ", color: "hsl(var(--chart-food))" },
];

const MoneyTransfer = () => {
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!amount || !selectedContact) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setAmount("");
        setSelectedContact(null);
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card glow-border p-6 w-full max-w-[380px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <Send className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">Quick Transfer</h3>
      </div>

      {/* Quick Contacts */}
      <div className="flex gap-3 mb-5">
        {quickContacts.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedContact(c.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              selectedContact === c.id ? "scale-105" : ""
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground transition-all ${
                selectedContact === c.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
              }`}
              style={{ backgroundColor: c.color }}
            >
              {c.initials}
            </div>
            <span className="text-[10px] text-muted-foreground">{c.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-display font-semibold">₹</span>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-muted/50 border border-border/50 rounded-xl py-3 pl-8 pr-4 text-foreground font-display text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Send Button */}
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/20 text-primary font-medium"
          >
            <CheckCircle className="w-5 h-5" />
            Sent Successfully!
          </motion.div>
        ) : (
          <motion.button
            key="send"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSend}
            disabled={!amount || !selectedContact || sending}
            className="w-full py-3 rounded-xl font-display font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--gradient-primary)" }}
          >
            {sending ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Send className="w-4 h-4" />
              </motion.div>
            ) : (
              <>
                Send Money <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MoneyTransfer;
