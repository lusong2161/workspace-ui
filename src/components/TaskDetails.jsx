import React from 'react';
import '../styles/task-details.css';

function TaskDetails({ task, categories, onClose }) {
  if (!task) return null;

  const category = categories.find(c => c.id === task.categoryId) || { name: '默认分类', color: '#808080' };

  return (
    <div className="task-details-overlay" onClick={onClose}>
      <div className="task-details-modal" onClick={e => e.stopPropagation()}>
        <div className="task-details-header">
          <h2>任务详情</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="task-details-content">
          <div className="detail-item">
            <label>任务内容：</label>
            <p>{task.text}</p>
          </div>
          
          <div className="detail-item">
            <label>所属分类：</label>
            <span 
              className="category-tag"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          </div>
          
          <div className="detail-item">
            <label>状态：</label>
            <span className={`status-tag status-${task.status}`}>
              {task.status}
            </span>
          </div>
          
          <div className="detail-item">
            <label>优先级：</label>
            <span className={`priority-tag priority-${task.priority}`}>
              {task.priority}
            </span>
          </div>
          
          {task.dueDate && (
            <div className="detail-item">
              <label>到期日期：</label>
              <span className="due-date-tag">
                {new Date(task.dueDate).toLocaleDateString('zh-CN')}
              </span>
            </div>
          )}
          
          <div className="detail-item">
            <label>创建时间：</label>
            <span className="created-at-tag">
              {new Date(task.createdAt).toLocaleString('zh-CN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
