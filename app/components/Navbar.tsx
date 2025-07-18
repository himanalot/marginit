"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  showContactModal: boolean;
  setShowContactModal: (show: boolean) => void;
  enableAnimation?: boolean;
}

export default function Navbar({ showContactModal, setShowContactModal, enableAnimation = false }: NavbarProps) {
  const [navbarExpanded, setNavbarExpanded] = useState(!enableAnimation);

  useEffect(() => {
    if (enableAnimation) {
      // Check if user came from within the site or is reloading
      const hasNavigated = sessionStorage.getItem('hasNavigated');
      
      if (!hasNavigated) {
        // First visit to the site - show animation
        setTimeout(() => setNavbarExpanded(true), 100);
        sessionStorage.setItem('hasNavigated', 'true');
      } else {
        // Already navigated or reloading - no animation
        setNavbarExpanded(true);
      }
    }
  }, [enableAnimation]);

  return (
    <div className="mx-4 md:mx-0">
      {/* Header */}
      <header className="px-6 h-14 flex justify-between items-center bg-accent/80 backdrop-blur-sm border border-white/20 rounded-2xl mx-auto mt-4 pl-4 pr-[14px] relative z-50 max-w-3xl overflow-hidden"
              style={{
                width: enableAnimation ? (navbarExpanded ? '100%' : '4rem') : '100%',
                transition: enableAnimation ? 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}>
        <div className="flex items-center min-w-0">
          <a className="flex items-center gap-3 cursor-pointer relative" href="/">
            <div className="w-8 h-8 overflow-hidden flex-shrink-0 relative z-20">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_marginit_logo)">
                  <rect width="32" height="32" fill="#3B82F6"/>
                  <path d="M8 24V8h3.2l4.8 9.6L20.8 8H24v16h-2.4V12.8L17.6 20h-1.2L12.4 12.8V24H8z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_marginit_logo">
                    <rect width="32" height="32" rx="8" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-medium whitespace-nowrap hidden md:block absolute left-8 z-10"
                  style={{
                    opacity: enableAnimation ? (navbarExpanded ? 1 : 0) : 1,
                    transform: enableAnimation ? (navbarExpanded ? 'translateX(4px)' : 'translateX(-20px)') : 'translateX(4px)',
                    transition: enableAnimation ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s' : 'none',
                  }}>MarginIt</span>
          </a>
        </div>
        <div className="flex items-center min-w-0"
             style={{
               opacity: enableAnimation ? (navbarExpanded ? 1 : 0) : 1,
               transform: enableAnimation ? (navbarExpanded ? 'translateX(0)' : 'translateX(20px)') : 'translateX(0)',
               transition: enableAnimation ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s' : 'none',
             }}>
          <nav className="flex items-center gap-3">
            <a href="/careers" className="text-sm hover:text-muted-foreground cursor-pointer px-2 py-1 whitespace-nowrap group">
              <div className="relative overflow-hidden h-5">
                <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-5">
                  Careers
                </span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 ease-in-out translate-y-5 group-hover:translate-y-0">
                  Careers
                </span>
              </div>
            </a>
            <button onClick={() => setShowContactModal(true)} className="bg-foreground text-background px-3 py-1 rounded text-sm hover:bg-foreground/90 cursor-pointer flex items-center gap-1 whitespace-nowrap group">
              Contact Us
              <div className="relative w-4 h-4 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-in-out group-hover:translate-x-5">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-0 left-0 transition-transform duration-300 ease-in-out -translate-x-5 group-hover:translate-x-0">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
}