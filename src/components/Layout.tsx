import React from "react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <header className="bg-purple-500 text-white p-4 text-center text-xl font-bold">
        Tasks Page
      </header>

       <main className="flex flex-col md:flex-row p-4 gap-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
