import React, { useState } from "react";
import { User, Package, LogOut } from "lucide-react";
import { Button } from "./ui/Button.tsx";
import { Orders } from "./Orders";
import { useLanguage } from "./LanguageContext.jsx";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const { t } = useLanguage();

  const handleOrdersClick = () => {
    setShowOrders(true);
    setOpen(false);
  };

  const menuItems = [
    { name: t.orders, icon: <Package className="w-4 h-4" />, action: handleOrdersClick },
    { name: t.logout, icon: <LogOut className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-foreground"
        onClick={() => setOpen(!open)}
      >
        <User className="w-5 h-5" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
          {menuItems.map((item) =>
            item.action ? (
              <button
                key={item.name}
                onClick={item.action}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.icon}
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            )
          )}
        </div>
      )}

      {showOrders && (
        <div className="absolute right-0 mt-2 w-[400px] bg-background border border-border rounded-md shadow-lg z-50 p-4">
          <Orders />
          <div className="mt-3 text-right">
            <Button variant="ghost" size="sm" onClick={() => setShowOrders(false)}>
              {t.close}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
