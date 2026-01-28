import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import AddonCard from './components/AddonCard';
import AddonListItem from './components/AddonListItem';
import { ADDONS } from './constants';
import { ViewMode, SortOrder } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ADDONS.forEach(addon => {
      if (addon.tags) {
        addon.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter and sort addons
  const filteredAndSortedAddons = useMemo(() => {
    let result = ADDONS;

    // Filter by Search Term
    const query = searchTerm.toLowerCase().trim();
    if (query) {
      result = result.filter(addon => 
        addon.name.toLowerCase().includes(query) || 
        addon.description.toLowerCase().includes(query) ||
        addon.company.toLowerCase().includes(query)
      );
    }

    // Filter by Tags (must match ALL selected tags? or ANY? Let's go with ALL for stricter filtering)
    if (activeTags.length > 0) {
      result = result.filter(addon => 
        activeTags.every(tag => addon.tags?.includes(tag))
      );
    }

    // Sort
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return result;
  }, [searchTerm, activeTags, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        resultCount={filteredAndSortedAddons.length}
        availableTags={availableTags}
        activeTags={activeTags}
        toggleTag={toggleTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Active Tags Display (below header) */}
      {activeTags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-500 uppercase mr-1">Active Filters:</span>
            {activeTags.map(tag => (
              <span key={tag} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                {tag}
                <button onClick={() => toggleTag(tag)} className="hover:text-red-200">
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
            <button 
              onClick={() => setActiveTags([])}
              className="text-xs text-gray-500 underline hover:text-gray-800 ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {filteredAndSortedAddons.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-search text-gray-400 text-3xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No add-ons found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveTags([]); }}
              className="mt-6 text-primary font-medium hover:underline"
            >
              Clear search & filters
            </button>
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
              {filteredAndSortedAddons.map((addon) => (
                <React.Fragment key={addon.name}>
                  {viewMode === 'grid' ? (
                    <AddonCard addon={addon} />
                  ) : (
                    <AddonListItem addon={addon} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Archicad Add-on Repository. All rights reserved.
          </p>
          <div className="flex gap-4">
             <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
               <i className="fab fa-github text-xl"></i>
             </a>
             <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
               <i className="fab fa-twitter text-xl"></i>
             </a>
             <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
               <i className="fab fa-linkedin text-xl"></i>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;