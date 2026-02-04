import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import AddonCard from './components/AddonCard';
import AddonListItem from './components/AddonListItem';
import { ADDONS } from './constants';
import { OBJECTS } from './objectsConstants';
import { ViewMode, SortOrder, ClickCounts, PageType } from './types';
import { getAllClickCounts, trackClick, updateLocalCache } from './utils/clickTracker';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('popular');
  const [pageType, setPageType] = useState<PageType>('addons');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [clickCounts, setClickCounts] = useState<ClickCounts>({});
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);

  // Get current data source based on page type
  const currentData = pageType === 'addons' ? ADDONS : OBJECTS;

  // Load click counts on mount or when page type changes
  useEffect(() => {
    const loadClickCounts = async () => {
      setIsLoadingCounts(true);
      const itemNames = currentData.map(a => a.name);
      const counts = await getAllClickCounts(itemNames);
      setClickCounts(counts);
      setIsLoadingCounts(false);
    };
    loadClickCounts();
  }, [pageType]);

  // Reset filters when changing page type
  useEffect(() => {
    setSearchTerm('');
    setActiveTags([]);
  }, [pageType]);

  // Handle addon click
  const handleAddonClick = async (addonName: string) => {
    const newCount = await trackClick(addonName);
    if (newCount > 0) {
      setClickCounts(prev => ({ ...prev, [addonName]: newCount }));
      updateLocalCache(addonName, newCount);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Extract all unique tags from current data
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    currentData.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [pageType]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...currentData];

    // Filter by Search Term
    const query = searchTerm.toLowerCase().trim();
    if (query) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query)
      );
    }

    // Filter by Tags (must match ALL selected tags)
    if (activeTags.length > 0) {
      result = result.filter(item =>
        activeTags.every(tag => item.tags?.includes(tag))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === 'popular') {
        const countA = clickCounts[a.name] || 0;
        const countB = clickCounts[b.name] || 0;
        return countB - countA; // Descending by popularity
      }
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return result;
  }, [searchTerm, activeTags, sortOrder, clickCounts, pageType]);

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 transition-colors duration-300">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        resultCount={filteredAndSortedItems.length}
        availableTags={availableTags}
        activeTags={activeTags}
        toggleTag={toggleTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        pageType={pageType}
        setPageType={setPageType}
      />

      {/* Active Tags Display (below header) */}
      {activeTags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-1">Active Filters:</span>
            {activeTags.map(tag => (
              <span key={tag} className="bg-primary text-dark-900 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                {tag}
                <button onClick={() => toggleTag(tag)} className="hover:text-red-600">
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            <button
              onClick={() => setActiveTags([])}
              className="text-xs text-gray-400 underline hover:text-white ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-dark-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-dark-600">
              <i className={`fas ${pageType === 'addons' ? 'fa-plug' : 'fa-cube'} text-gray-500 text-3xl`}></i>
            </div>
            <h3 className="text-lg font-medium text-white">
              No {pageType === 'addons' ? 'add-ons' : 'objects'} found
            </h3>
            <p className="mt-1 text-gray-400">
              {currentData.length === 0
                ? `No ${pageType === 'addons' ? 'add-ons' : 'objects'} have been added yet.`
                : 'Try adjusting your search terms or filters.'}
            </p>
            {currentData.length > 0 && (
              <button
                onClick={() => { setSearchTerm(''); setActiveTags([]); }}
                className="mt-6 text-primary font-medium hover:underline"
              >
                Clear search & filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* List Header (Only visible in list mode and large screens) */}
            {viewMode === 'list' && (
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-3 pl-14">Name</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
            )}

            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-3"
            }>
              {filteredAndSortedItems.map((item) => (
                <React.Fragment key={item.name}>
                  {viewMode === 'grid' ? (
                    <AddonCard
                      addon={item}
                      clickCount={clickCounts[item.name] || 0}
                      onAddonClick={handleAddonClick}
                    />
                  ) : (
                    <AddonListItem
                      addon={item}
                      clickCount={clickCounts[item.name] || 0}
                      onAddonClick={handleAddonClick}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="sticky bottom-0 z-40 bg-dark-800 border-t border-dark-600 transition-colors duration-300 shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Archicad Repository
              <span className="text-xs text-gray-500 ml-2">by Gëzim Radoniqi</span>
            </p>
          </div>
          <div className="flex gap-4">
             <a href="https://github.com/giza611/Archicad-Add-on-Repository" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
               <i className="fab fa-github text-xl"></i>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;