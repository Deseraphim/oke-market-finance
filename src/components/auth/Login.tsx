import React from 'react';
import { Button } from '../ui/button';

interface LoginProps {
  onAuthSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p className="mb-4">Enter your PIN to login.</p>
      <Button onClick={onAuthSuccess}>Login</Button>
    </div>
  );
};

export default Login;
