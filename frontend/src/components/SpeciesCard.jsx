import React from 'react';
import { useState } from 'react';

function SpeciesCard({ image, name, description }) {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    return (
        <div 
        className="h-64 w-full perspective-1000 cursor-pointer" 
        onClick={handleFlip}
        >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front of card */}
            <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg">
                <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                />
            </div>
            
            {/* Back of card */}
            <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg bg-teal-600 text-white p-6 flex flex-col justify-center rotate-y-180">
                <h3 className="font-bold text-xl mb-3">{name}</h3>
                <p>{description}</p>
            </div>
            </div>
        </div>
    );
}

export default SpeciesCard