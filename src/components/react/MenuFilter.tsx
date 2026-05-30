import React, { useState, useMemo } from 'react';

const FOOD_CATEGORIES = ["Traditional Irish Classics", "American Pub Fare", "Starters"];
const DRINK_CATEGORIES = ["Draft Beers", "Bottles & Cans", "Irish Whiskey", "Bourbon & Rye", "Scotch Whisky", "Tequila & Mezcal", "Gin", "Vodka", "Rum"];

type Tab = 'food' | 'drinks';

interface MenuItem {
  name: string;
  description: string;
  price: string | number;
  category: string;
  tags: string[];
  image?: string;
}

interface MenuFilterProps {
  items: MenuItem[];
  categories: string[];
}

export const MenuFilter: React.FC<MenuFilterProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<Tab>('food');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subCategories = activeTab === 'food' ? FOOD_CATEGORIES : DRINK_CATEGORIES;

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    setActiveCategory('All');
    setSearchQuery('');
  }

  const filteredItems = useMemo(() => {
    const tabCategories = activeTab === 'food' ? FOOD_CATEGORIES : DRINK_CATEGORIES;
    return items.filter((item) => {
      const inTab = tabCategories.includes(item.category);
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return inTab && matchesCategory && matchesSearch;
    });
  }, [items, activeTab, activeCategory, searchQuery]);

  return (
    <div id="menu-filter" className="w-full max-w-7xl mx-auto px-4">
      {/* Tab Switcher */}
      <div className="flex gap-4 justify-center mb-12">
        <button
          onClick={() => switchTab('food')}
          className={`group relative flex-1 max-w-xs flex flex-col items-center gap-3 py-8 px-6 rounded-xl border-2 transition-all duration-300 ${
            activeTab === 'food'
              ? 'bg-pub-green/20 border-pub-green shadow-[0_0_24px_2px_rgba(21,122,54,0.4)]'
              : 'bg-wood-darker border-white/10 hover:border-pub-green/50 hover:bg-pub-green/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={`w-10 h-10 transition-colors duration-300 ${activeTab === 'food' ? 'text-pub-green' : 'text-white/50 group-hover:text-white/80'}`}>
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
          <span className={`font-cinzel text-xl uppercase tracking-widest transition-colors duration-300 ${activeTab === 'food' ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
            Food Menu
          </span>
          <span className={`font-lato text-sm transition-colors duration-300 ${activeTab === 'food' ? 'text-text-secondary' : 'text-white/30 group-hover:text-white/50'}`}>
            Irish Classics &amp; Pub Fare
          </span>
          {activeTab === 'food' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-pub-green rotate-45 border-r-2 border-b-2 border-pub-green" />
          )}
        </button>

        <button
          onClick={() => switchTab('drinks')}
          className={`group relative flex-1 max-w-xs flex flex-col items-center gap-3 py-8 px-6 rounded-xl border-2 transition-all duration-300 ${
            activeTab === 'drinks'
              ? 'bg-pub-green/20 border-pub-green shadow-[0_0_24px_2px_rgba(21,122,54,0.4)]'
              : 'bg-wood-darker border-white/10 hover:border-pub-green/50 hover:bg-pub-green/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className={`w-10 h-10 transition-colors duration-300 ${activeTab === 'drinks' ? 'text-pub-green' : 'text-white/50 group-hover:text-white/80'}`}>
            <path d="M17 11H3a1 1 0 0 0-1 1v2a8 8 0 0 0 16 0v-2a1 1 0 0 0-1-1Z" />
            <path d="M2 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
            <path d="M10 19v3" />
            <path d="M7 22h6" />
          </svg>
          <span className={`font-cinzel text-xl uppercase tracking-widest transition-colors duration-300 ${activeTab === 'drinks' ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
            Drinks Menu
          </span>
          <span className={`font-lato text-sm transition-colors duration-300 ${activeTab === 'drinks' ? 'text-text-secondary' : 'text-white/30 group-hover:text-white/50'}`}>
            Beers, Spirits &amp; More
          </span>
          {activeTab === 'drinks' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-pub-green rotate-45 border-r-2 border-b-2 border-pub-green" />
          )}
        </button>
      </div>

      {/* Sub-category + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full border transition-all duration-300 font-cinzel ${
              activeCategory === 'All'
                ? 'bg-pub-green text-white border-pub-green shadow-lg scale-105'
                : 'border-white/20 text-white/70 hover:border-pub-green hover:text-white'
            }`}
          >
            All
          </button>
          {subCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 font-cinzel whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-pub-green text-white border-pub-green shadow-lg scale-105'
                  : 'border-white/20 text-white/70 hover:border-pub-green hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-wood-darker border border-white/20 text-white px-4 py-2 rounded-full focus:outline-none focus:border-pub-green font-lato"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="group bg-wood-dark border border-pub-green/30 rounded-lg shadow-xl hover:border-pub-green transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_0_20px_2px_rgba(21,122,54,0.35)]"
          >
            {item.image && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-darker/60 to-transparent" />
              </div>
            )}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-cinzel text-xl text-white uppercase leading-tight">{item.name}</h3>
                  <span className="font-cinzel text-pub-green font-bold text-lg ml-4">
                    {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                  </span>
                </div>
                <p className="font-lato text-text-secondary text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-cinzel border border-pub-green/50 text-pub-green px-2 py-0.5 rounded uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="font-cinzel text-xl text-text-secondary">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
