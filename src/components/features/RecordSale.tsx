import React from 'react';
import { Button } from '../ui/button';

interface RecordSaleProps {
  onBack: () => void;
}

const RecordSale: React.FC<RecordSaleProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Record a Sale</h2>
      <p className="mb-4">Record a new sale transaction here.</p>
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default RecordSale;
