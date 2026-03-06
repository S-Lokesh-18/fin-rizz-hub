import { motion } from "framer-motion";
import { CreditCard, Wifi } from "lucide-react";

const CreditCardVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      whileHover={{ scale: 1.03, rotateY: 5, rotateX: -3 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[380px] aspect-[1.6/1] rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: "linear-gradient(135deg, hsl(160 84% 44%), hsl(180 70% 32%), hsl(200 60% 25%))",
        boxShadow: "var(--shadow-glow)",
        perspective: "1000px",
      }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }} />

      <div className="relative h-full p-6 flex flex-col justify-between text-primary-foreground">
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-lg tracking-wide">Fin Rizz</span>
          <Wifi className="w-5 h-5 opacity-80" />
        </div>

        <div className="font-display text-xl tracking-[0.2em] font-medium">
          •••• •••• •••• 4289
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-60 mb-0.5">Card Holder</p>
            <p className="text-sm font-medium">ALEX JOHNSON</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60 mb-0.5">Expires</p>
            <p className="text-sm font-medium">09/28</p>
          </div>
          <CreditCard className="w-8 h-8 opacity-70" />
        </div>
      </div>
    </motion.div>
  );
};

export default CreditCardVisual;
