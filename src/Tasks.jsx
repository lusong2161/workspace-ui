import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from './App';

function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const { searchText } = useContext(SearchContext);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => 
    task && task.text && task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      alert('任务内容不能为空！');
      return;
    }
    if (trimmedTask.length > 100) {
      alert('任务内容不能超过100个字符！');
      return;
    }
    setTasks([...tasks, {
      id: Date.now(),
      text: trimmedTask,
      status: '进行中',
      priority: '中',
      createdAt: new Date().toISOString()
    }]);
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    const confirmed = window.confirm('确定要删除此任务吗？');
    if (!confirmed) {
      return;
    }
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
      
      <div className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>添加</button>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-item">
            {editingTask?.id === task.id ? (
              <div className="task-edit-form">
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                />
                <select
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                >
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                  <option value="已暂停">已暂停</option>
                </select>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                >
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
                <button onClick={saveEdit} className="save-button">保存</button>
              </div>
            ) : (
              <div className="task-content">
                <div className="task-text">{task.text}</div>
                <div className="task-metadata">
                  <span className={`task-status status-${task.status}`}>
                    {task.status}
                  </span>
                  <span className={`task-priority priority-${task.priority}`}>
                    优先级：{task.priority}
                  </span>
                </div>
              </div>
            )}
            
            <div className="task-buttons">
              <button
                onClick={() => editingTask?.id === task.id ? setEditingTask(null) : startEditing(task)}
                className={editingTask?.id === task.id ? 'cancel-button' : 'edit-button'}
              >
                {editingTask?.id === task.id ? '取消' : '编辑'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
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
