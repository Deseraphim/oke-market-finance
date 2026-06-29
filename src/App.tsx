import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { differenceInDays, parseISO } from 'date-fns';
import Login from "./components/auth/Login";
import Setup from "./components/auth/Setup";
import Home from "./components/dashboard/Home";
import RecordSale from "./components/features/RecordSale";
import MyDebtors from "./components/features/MyDebtors";
import MyLoans from "./components/features/MyLoans";
import BusinessSummary from "./components/features/BusinessSummary";
import Invoices from "./components/features/Invoices";
import Layout from "./components/Layout";
import { useTranslation } from "./contexts/i18n";

type View = "login" | "setup" | "home" | "record-sale" | "debtors" | "loans" | "summary" | "invoices";

interface Loan {
  id: string;
  lender: string;
  amount: number;
  interest?: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

function App() {
  const [view, setView] = useState<View>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedLoans = localStorage.getItem('oke_loans');
    if (savedLoans) {
      const loans: Loan[] = JSON.parse(savedLoans);
      const today = new Date();
      loans.forEach(loan => {
        if (loan.status === 'pending') {
          const dueDate = parseISO(loan.dueDate);
          const daysUntilDue = differenceInDays(dueDate, today);
          if (daysUntilDue >= 0 && daysUntilDue <= 3) {
            toast.info(`Loan from ${loan.lender} is due in ${daysUntilDue} day(s).`);
          }
        }
      });
    }
    const pin = localStorage.getItem("oke_pin");
    if (!pin) {
      setView("setup");
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setView("home");
  };

  const renderView = () => {
    if (!isAuthenticated && view !== "setup") {
      return <Login onAuthSuccess={handleAuthSuccess} />;
    }

    switch (view) {
      case "setup":
        return <Setup onComplete={() => setView("login")} />;
      case "home":
        return <Home setView={setView} />;
      case "record-sale":
        return <RecordSale onBack={() => setView("home")} />;
      case "debtors":
        return <MyDebtors onBack={() => setView("home")} />;
      case "loans":
        return <MyLoans onBack={() => setView("home")} />;
      case "summary":
        return <BusinessSummary onBack={() => setView("home")} />;
      case "invoices":
        return <Invoices onBack={() => setView("home")} />;
      default:
        return <Login onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Layout
        showHeader={isAuthenticated && view !== 'home'}
        title={t(view.replace('-', '_'))}
        onBack={() => setView('home')}>
        {renderView()}
      </Layout>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
