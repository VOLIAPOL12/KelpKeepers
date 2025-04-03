import React from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
  console.log("HomePage rendering");
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/src/assets/kelp-bg.mp4" type="video/mp4" />
            {/* Fallback image in case video doesn't load */}
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-cyan-900/60 z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
          <h1 className="md:text-7xl text-3xl font-bold mb-6 tracking-wider" style={{ fontFamily: "'Reggae One', cursive" }}>
            THE<br />UNDERWATER<br />JUNGLE
          </h1>
          
          <h2 className="text-l md:text-2xl mb-6">Australia's unique kelp forests</h2>
          
          <p className="mb-12 text-sm">
            Help safeguarding these irreplaceable marine habitats for future generations.
          </p>
          
          <Link to="/join" className="btn btn-primary rounded-full px-8 mb-16">
            Join us
          </Link>
          
          {/* Scroll Down Arrow */}
          <div className="animate-bounce">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Kelp Information Section */}
      <div className="py-8 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative rounded-xl overflow-hidden shadow-xl">
            {/* Background image */}
            <img 
              src="/src/assets/AQUA.PNG" 
              alt="Kelp forest underwater" 
              className="w-full h-full object-cover absolute inset-0"
            />
            
            {/* Content Card */}
            <div className="relative bg-white/80 backdrop-blur-sm m-4 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-center mb-6">A forest not many people know of</h2>
              
              <div className="flex items-center">
                {/* Left arrow */}
                <button className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Text content */}
                <p className="text-center text-gray-800">
                  Kelp isn't just seaweed, it's an ocean powerhouse! These giant, golden brown algae grows over 35 meters long, 
                  creating entire underwater forests, providing food and shelter for marine life. It grows crazy fast, up to a 1/2 
                  meter a day!
                </p>
                
                {/* Right arrow */}
                <button className="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      
      {/* Additional sections can go here */}
    </div>
  )
}

export default HomePage