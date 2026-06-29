import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader, title, onBack }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden">
      {showHeader && (
        <header className="p-4 flex items-center justify-between bg-primary text-primary-foreground sticky top-0 z-10 shadow-md">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-primary-foreground hover:bg-white/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold capitalize">{title}</h1>
          </div>
          <LanguageSwitcher />
        </header>
      )}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
