import React from 'react'
import { Link } from 'react-router-dom';
import SpeciesCard from '../components/SpeciesCard';
import InformationCard from '../components/InformationCard';

function HomePage() {
  
  const speciesData = [
    {
      id: 1,
      name: 'Weedy Sea Dragon',
      image: '/src/assets/species/seadragon.jpg',
      description: 'Endemic to southern Australian waters, these delicate creatures use kelp forests for camouflage and protection. Their population is declining due to habitat loss.'
    },
    {
      id: 2,
      name: 'Blue Devilfish',
      image: '/src/assets/species/blue-groper.jpg',
      description: 'This vibrant reef fish is highly territorial and depends on kelp forest ecosystems throughout its life cycle. Sea urchin barrens significantly reduce suitable habitat.'
    },
    {
      id: 3,
      name: 'Leafy Sea Dragon',
      image: '/src/assets/species/leafy-seadragon.jpg',
      description: 'One of Australia\'s most iconic marine species, they\'re perfectly adapted to life among kelp and seagrass. Their ornate leaf-like appendages provide perfect camouflage.'
    },
    {
      id: 4,
      name: 'Southern Rock Lobster',
      image: '/src/assets/species/lobster.jpg',
      description: 'A cornerstone of Australia\'s fishing industry, these lobsters live among kelp forests where they find shelter from predators. Their populations are threatened by climate change.'
    }
  ];

  const cards = [
    {
      id: 1,
      title: "Restores balance",
      description: "Healthy kelp forests support marine biodiversity, helping ecosystems stay resilient against climate change impacts.",
      image: "/src/assets/kelp-biodiversity.jpg",
      className: "col-span-1 row-span-2"
    },
    {
      id: 2,
      title: "Coast shield",
      description: "Kelp forests soften wave energy by up to 70%, acting as nature's sea wall to protect coastlines from erosion.",
      image: "/src/assets/kelp-coastline.jpg",
      className: "col-span-2 row-span-1"
    },
    {
      id: 3,
      title: "Oxygen machine",
      description: "Through photosynthesis, kelp pumps out oxygen, helping keep the ocean and air fresh.",
      image: "/src/assets/kelp-oxygen.jpg", 
      className: "col-span-2 row-span-1"
    },
    {
      id: 4,
      title: "Ocean tree power",
      description: "Like trees of the sea, kelp absorbs CO₂ from the ocean and atmosphere. It sucks up more CO₂ square meter than land forests! Kelp doesn't just store carbon, it sends it to the deep sea when fronds break off, locking it away for centuries.",
      image: "/src/assets/kelp-carbon.jpg",
      className: "col-span-1 row-span-2"
    }
  ];

  return (
    <div>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/src/assets/kelp-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="absolute inset-0 bg-cyan-900/60 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-4">
          <h1 className="md:text-7xl text-3xl font-bold mb-6 tracking-wider" style={{ fontFamily: "'Reggae One', cursive" }}>
            THE<br />UNDERWATER<br />JUNGLE
          </h1>
          
          <h2 className="text-l md:text-2xl mb-6">Australia's unique kelp forests</h2>
          
          <p className="mb-12 text-sm">
            Help safeguarding these irreplaceable marine habitats for future generations.
          </p>
          
          <Link to="" className="btn btn-primary rounded-full px-8 mb-16">
            Join us
          </Link>
          
          <div className="animate-bounce">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="py-8 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto relative rounded-xl overflow-hidden shadow-xl md:px-20 md: py-16">
            <img 
              src="/src/assets/AQUA.PNG" 
              alt="Kelp forest underwater" 
              className="w-full h-full object-cover absolute inset-0"
            />
            
            <div className="relative bg-white/80 backdrop-blur-sm m-4 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-center mb-6">A forest not many people know of</h2>
              
              <div className="flex items-center">
                <button className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <p className="text-center text-gray-800 md:px-20">
                  Kelp isn't just seaweed, it's an ocean powerhouse! These giant, golden brown algae grows over 35 meters long, 
                  creating entire underwater forests, providing food and shelter for marine life. It grows crazy fast, up to a 1/2 
                  meter a day!
                </p>
                
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
      
      <div className="py-8 bg-[#278285]">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-2xl pb-8">The longest continuous kelp forest in the world</h4>
            <img 
              src="/src/assets/great-southern-reef.jpg" 
              alt="Kelp forest underwater" 
              className="rounded-[48px] pb-4"
            />
            <a 
              href="https://www.science.org.au/curious/earth-environment/whos-heard-great-southern-reef"
              className="underline text-[#80E3FF] hover:text-[#942344] pb-4">
                Credit: Australian Academy of Science (2025)
            </a>
            <p className='text-white text-center md:leading-10 px-12'>​Stretching over 8,000 kilometers from Kalbarri in Western Australia to the Queensland border, the Great
              Southern Reef boasts the world's largest continuous kelp forest. Around 60% of all species in this region are
              endemic, meaning they are found nowhere else on Earth.</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-50">
        <div className="max-w-full relative overflow-hidden shadow-xl">
          <img 
            src="/src/assets/AQUA.PNG" 
            alt="Kelp forest underwater" 
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Red overlay */}
          <div className="absolute inset-0 bg-red-900/100 mix-blend-color z-10"></div>
          
          <div className="relative z-20 backdrop-blur-sm m-4 p-8  rounded-lg">
            <h2 className="text-2xl font-bold text-center text-white mb-6">A forest not many people know of</h2>
            
            <div className="flex items-center">
              <p className="text-center text-white md:px-20">
              Tasmania’s giant kelp forests are vanishing at an alarming rate, with over 95% lost in the
              past few decades due to warming waters and invasive sea urchins. Once towering underwater
              jungles are replaced with urchin barrens threatening biodiversity and a $10 billion economy
              of fisheries, tourism and recreation. 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-teal-50">
        <div className="max-w-full relative overflow-hidden">
          <h2 className="text-2xl font-bold text-center mb-6">At risk beneath the waves</h2>
          <p className="text-center md:px-20 pb-8">
            The loss of these vital habitats has led to the endangerment of several marine species that depend on kelp forests for shelter and food.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-8">
            {speciesData.map(species => (
              <SpeciesCard 
                key={species.id}
                image={species.image}
                name={species.name}
                description={species.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='py-8 bg-[#4C7031]'>
        <div className="max-w-full relative overflow-hidden">
          <h2 className="text-2xl font-bold text-center text-white mb-6">A climate fighting powerhouse</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {cards.map((card) => (
            <InformationCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              className={card.className}
            />
          ))}
          </div>
        </div>
      </div>

      <div className="py-8 bg-black">
        <h4 className="text-base font-bold text-center text-white mb-6">© 2025 KelpKeepers</h4>
      </div>
    </div>
  )
}

export default HomePage