import React, { useState, createContext } from 'react';
import './App.css';
import Tasks from './Tasks';

export const SearchContext = createContext();

function App() {
  console.log('App组件渲染开始');
  const [activeTab, setActiveTab] = useState('任务');
  const [searchText, setSearchText] = useState('');
  
  console.log('App组件状态:', { activeTab, searchText });

  return (
    <div className="app">
      <div className="left-sidebar">
        <div className="icon">📊</div>
        <div className="icon">📝</div>
        <div className="icon">📅</div>
        <div className="icon">⚙️</div>
      </div>
      
      <div className="second-sidebar">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="搜索..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="menu-items">
          <div className={`menu-item ${activeTab === '任务' ? 'active' : ''}`} onClick={() => setActiveTab('任务')}>
            任务
          </div>
          <div className={`menu-item ${activeTab === '项目' ? 'active' : ''}`} onClick={() => setActiveTab('项目')}>
            项目
          </div>
          <div className={`menu-item ${activeTab === '看板' ? 'active' : ''}`} onClick={() => setActiveTab('看板')}>
            看板
          </div>
        </div>
      </div>

      <div className="main-content">
        <SearchContext.Provider value={{ searchText, setSearchText }}>
          {activeTab === '任务' && <Tasks />}
          {activeTab === '项目' && <div>项目内容</div>}
          {activeTab === '看板' && <div>看板内容</div>}
        </SearchContext.Provider>
      </div>

      <div className="right-sidebar">
        <div className="icon">🔔</div>
      </div>
    </div>
  );
}

export default App;
