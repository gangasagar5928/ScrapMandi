import React from "react";
import { 
  Home, 
  Search, 
  PlusCircle, 
  TrendingUp, 
  MessageSquare,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const MobileNavBar = ({ activeTab, setActiveTab, onOpenCreateListing }) => {
  const { role, isAuthenticated } = useAuth();

  const navItems = [
    { 
      id: "landing", 
      label: "Home", 
      icon: Home 
    },
    { 
      id: "browse", 
      label: "Browse", 
      icon: Search 
    },
    { 
      id: "post", 
      label: "Sell Scrap", 
      icon: PlusCircle, 
      isAction: true,
      onClick: () => {
        if (onOpenCreateListing) onOpenCreateListing();
        else setActiveTab("vendor-dashboard");
      }
    },
    { 
      id: "indicative-prices", 
      label: "Spot Bhav", 
      icon: TrendingUp 
    },
    { 
      id: "whatsapp-alerts", 
      label: "Alerts", 
      icon: MessageSquare 
    },
  ];

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-[900] bg-ios-bar/85 ios-blur border-t border-ios-separator/20 shadow-lg select-none transition-colors"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom), 8px)",
      }}
    >
      <div className="flex items-center justify-around pt-1 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-center justify-center py-1 px-2.5 transition active:scale-90 cursor-pointer min-w-[56px]"
              >
                <div className="w-8 h-8 rounded-full bg-ios-green/15 text-ios-green flex items-center justify-center border border-ios-green/30 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-ios-green mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 transition active:scale-95 cursor-pointer min-w-[56px] ${
                isActive 
                  ? "text-ios-blue font-bold" 
                  : "text-ios-gray hover:text-ios-label2"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
