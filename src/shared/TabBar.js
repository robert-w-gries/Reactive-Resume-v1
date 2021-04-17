import React from 'react';

const SelectedTab = ({ children }) => (
  <div className="my-2 p-3 rounded-full text-white bg-gray-700 cursor-pointer select-none">
    {children}
  </div>
);

const Tab = ({ children }) => (
  <div className="my-2 p-3 rounded-full hover:bg-gray-200 cursor-pointer select-none">
    {children}
  </div>
);

const TabBar = ({ tabs, selectedTab, onSelect }) => (
  <div className="flex-col px-2">
    {tabs.map((tab) => (
      <div key={tab.key} onClick={() => onSelect(tab.key)}>
        {tab.key === selectedTab ? <SelectedTab>{tab.name}</SelectedTab> : <Tab>{tab.name}</Tab>}
      </div>
    ))}
  </div>
);

export default TabBar;
