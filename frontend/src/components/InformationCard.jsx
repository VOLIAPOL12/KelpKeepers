import React from 'react'

function InformationCard({ title, description, image, className }) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative p-6 h-full flex flex-col z-10 text-white">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm md:text-base">{description}</p>
      </div>
    </div>
  )
}

export default InformationCard