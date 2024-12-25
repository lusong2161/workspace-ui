import React, { useState, useContext } from 'react';
import { SearchContext } from './App';
import { useTasks } from './hooks/useTasks';

function Tasks() {
  console.log('Tasks组件渲染开始');
  const { tasks, editingTask, addTask, deleteTask, updateTask, startEditing, saveEdit } = useTasks();
  const [newTask, setNewTask] = useState('');
  const { searchText } = useContext(SearchContext);
  
  console.log('Tasks组件状态:', { tasks, newTask, searchText, editingTask });

  console.log('当前搜索文本:', searchText);
  const filteredTasks = tasks.filter(task => {
    const matches = task && task.text && task.text.toLowerCase().includes(searchText.toLowerCase());
    console.log(`任务 "${task?.text}" ${matches ? '匹配' : '不匹配'}搜索条件`);
    return matches;
  });
  console.log('过滤后的任务列表:', filteredTasks);

  const handleAddTask = () => {
    console.log('处理添加任务');
    if (!newTask.trim()) {
      alert('任务内容不能为空！');
      return;
    }
    if (newTask.length > 100) {
      alert('任务内容不能超过100个字符！');
      return;
    }
    const success = addTask(newTask);
    if (success) {
      setNewTask('');
    }
  };


  // 编辑功能已移至useTasks hook

  return (
    <div className="tasks">
      <h2>任务列表</h2>
      
      <div className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            console.log('输入新任务:', e.target.value);
            setNewTask(e.target.value);
          }}
          placeholder="添加新任务..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              console.log('按下回车键添加任务');
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask}>添加</button>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-item">
            {editingTask?.id === task.id ? (
              <div className="task-edit-form">
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) => {
                    console.log('编辑任务文本:', e.target.value);
                    setEditingTask({ ...editingTask, text: e.target.value });
                  }}
                />
                <select
                  value={editingTask.status}
                  onChange={(e) => {
                    console.log('修改任务状态:', e.target.value);
                    setEditingTask({ ...editingTask, status: e.target.value });
                  }}
                >
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                  <option value="已暂停">已暂停</option>
                </select>
                <select
                  value={editingTask.priority}
                  onChange={(e) => {
                    console.log('修改任务优先级:', e.target.value);
                    setEditingTask({ ...editingTask, priority: e.target.value });
                  }}
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
                onClick={() => {
                  console.log('点击编辑/取消按钮, 任务:', task);
                  editingTask?.id === task.id ? setEditingTask(null) : startEditing(task);
                }}
                className={editingTask?.id === task.id ? 'cancel-button' : 'edit-button'}
              >
                {editingTask?.id === task.id ? '取消' : '编辑'}
              </button>
              <button
                onClick={() => {
                  console.log('点击删除按钮, 任务ID:', task.id);
                  deleteTask(task.id);
                }}
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
