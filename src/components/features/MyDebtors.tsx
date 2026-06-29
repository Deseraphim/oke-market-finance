import React from 'react';
import { Button } from '../ui/button';

interface MyDebtorsProps {
  onBack: () => void;
}

const MyDebtors: React.FC<MyDebtorsProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Debtors</h2>
      <p className="mb-4">Manage your debtors here.</p>
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default MyDebtors;
