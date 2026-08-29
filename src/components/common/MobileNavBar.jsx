import React from "react";
import { 
  Home, 
  Search, 
  PlusCircle, 
  TrendingUp, 
  MessageSquare,
  PackageCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const MobileNavBar = ({ activeTab, setActiveTab, onOpenCreateListing }) => {
  const { role, isAuthenticated } = useAuth();

  const navItems = [
    { id: "landing", label: "Home", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
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
    { id: "indicative-prices", label: "Spot Bhav", icon: TrendingUp },
    { id: "whatsapp-alerts", label: "Alerts", icon: MessageSquare },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[900] bg-slate-900 border-t border-slate-800 px-2 py-1 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center -mt-5 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-4 border-slate-900 transition transform active:scale-90">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer min-w-[56px] ${
                isActive 
                  ? "text-emerald-400 font-bold" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
