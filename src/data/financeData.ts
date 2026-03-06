export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  icon?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  total: number;
  color: string;
  transactions: Transaction[];
}

export const expenseCategories: ExpenseCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "🍔",
    total: 1284.50,
    color: "chart-food",
    transactions: [
      { id: "f1", name: "McDonald's", amount: 12.99, date: "Mar 5, 2026" },
      { id: "f2", name: "Whole Foods", amount: 87.43, date: "Mar 4, 2026" },
      { id: "f3", name: "Starbucks", amount: 6.75, date: "Mar 4, 2026" },
      { id: "f4", name: "Chipotle", amount: 14.20, date: "Mar 3, 2026" },
      { id: "f5", name: "DoorDash - Sushi Palace", amount: 42.80, date: "Mar 2, 2026" },
      { id: "f6", name: "Trader Joe's", amount: 65.12, date: "Mar 1, 2026" },
      { id: "f7", name: "Pizza Hut", amount: 28.50, date: "Feb 28, 2026" },
      { id: "f8", name: "Uber Eats - Thai Express", amount: 35.60, date: "Feb 27, 2026" },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    icon: "🚗",
    total: 456.30,
    color: "chart-transport",
    transactions: [
      { id: "t1", name: "Uber Ride", amount: 24.50, date: "Mar 5, 2026" },
      { id: "t2", name: "Gas Station - Shell", amount: 58.20, date: "Mar 3, 2026" },
      { id: "t3", name: "Metro Pass", amount: 127.00, date: "Mar 1, 2026" },
      { id: "t4", name: "Lyft Ride", amount: 18.90, date: "Feb 28, 2026" },
      { id: "t5", name: "Parking Garage", amount: 15.00, date: "Feb 26, 2026" },
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    total: 892.15,
    color: "chart-shopping",
    transactions: [
      { id: "s1", name: "Amazon - Electronics", amount: 249.99, date: "Mar 4, 2026" },
      { id: "s2", name: "Nike Store", amount: 145.00, date: "Mar 2, 2026" },
      { id: "s3", name: "IKEA", amount: 312.40, date: "Feb 27, 2026" },
      { id: "s4", name: "Target", amount: 67.80, date: "Feb 25, 2026" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎮",
    total: 234.80,
    color: "chart-entertainment",
    transactions: [
      { id: "e1", name: "Netflix", amount: 15.99, date: "Mar 1, 2026" },
      { id: "e2", name: "Spotify Premium", amount: 10.99, date: "Mar 1, 2026" },
      { id: "e3", name: "Movie Tickets - AMC", amount: 32.00, date: "Feb 28, 2026" },
      { id: "e4", name: "Steam - Game Purchase", amount: 59.99, date: "Feb 24, 2026" },
    ],
  },
  {
    id: "bills",
    name: "Bills & Utilities",
    icon: "💡",
    total: 1520.00,
    color: "chart-bills",
    transactions: [
      { id: "b1", name: "Electricity Bill", amount: 142.00, date: "Mar 1, 2026" },
      { id: "b2", name: "Internet - Comcast", amount: 89.99, date: "Mar 1, 2026" },
      { id: "b3", name: "Phone Bill - T-Mobile", amount: 85.00, date: "Mar 1, 2026" },
      { id: "b4", name: "Rent", amount: 1200.00, date: "Mar 1, 2026" },
    ],
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: "💪",
    total: 189.90,
    color: "chart-health",
    transactions: [
      { id: "h1", name: "Gym Membership", amount: 49.99, date: "Mar 1, 2026" },
      { id: "h2", name: "CVS Pharmacy", amount: 34.50, date: "Feb 28, 2026" },
      { id: "h3", name: "Protein Supplements", amount: 62.40, date: "Feb 25, 2026" },
    ],
  },
];

export const totalBalance = 24_582.65;
export const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.total, 0);
