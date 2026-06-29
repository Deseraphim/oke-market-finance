import React from 'react';
import { Button } from '../ui/button';

interface BusinessSummaryProps {
  onBack: () => void;
}

const BusinessSummary: React.FC<BusinessSummaryProps> = ({ onBack }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Business Summary</h2>
      <p className="mb-4">Here is a summary of your business performance.</p>
      {/* Add charts and stats here */}
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default BusinessSummary;
