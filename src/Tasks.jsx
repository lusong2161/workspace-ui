import React, { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        status: '进行中',
        priority: '中',
        createdAt: new Date().toISOString()
      }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };


  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const saveEdit = () => {
    if (editingTask) {
      updateTask(editingTask.id, editingTask);
      setEditingTask(null);
    }
  };

  return (
    <div className="tasks">
      <h2>任务列表</h2>
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            backgroundColor: '#333',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            width: '300px'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          添加
        </button>
      </div>

      <div className="task-list" style={{ marginTop: '1rem' }}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#262626',
              padding: '1rem',
              marginBottom: '0.5rem',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {editingTask?.id === task.id ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                  style={{
                    padding: '0.25rem',
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                />
                <select
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                  style={{
                    padding: '0.25rem',
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                >
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                  <option value="已暂停">已暂停</option>
                </select>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  style={{
                    padding: '0.25rem',
                    backgroundColor: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                >
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
                <button
                  onClick={saveEdit}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  保存
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span>{task.text}</span>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: task.status === '已完成' ? '#4CAF50' : 
                                  task.status === '已暂停' ? '#FFA500' : '#2196F3',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  {task.status}
                </span>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: task.priority === '高' ? '#f44336' :
                                  task.priority === '中' ? '#ff9800' : '#4caf50',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  {task.priority}
                </span>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => editingTask?.id === task.id ? setEditingTask(null) : startEditing(task)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#2196F3',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {editingTask?.id === task.id ? '取消' : '编辑'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#f44336',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
