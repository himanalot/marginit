"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Careers() {
  const [showContactModal, setShowContactModal] = useState(false);

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
        <Navbar showContactModal={showContactModal} setShowContactModal={setShowContactModal} />

        {/* Background overlay */}
        <div className="fixed top-0 left-0 w-full h-full -z-50 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>

        {/* Main Content */}
        <div className="min-h-screen relative">
          
          <div className="pt-16 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto" style={{ opacity: 1 }}>
            {/* Page Title */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="inline-block font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">Join Our Team</h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light tracking-wide max-w-xl lg:max-w-2xl mx-auto">
                Help us build the future of social trading for students. We're looking for passionate individuals to join our mission.
              </p>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Software Engineer Job */}
              <a 
                href="mailto:vs.saicharan@gmail.com?subject=Application: Software Engineer – Full Stack&body=Hi, I'm interested in the Software Engineer position at MarginIt.%0D%0A%0D%0APlease find my application details below:"
                className="block w-full rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-5 lg:p-6 text-left z-10 border border-white/40 bg-gradient-to-b from-white/90 via-white/80 to-slate-100/70 shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.9)] backdrop-blur-xl hover:from-white/95 hover:via-white/85 hover:to-slate-100/75 transition-all duration-200 cursor-pointer"
              >
                <div className="mb-3 md:mb-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">Full Stack Engineer</h2>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Remote
                    </span>
                    <span>•</span>
                    <span>Full-time</span>
                  </div>
                </div>

                <div className="mb-3 md:mb-4">
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                    Build our financial social platform with React, TypeScript, and Node.js.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">React</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">TypeScript</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">Node.js</span>
                </div>
              </a>

              {/* Marketing Specialist Job */}
              <a 
                href="mailto:vs.saicharan@gmail.com?subject=Application: Marketing Specialist – Intern&body=Hi, I'm interested in the Marketing Specialist internship at MarginIt.%0D%0A%0D%0APlease find my application details below:"
                className="block w-full rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-5 lg:p-6 text-left z-10 border border-white/40 bg-gradient-to-b from-white/90 via-white/80 to-slate-100/70 shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.9)] backdrop-blur-xl hover:from-white/95 hover:via-white/85 hover:to-slate-100/75 transition-all duration-200 cursor-pointer"
              >
                <div className="mb-3 md:mb-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">Marketing Intern</h2>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Remote
                    </span>
                    <span>•</span>
                    <span>Internship</span>
                  </div>
                </div>

                <div className="mb-3 md:mb-4">
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                    Grow our trader community through social media and content creation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">Social Media</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">Content</span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-primary/10 rounded-full">Analytics</span>
                </div>
              </a>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8 md:mt-12 lg:mt-16 p-4 sm:p-6 md:p-8 lg:p-10 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] border border-white/40 bg-gradient-to-b from-white/90 via-white/80 to-slate-100/70 shadow-[inset_0_1px_0px_0px_rgba(255,255,255,0.9)] backdrop-blur-xl w-[95%] sm:w-[90%] md:w-[95%] mx-auto relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Don't see a perfect fit?</h3>
              <p className="text-muted-foreground font-light mb-4 md:mb-6 text-sm md:text-base lg:text-lg max-w-2xl lg:max-w-4xl mx-auto">
                We're always looking for talented individuals who are passionate about finance and technology. Whether you're a designer, product manager, data scientist, or have other skills that could help us build the future of social trading for students.
              </p>
              <p className="text-muted-foreground font-light mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
                Send us your resume and tell us how you'd like to contribute to MarginIt.
              </p>
              <a 
                href="mailto:vs.saicharan@gmail.com?subject=General Application&body=Hi, I'm interested in opportunities at MarginIt.%0D%0A%0D%0APlease find my details below:"
                className="bg-primary text-primary-foreground px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-sm sm:text-base md:text-lg hover:bg-primary/90 cursor-pointer flex items-center gap-2 mx-auto w-fit transition-all duration-200 group"
              >
                <span>Get in Touch</span>
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 overflow-hidden ml-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-5">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 absolute top-0 left-0 transition-transform duration-300 ease-in-out -translate-x-5 group-hover:translate-x-0">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </a>
            </div>
            </div>
          </div>
        </div>

        {showContactModal && <ContactModal />}
      </div>
    </div>
  );
}