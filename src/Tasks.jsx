import React, { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // 从 localStorage 读取任务
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  // 保存任务到 localStorage
  const updateLocalStorage = (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  // 添加任务
  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: '进行中',
      priority: '普通',
      createTime: new Date().toLocaleString('zh-CN'),
    };
    
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    updateLocalStorage(newTasks);
    setNewTaskTitle('');
  };

  // 删除任务
  const removeTask = (id) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    updateLocalStorage(filtered);
  };

  // 更新任务状态
  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  // 更新任务优先级
  const updateTaskPriority = (id, newPriority) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  // 编辑任务
  const startEditing = (task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
  };

  const saveEdit = () => {
    if (!newTaskTitle.trim() || !editingTask) return;
    
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? { ...task, title: newTaskTitle } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setEditingTask(null);
    setNewTaskTitle('');
  };

  return (
    <div className="tasks-container" style={{ padding: '20px', color: 'var(--text-color)' }}>
      <div className="tasks-header" style={{ marginBottom: '20px' }}>
        <h2>任务列表</h2>
        <div className="task-input-group" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder={editingTask ? "编辑任务" : "新建任务"}
            style={{
              padding: '8px',
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              flex: 1
            }}
          />
          <button
            onClick={editingTask ? saveEdit : addTask}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--accent-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {editingTask ? '保存' : '添加'}
          </button>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div
            key={task.id}
            className="task-item"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="task-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="task-info">
                <h3 style={{ margin: '0 0 5px 0' }}>{task.title}</h3>
                <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                  创建时间: {task.createTime}
                </div>
              </div>
              <div className="task-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  style={{
                    padding: '4px',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px'
                  }}
                >
                  <option value="待办">待办</option>
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                </select>
                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                  style={{
                    padding: '4px',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px'
                  }}
                >
                  <option value="低">低优先级</option>
                  <option value="普通">普通优先级</option>
                  <option value="高">高优先级</option>
                </select>
                <button
                  onClick={() => startEditing(task)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  编辑
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
