import React, { useState, useEffect, useMemo } from "react";
import { PlusCircle, Users, Landmark, BarChart3, Settings, FileText, Mic, Sparkles, Volume2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useVoiceRecognition, useTextToSpeech } from "../../hooks/use-voice";
import { analyzeBusinessData } from "../../lib/advice";
import { useTranslation } from "../../contexts/i18n";

interface Loan {
  id: string;
  lender: string;
  amount: number;
  interest?: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

interface HomeProps {
  setView: (view: any) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const [sales, setSales] = useState<any[]>([]);
  const [debtors, setDebtors] = useState<any[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const { speak } = useTextToSpeech();
  const { t } = useTranslation();

  const today = new Date().toISOString().split('T')[0];
  
  const todaySalesTotal = useMemo(() => {
    return sales
      .filter(s => s.date === today)
      .reduce((sum, s) => sum + s.amount, 0);
  }, [sales, today]);

  const totalOutstandingLoans = useMemo(() => {
    return loans
      .filter(loan => loan.status === 'pending')
      .reduce((sum, loan) => sum + loan.amount, 0);
  }, [loans]);

  const advice = useMemo(() => {
    return analyzeBusinessData({ sales, debtors, loans });
  }, [sales, debtors, loans]);

  const handleVoiceResult = (command: string) => {
    if (command.includes("record sale")) {
      setView("record-sale");
    } else if (command.includes("show my balance") || command.includes("show balance")) {
      speak(`Your sales today are ${todaySalesTotal} Naira. Your total outstanding loans are ${totalOutstandingLoans} Naira.`);
    } else if (command.includes("show debtors") || command.includes("show my debtors")) {
      setView("debtors");
    }
  };

  const { isListening, startListening } = useVoiceRecognition(handleVoiceResult);

  const actions = [
    {
      id: "record-sale",
      title: t("record_sale"),
      icon: <PlusCircle className="w-10 h-10 mb-2 text-primary" />,
      description: "Quickly log a new transaction",
      color: "bg-green-50"
    },
    {
      id: "debtors",
      title: t("my_debtors"),
      icon: <Users className="w-10 h-10 mb-2 text-orange-600" />,
      description: "People who owe you money",
      color: "bg-orange-50"
    },
    {
      id: "loans",
      title: t("my_loans"),
      icon: <Landmark className="w-10 h-10 mb-2 text-blue-600" />,
      description: "Money you owe to others",
      color: "bg-blue-50"
    },
    {
      id: "invoices",
      title: t("invoices"),
      icon: <FileText className="w-10 h-10 mb-2 text-primary" />,
      description: "Create and share receipts",
      color: "bg-primary/10"
    },
    {
      id: "summary",
      title: t("business_summary"),
      icon: <BarChart3 className="w-10 h-10 mb-2 text-primary" />,
      description: "See how your business is doing",
      color: "bg-primary/5"
    }
  ];

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem('oke_sales') || '[]'));
    setDebtors(JSON.parse(localStorage.getItem('oke_debtors') || '[]'));
    setLoans(JSON.parse(localStorage.getItem('oke_loans') || '[]'));
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-primary">{t('welcome_to_oke')}</h1>
          <p className="text-muted-foreground">{t('your_personal_business_assistant')}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isListening ? "destructive" : "outline"} 
            size="icon" 
            className={`rounded-full transition-all duration-300 ${isListening ? 'animate-pulse scale-110' : 'bg-primary/5 hover:bg-primary/10'}`}
            onClick={startListening}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-primary'}`} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-primary/5">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Business Advice Card */}
      <Card className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-none shadow-sm relative overflow-hidden group">
        <div className="relative z-10 flex gap-4 items-start">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary shrink-0 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
              Business Advice
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => speak(advice)}>
                <Volume2 className="h-3 w-3" />
              </Button>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{advice}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Card 
            key={action.id}
            className={`p-6 flex flex-col items-center justify-center text-center border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer ${action.color}`}
            onClick={() => setView(action.id)}
          >
            {action.icon}
            <span className="font-bold text-sm">{action.title}</span>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">{t('quick_stats')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary p-6 rounded-3xl text-primary-foreground shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="opacity-80 text-sm">{t('today_sales')}</p>
              <h3 className="text-3xl font-black">{formatCurrency(todaySalesTotal)}</h3>
            </div>
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
          </div>
          <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="opacity-80 text-sm">{t('total_loans')}</p>
              <h3 className="text-3xl font-black">{formatCurrency(totalOutstandingLoans)}</h3>
            </div>
            <div className="absolute bottom-[-30px] left-[-20px] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
