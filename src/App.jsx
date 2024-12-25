import React, { useState } from 'react';
import './App.css';
import Tasks from './Tasks';

function App() {
  const [activeTab, setActiveTab] = useState('主页');
  return (
    <div className="container">
      {/* 左侧主导航栏 */}
      <aside className="sidebar primary-sidebar" role="complementary">
        <nav className="sidebar-nav" role="navigation" aria-label="主导航">
          <a href="#" className="nav-item active" aria-current="page" title="主页">
            <i className="fas fa-home" aria-hidden="true"></i>
            <span className="sr-only">主页</span>
          </a>
          <a href="#" className="nav-item" title="新建文件夹">
            <i className="fas fa-folder-plus" aria-hidden="true"></i>
            <span className="sr-only">新建文件夹</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-icon" role="img" aria-label="工作区图标">W</div>
          <div className="ai-section">
            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
              <div className="progress"></div>
            </div>
            <button className="upgrade-btn" aria-label="升级到高级版本">升级</button>
          </div>
        </div>
      </aside>

      {/* 第二个左侧导航栏 */}
      <aside className="sidebar secondary-sidebar" role="complementary">
        <nav className="sidebar-nav" role="navigation" aria-label="二级导航">
          <a href="#" className="nav-item active" aria-current="page" title="项目">项目</a>
          <a 
            href="#" 
            className={`nav-item ${activeTab === '任务' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('任务');
            }} 
            title="任务"
          >任务</a>
          <a href="#" className="nav-item" title="日历">日历</a>
          <a href="#" className="nav-item" title="文档">文档</a>
          <a href="#" className="nav-item" title="团队">团队</a>
        </nav>
      </aside>

      {/* 主要内容区 */}
      <main className="main-content">
        {activeTab === '任务' ? (
          <Tasks />
        ) : (
          <>
            {/* 二级导航栏 */}
        <nav className="secondary-nav" role="navigation" aria-label="二级导航">
          <a href="#" className="nav-tab active" aria-current="page">
            <i className="fas fa-robot"></i>
            人工智能聊天机器人
          </a>
          <a href="#" className="nav-tab">
            <i className="fas fa-image"></i>
            人工智能图片
          </a>
          <a href="#" className="nav-tab">
            <i className="fas fa-ellipsis-h"></i>
            其他
          </a>
          <a href="#" className="nav-tab">
            <i className="fas fa-question-circle"></i>
            问答
          </a>
        </nav>

        <section className="feature-section">
          <div className="feature-cards">
            <article className="card">
              <i className="fas fa-magic"></i>
              <h3>使用AI工具创建</h3>
            </article>
            <article className="card">
              <i className="fas fa-plus"></i>
              <h3>从头开始创建</h3>
            </article>
            <article className="card">
              <i className="fas fa-file-import"></i>
              <h3>导入</h3>
            </article>
          </div>
        </section>

        <section className="projects-section">
          <article className="project-item">
            <div className="project-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="project-info">
              <h3>开始使用</h3>
              <div className="project-meta">
                <time className="date">2024年12月7日 8:00 - 2024年12月10日 8:00</time>
                <img src="https://via.placeholder.com/24" alt="用户头像" className="user-avatar" />
                <span className="username">wisenet2161</span>
                <span className="priority-tag">高优先级</span>
                <button className="edit-btn">编辑</button>
                <button className="auto-btn">自动化</button>
                <time className="time-ago">17天前</time>
              </div>
            </div>
          </article>
        </section>
          </>
        )}
      </main>

      {/* 右侧边栏 */}
      <aside className="sidebar right-sidebar" role="complementary">
        <nav className="sidebar-nav" role="navigation" aria-label="辅助导航">
          <a href="#" className="nav-item" title="通知">
            <i className="fas fa-bell" aria-hidden="true"></i>
            <span className="sr-only">通知</span>
          </a>
        </nav>
      </aside>
    </div>
  );
}

export default App;
