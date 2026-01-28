import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, SortOrder } from '../types';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  resultCount: number;
  availableTags: string[];
  activeTags: string[];
  toggleTag: (tag: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  viewMode, 
  setViewMode,
  resultCount,
  availableTags,
  activeTags,
  toggleTag,
  sortOrder,
  setSortOrder
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close filters when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <i className="fas fa-cubes text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Archicad Add-on <span className="text-primary">Repository</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                {resultCount} {resultCount === 1 ? 'result' : 'results'} found
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start sm:items-center">
            
            {/* Search and Filters */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-80" ref={searchRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search and filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowFilters(true)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-gray-400 hover:text-gray-600 mr-2"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-1 rounded hover:bg-gray-200 text-gray-500 ${showFilters ? 'text-primary bg-gray-100' : ''}`}
                    title="Toggle Filters"
                  >
                    <i className="fas fa-filter text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Dropdown Panel */}
              {showFilters && (
                <div className="absolute top-full left-0 w-full md:w-[400px] mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700 text-sm">Quick Filters</h3>
                    <div className="flex gap-2 text-xs">
                       <button 
                        onClick={() => setSortOrder('asc')}
                        className={`px-2 py-1 rounded border ${sortOrder === 'asc' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300'}`}
                      >
                         A-Z
                       </button>
                       <button 
                        onClick={() => setSortOrder('desc')}
                        className={`px-2 py-1 rounded border ${sortOrder === 'desc' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300'}`}
                      >
                         Z-A
                       </button>
                    </div>
                  </div>
                  
                  <div className="p-4 max-h-64 overflow-y-auto">
                     <p className="text-xs font-bold text-gray-400 uppercase mb-2">Categories & Countries</p>
                     <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                            activeTags.includes(tag)
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(activeTags.length > 0) && (
                     <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                        <button 
                          onClick={() => activeTags.forEach(t => toggleTag(t))} // Clear all
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Clear all filters
                        </button>
                     </div>
                  )}
                </div>
              )}
            </div>

            {/* View Toggles */}
            <div className="flex bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Grid view"
              >
                <i className="fas fa-th mr-2"></i>
                Tiles
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="List view"
              >
                <i className="fas fa-list mr-2"></i>
                List
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;