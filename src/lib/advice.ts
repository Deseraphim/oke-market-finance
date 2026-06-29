interface BusinessData {
    sales: any[];
    debtors: any[];
    loans: any[];
  }
  
  export const analyzeBusinessData = (data: BusinessData): string => {
    const { sales, debtors, loans } = data;
  
    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
    const totalDebts = debtors.reduce((sum, d) => sum + d.amount, 0);
    const totalLoans = loans.reduce((sum, l) => sum + l.amount, 0);
  
    if (totalSales > 100000 && totalDebts < 10000) {
      return "Your business is doing great! Keep up the good work. Your sales are high and your debts are low.";
    } else if (totalSales > 50000 && totalDebts > 20000) {
      return "Your sales are good, but you should focus on collecting your debts.";
    } else if (totalLoans > 50000) {
      return "You have a significant amount of loans. Focus on paying them off as soon as possible.";
    } else if (totalSales === 0 && totalDebts === 0 && totalLoans === 0) {
        return "You have no data yet. Start by recording your sales and expenses to get business advice.";
    }
  
    return "Keep recording your business activities to get more specific advice.";
  };