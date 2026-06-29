import React from 'react';
import { Button } from '../ui/button';

interface SetupProps {
  onComplete: () => void;
}

const Setup: React.FC<SetupProps> = ({ onComplete }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Set up your PIN</h2>
      <p className="mb-4">Create a PIN to secure your app.</p>
      <Button onClick={onComplete}>Set PIN</Button>
    </div>
  );
};

export default Setup;
