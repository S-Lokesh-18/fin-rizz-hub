import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Sep", spending: 18200 },
  { month: "Oct", spending: 22400 },
  { month: "Nov", spending: 19800 },
  { month: "Dec", spending: 28500 },
  { month: "Jan", spending: 24100 },
  { month: "Feb", spending: 21300 },
  { month: "Mar", spending: 26800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-2 border border-border/50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-display font-bold text-primary">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const ExpenseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card glow-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Monthly Spending</h3>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">Last 7 months</span>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.4} />
                <stop offset="50%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 14%, 20%)" strokeOpacity={0.5} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 14%, 55%)", fontSize: 12, fontFamily: "Space Grotesk" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 14%, 55%)", fontSize: 11, fontFamily: "Space Grotesk" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="hsl(160, 84%, 44%)"
              strokeWidth={2.5}
              fill="url(#glowGradient)"
              filter="url(#glow)"
              dot={{ fill: "hsl(160, 84%, 44%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(160, 84%, 44%)", stroke: "hsl(160, 84%, 60%)", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ExpenseChart;
