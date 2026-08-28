import React from "react";
import { HeroSection } from "../components/landing/HeroSection";
import { CategoryGrid } from "../components/landing/CategoryGrid";

export const LandingPage = ({ setActiveTab, onSelectCategory, onOpenAuth }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection 
        setActiveTab={setActiveTab} 
        onOpenAuth={onOpenAuth} 
      />
      <CategoryGrid 
        onSelectCategory={(catId) => {
          onSelectCategory(catId);
          setActiveTab("browse");
        }} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
};
