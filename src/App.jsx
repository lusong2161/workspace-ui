import React, { useState } from 'react';
import './App.css';
import Tasks from './Tasks';

function App() {
  const [activeTab, setActiveTab] = useState('任务');

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
          <input type="text" placeholder="搜索..." />
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
        {activeTab === '任务' && <Tasks />}
        {activeTab === '项目' && <div>项目内容</div>}
        {activeTab === '看板' && <div>看板内容</div>}
      </div>

      <div className="right-sidebar">
        <div className="icon">🔔</div>
      </div>
    </div>
  );
}

export default App;
