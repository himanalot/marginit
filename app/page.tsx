"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [boxWidth, setBoxWidth] = useState(280);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch('/api/waitlist-count');
        const data = await response.json();
        console.log('Waitlist count data:', data); // Debug log
        setWaitlistCount(data.count || 0);
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        setWaitlistCount(0);
      }
    };

    const updateBoxWidth = () => {
      if (window.innerWidth >= 1024) {
        setBoxWidth(408);
      } else if (window.innerWidth >= 768) {
        setBoxWidth(350);
      } else if (window.innerWidth >= 640) {
        setBoxWidth(300);
      } else {
        setBoxWidth(280);
      }
    };

    fetchWaitlistCount();
    updateBoxWidth();

    // Trigger navbar expansion immediately
    setNavbarExpanded(true);

    window.addEventListener('resize', updateBoxWidth);
    return () => window.removeEventListener('resize', updateBoxWidth);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use Clerk's API to add user to waitlist
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      setEmail("");
      // Refresh the waitlist count
      const response = await fetch('/api/waitlist-count');
      const data = await response.json();
      setWaitlistCount(data.count);
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("Error joining waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactModal = () => (
    <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
      <div className="rounded-[24px] p-8 max-w-2xl w-full mx-4 border border-white/40 bg-gradient-to-b from-white/90 via-white/80 to-slate-100/70 shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.9)] backdrop-blur-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Contact Our Team</h2>
          <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-gray-900">Sai Vajaha</h3>
            <p className="text-gray-600">Co-Founder</p>
            <a href="mailto:vs.saicharan@gmail.com" className="text-blue-600 hover:text-blue-800 cursor-pointer">vs.saicharan@gmail.com</a>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-gray-900">Ishaan Garg</h3>
            <p className="text-gray-600">Co-Founder</p>
            <a href="mailto:ishaan@ishaantek.com" className="text-blue-600 hover:text-blue-800 cursor-pointer">ishaan@ishaantek.com</a>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Kalyan Cherukuri</h3>
            <p className="text-gray-600">Co-Founder</p>
            <a href="mailto:kcherukuri@imsa.edu" className="text-blue-600 hover:text-blue-800 cursor-pointer">kcherukuri@imsa.edu</a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      <div>
        <div className="mx-4 md:mx-0">
          {/* Header */}
          <header className="px-6 h-14 flex justify-between items-center bg-accent/80 backdrop-blur-sm border border-white/20 rounded-2xl mx-auto mt-4 pl-4 pr-[14px] relative z-50 max-w-3xl overflow-hidden"
                  style={{
                    width: navbarExpanded ? '100%' : '4rem',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        opacity: navbarExpanded ? 1 : 0,
                        transform: navbarExpanded ? 'translateX(4px)' : 'translateX(-20px)',
                        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                      }}>MarginIt</span>
              </a>
            </div>
            <div className="flex items-center min-w-0"
                 style={{
                   opacity: navbarExpanded ? 1 : 0,
                   transform: navbarExpanded ? 'translateX(0)' : 'translateX(20px)',
                   transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
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

        {/* Main Content */}
        <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4.5rem)] flex flex-col justify-between items-center text-center px-3 sm:px-4">
          {/* Background overlay */}
          <div className="absolute top-0 left-0 -z-50 size-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
          
          <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center -mt-8 sm:-mt-12 md:-mt-16" style={{ opacity: 1 }}>
            {/* Sponsor badge */}
            <div className="mb-4 sm:mb-6 flex justify-center" style={{ opacity: 1 }}>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 group shadow-lg cursor-pointer relative z-10">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[18px] sm:h-[18px]">
                  <g clipPath="url(#clip0_585_86819)">
                    <g clipPath="url(#clip1_585_86819)">
                      <g clipPath="url(#clip2_585_86819)">
                        <g clipPath="url(#clip3_585_86819)">
                          <path d="M0 0H18V18H0V0Z" fill="#FB651E"></path>
                          <path d="M8.3938 10.1774L5.3042 4.38965H6.71614L8.53358 8.05237C8.56157 8.11762 8.59419 8.18519 8.63146 8.25508C8.66872 8.32497 8.70135 8.39725 8.72926 8.47178C8.74796 8.49977 8.76189 8.52536 8.77124 8.5487C8.78059 8.57191 8.78987 8.593 8.79922 8.61156C8.84412 8.70104 8.8861 8.79196 8.92508 8.88416C8.96235 8.97276 8.9949 9.05432 9.02282 9.12885C9.10324 8.95822 9.1848 8.78813 9.2675 8.61859C9.3561 8.43684 9.44694 8.24805 9.54011 8.05237L11.3855 4.38965H12.6997L9.58201 10.2472V13.9799H8.39373L8.3938 10.1774Z" fill="white"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_585_86819">
                      <rect width="18" height="18" rx="6.75" fill="white"></rect>
                    </clipPath>
                    <clipPath id="clip1_585_86819">
                      <rect width="18" height="18" rx="6.75" fill="white"></rect>
                    </clipPath>
                    <clipPath id="clip2_585_86819">
                      <rect width="18" height="18" fill="white"></rect>
                    </clipPath>
                    <clipPath id="clip3_585_86819">
                      <rect width="18" height="18" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-xs sm:text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  Sponsored by Nobody
                </span>
              </div>
            </div>

            {/* Main heading */}
            <div className="inline-block font-bold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-[4rem]" style={{ opacity: 1 }}>
              <h1 className="text-center leading-tight">The Finance Platform for</h1>
              <div className="flex justify-center gap-2 sm:gap-4 leading-12 sm:leading-14 md:leading-16 lg:leading-[4rem] mt-1 sm:mt-2 md:mt-4">
                <div className="relative -rotate-[2.76deg] mt-1 sm:mt-2 transition-all duration-300 ease-out" style={{ width: boxWidth }}>
                  <div className="absolute inset-0 w-full h-full rounded-2xl border border-primary flex justify-between">
                    <div className="h-full border border-primary w-7 rounded-full flex items-center justify-center absolute left-0 z-20" style={{ backgroundColor: '#e0e7ff' }}>
                      <div className="w-2 h-8 rounded-full bg-primary"></div>
                    </div>
                    <div className="h-full border border-primary w-7 rounded-full flex items-center justify-center absolute z-20 transition-transform duration-300 ease-out" style={{ left: '-30px', transform: `translateX(${boxWidth}px)`, backgroundColor: '#e0e7ff' }}>
                      <div className="w-2 h-8 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-300 ease-out z-10" style={{ height: '100%', width: boxWidth }}>
                    <div className="w-full h-full flex items-center justify-center px-4 whitespace-nowrap transition-all duration-300 ease-out" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                      Students
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-wide max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed" style={{ opacity: 1 }}>
              A simple but powerful social finance platform that helps you connect with students worldwide.
            </p>

            {/* Waitlist form */}
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center px-3 sm:px-4" style={{ opacity: 1 }}>
              <form onSubmit={handleSubmit} className="flex gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-md md:max-w-lg flex-col sm:flex-row">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2.5 sm:py-2 md:py-1 shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-sm sm:text-base h-11 sm:h-10 md:h-11 flex-1"
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background shadow hover:bg-foreground/90 rounded-md px-5 sm:px-4 md:px-6 h-11 sm:h-10 md:h-11 text-sm sm:text-base cursor-pointer group"
                >
                  <span className="relative z-10">{isSubmitting ? 'Joining...' : 'Join waitlist'}</span>
                  <div className="relative w-4 h-4 overflow-hidden ml-0.5">
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
              </form>
            </div>

            {/* Member count */}
            <div className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground justify-center px-3 sm:px-4" style={{ opacity: 1 }}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-center">
                {waitlistCount > 0 
                  ? `${waitlistCount} ${waitlistCount === 1 ? 'person' : 'people'} already joined` 
                  : waitlistCount === 0 
                    ? 'Be the first to join!' 
                    : 'Join the waitlist today'
                }
              </span>
            </div>
          </div>
        </div>

        {showContactModal && <ContactModal />}
      </div>
    </div>
  );
}