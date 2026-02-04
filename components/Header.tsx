import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, SortOrder, PageType } from '../types';

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
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  pageType: PageType;
  setPageType: (type: PageType) => void;
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
  setSortOrder,
  darkMode,
  setDarkMode,
  pageType,
  setPageType
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
    <header className="bg-dark-800 sticky top-0 z-50 border-b border-dark-600 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-10 h-10 flex items-center justify-center bg-primary text-dark-900 rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
              title="Refresh page"
            >
              <i className="fas fa-puzzle-piece text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">
                Archicad <span className="text-primary">Repository</span>
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                {resultCount} {resultCount === 1 ? 'result' : 'results'} found
              </p>
            </div>

            {/* Page Type Toggle */}
            <div className="flex bg-dark-700 p-1 rounded-lg ml-4">
              <button
                onClick={() => setPageType('addons')}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  pageType === 'addons'
                    ? 'bg-primary text-dark-900 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="fas fa-plug mr-2"></i>
                Add-Ons
              </button>
              <button
                onClick={() => setPageType('objects')}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  pageType === 'objects'
                    ? 'bg-primary text-dark-900 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="fas fa-cube mr-2"></i>
                Objects
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start sm:items-center">
            
            {/* Search and Filters */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-80" ref={searchRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-500"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search and filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowFilters(true)}
                  className="block w-full pl-10 pr-3 py-2 border border-dark-600 rounded-lg leading-5 bg-dark-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-dark-600 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-400 hover:text-white mr-2"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-1 rounded hover:bg-dark-600 text-gray-400 ${showFilters ? 'text-primary bg-dark-600' : ''}`}
                    title="Toggle Filters"
                  >
                    <i className="fas fa-filter text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Dropdown Panel */}
              {showFilters && (
                <div className="absolute top-full left-0 w-full md:w-[400px] mt-2 bg-dark-800 rounded-xl shadow-2xl border border-dark-600 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-dark-700 border-b border-dark-600 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-200 text-sm">Quick Filters</h3>
                    <div className="flex gap-2 text-xs">
                       <button
                        onClick={() => setSortOrder('popular')}
                        className={`px-2 py-1 rounded border ${sortOrder === 'popular' ? 'bg-primary text-dark-900 border-primary' : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary'}`}
                        title="Sort by popularity"
                      >
                         <i className="fas fa-fire"></i>
                       </button>
                       <button
                        onClick={() => setSortOrder('asc')}
                        className={`px-2 py-1 rounded border ${sortOrder === 'asc' ? 'bg-primary text-dark-900 border-primary' : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary'}`}
                      >
                         A-Z
                       </button>
                       <button
                        onClick={() => setSortOrder('desc')}
                        className={`px-2 py-1 rounded border ${sortOrder === 'desc' ? 'bg-primary text-dark-900 border-primary' : 'bg-dark-600 text-gray-300 border-dark-500 hover:border-primary'}`}
                      >
                         Z-A
                       </button>
                    </div>
                  </div>

                  <div className="p-4 max-h-64 overflow-y-auto">
                     <p className="text-xs font-bold text-gray-500 uppercase mb-2">Categories & Countries</p>
                     <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                            activeTags.includes(tag)
                              ? 'bg-primary text-dark-900 border-primary shadow-sm'
                              : 'bg-dark-700 text-gray-300 border-dark-600 hover:border-primary hover:text-primary'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(activeTags.length > 0) && (
                     <div className="p-2 bg-dark-700 border-t border-dark-600 text-center">
                        <button
                          onClick={() => activeTags.forEach(t => toggleTag(t))} // Clear all
                          className="text-xs text-red-400 hover:text-red-300 font-medium"
                        >
                          Clear all filters
                        </button>
                     </div>
                  )}
                </div>
              )}
            </div>

            {/* View Toggles */}
            <div className="flex bg-dark-700 p-1 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary text-dark-900 shadow-sm'
                    : 'text-gray-400 hover:text-white'
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
                    ? 'bg-primary text-dark-900 shadow-sm'
                    : 'text-gray-400 hover:text-white'
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