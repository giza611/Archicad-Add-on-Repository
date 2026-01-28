import React from 'react';
import { AddOn } from '../types';

interface AddonCardProps {
  addon: AddOn;
}

const AddonCard: React.FC<AddonCardProps> = ({ addon }) => {
  const isFree = addon.price.toLowerCase().includes('free');
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img 
          src={addon.thumbnail} 
          alt={addon.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
            isFree 
              ? 'bg-green-100 text-green-800' 
              : 'bg-rose-100 text-rose-800'
          }`}>
            {addon.price}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
           <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
            {addon.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <i className="fas fa-building mr-2 text-primary opacity-70"></i>
            <span>{addon.company}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {addon.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {addon.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
              {tag}
            </span>
          ))}
          {addon.tags && addon.tags.length > 3 && (
            <span className="text-[10px] text-gray-400 px-1">+{addon.tags.length - 3}</span>
          )}
        </div>
        
        <a 
          href={addon.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-gray-50 hover:bg-primary hover:text-white text-primary font-semibold py-2.5 px-4 rounded-lg border border-primary/20 hover:border-transparent transition-all duration-200"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default AddonCard;