import React from 'react';
import { Button } from '../ui/button';

interface MyLoansProps {
  onBack: () => void;
}

const MyLoans: React.FC<MyLoansProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Loans</h2>
      <p className="mb-4">Manage your loans here.</p>
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default MyLoans;
