import React from 'react';
import { AddOn } from '../types';

interface AddonListItemProps {
  addon: AddOn;
  clickCount: number;
  onAddonClick: (addonName: string) => void;
}

const AddonListItem: React.FC<AddonListItemProps> = ({ addon, clickCount, onAddonClick }) => {
  const isFree = addon.price.toLowerCase().includes('free');

  const handleClick = () => {
    onAddonClick(addon.name);
  };

  return (
    <div className="bg-dark-800 rounded-lg shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 border border-dark-600 hover:border-primary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="w-12 h-12 flex-shrink-0 hidden sm:block">
        <img
          src={addon.thumbnail}
          alt={addon.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-12 gap-4 w-full items-center">
        <div className="sm:col-span-3">
          <h3 className="font-bold text-white">{addon.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
             {addon.tags?.map(tag => (
               <span key={tag} className="text-[10px] bg-dark-700 text-gray-400 px-1.5 rounded-sm">
                 {tag}
               </span>
             ))}
          </div>
        </div>

        <div className="sm:col-span-2 text-sm text-gray-400 flex items-center">
          <i className="fas fa-building mr-2 text-primary opacity-70 sm:hidden"></i>
          {addon.company}
        </div>

        <div className="sm:col-span-4 flex flex-col justify-center">
          <span className="text-sm text-gray-400 line-clamp-2 sm:line-clamp-1 mb-1">
            {addon.description}
          </span>
          <div className="hidden sm:flex flex-wrap gap-1">
             {addon.tags?.slice(0, 4).map(tag => (
               <span key={tag} className="text-[10px] bg-dark-700 text-gray-500 border border-dark-600 px-1.5 rounded-full">
                 {tag}
               </span>
             ))}
          </div>
        </div>

        <div className="sm:col-span-1">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isFree
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}>
            {addon.price}
          </span>
        </div>

        <div className="sm:col-span-2 text-right flex items-center justify-end gap-3">
          <span className="text-xs text-primary flex items-center gap-1">
            <i className="fas fa-fire"></i>
            {clickCount}
          </span>
          <a
            href={addon.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="text-sm font-semibold text-primary hover:text-primary-light hover:underline flex items-center justify-end gap-1"
          >
            Visit <i className="fas fa-external-link-alt text-xs ml-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddonListItem;