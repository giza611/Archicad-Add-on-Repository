import React from 'react';
import { AddOn } from '../types';

interface AddonCardProps {
  addon: AddOn;
  clickCount: number;
  onAddonClick: (addonName: string) => void;
}

const AddonCard: React.FC<AddonCardProps> = ({ addon, clickCount, onAddonClick }) => {
  const isFree = addon.price.toLowerCase().includes('free');

  const handleClick = () => {
    onAddonClick(addon.name);
  };
  
  return (
    <div className="bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full border border-dark-600 hover:border-primary/50 group">
      <div className="relative overflow-hidden h-48 bg-dark-700">
        <img
          src={addon.thumbnail}
          alt={addon.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm bg-primary text-dark-900 flex items-center gap-1">
            <i className="fas fa-fire text-[10px]"></i>
            {clickCount}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
            isFree
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}>
            {addon.price}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
           <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
            {addon.name}
          </h3>
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <i className="fas fa-building mr-2 text-primary opacity-70"></i>
            <span>{addon.company}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
          {addon.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {addon.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-dark-700 text-gray-400 px-2 py-0.5 rounded-full border border-dark-600">
              {tag}
            </span>
          ))}
          {addon.tags && addon.tags.length > 3 && (
            <span className="text-[10px] text-gray-500 px-1">+{addon.tags.length - 3}</span>
          )}
        </div>

        <a
          href={addon.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block w-full text-center bg-dark-700 hover:bg-primary hover:text-dark-900 text-primary font-semibold py-2.5 px-4 rounded-lg border border-primary/30 hover:border-transparent transition-all duration-200"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default AddonCard;