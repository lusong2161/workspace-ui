import React, { useState, useContext } from 'react';
import { SearchContext } from './App';
import { useTasks } from './hooks/useTasks';
import TaskDetails from './components/TaskDetails';
import ExportButton from './components/ExportButton';
import './styles/categories.css';
import './styles/drag-and-drop.css';
import './styles/due-date.css';

function Tasks() {
  console.log('Tasks组件渲染开始');
  const { 
    tasks, 
    categories,
    editingTask, 
    setEditingTask, 
    addTask, 
    deleteTask, 
    updateTask, 
    startEditing, 
    saveEdit,
    addCategory,
    deleteCategory,
    updateCategory,
    reorderTasks
  } = useTasks();

  const handleDragStart = (e, index) => {
    console.log('开始拖拽，索引:', index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log('拖拽经过');
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    console.log('放置任务', { sourceIndex, targetIndex });
    if (sourceIndex !== targetIndex) {
      reorderTasks(sourceIndex, targetIndex);
    }
  };
  const [newTask, setNewTask] = useState('');
  const { searchText } = useContext(SearchContext);
  const [selectedTask, setSelectedTask] = useState(null);
  
  console.log('Tasks组件状态:', { tasks, newTask, searchText, editingTask, selectedTask });

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
      
      <div className="categories-section">
        <h3>分类管理</h3>
        <div className="categories-list">
          {categories.map(category => (
            <div key={category.id} className="category-item" style={{ borderColor: category.color }}>
              <span>{category.name}</span>
              {category.id !== 'default' && (
                <button 
                  onClick={() => deleteCategory(category.id)}
                  className="delete-category-button"
                >
                  删除
                </button>
              )}
            </div>
          ))}
          <button 
            onClick={() => {
              const name = prompt('请输入新分类名称：');
              if (name) {
                const color = prompt('请输入分类颜色（十六进制格式，如 #FF0000）：', '#808080');
                addCategory(name, color);
              }
            }}
            className="add-category-button"
          >
            添加分类
          </button>
        </div>
      </div>
      
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

      <div className="task-header">
        <ExportButton tasks={tasks} categories={categories} />
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            className="task-item"
            draggable={!editingTask}
            onDragStart={(e) => handleDragStart(e, filteredTasks.indexOf(task))}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, filteredTasks.indexOf(task))}>
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
                  value={editingTask.categoryId}
                  onChange={(e) => {
                    console.log('修改任务分类:', e.target.value);
                    setEditingTask({ ...editingTask, categoryId: e.target.value });
                  }}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
                <input
                  type="date"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => {
                    console.log('修改到期日期:', e.target.value);
                    setEditingTask({ ...editingTask, dueDate: e.target.value });
                  }}
                  className="date-picker"
                />
                <button onClick={saveEdit} className="save-button">保存</button>
              </div>
            ) : (
              <div 
                className="task-content"
                onClick={() => {
                  console.log('点击任务，显示详情:', task);
                  setSelectedTask(task);
                }}
              >
                <div className="task-text">{task.text}</div>
                <div className="task-metadata">
                  <span 
                    className="task-category"
                    style={{ 
                      backgroundColor: categories.find(c => c.id === task.categoryId)?.color || '#808080',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginRight: '8px'
                    }}
                  >
                    {categories.find(c => c.id === task.categoryId)?.name || '默认分类'}
                  </span>
                  <span className={`task-status status-${task.status}`}>
                    {task.status}
                  </span>
                  <span className={`task-priority priority-${task.priority}`}>
                    优先级：{task.priority}
                  </span>
                  {task.dueDate && (
                    <span className="task-due-date">
                      到期日期：{new Date(task.dueDate).toLocaleDateString('zh-CN')}
                    </span>
                  )}
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

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          categories={categories}
          onClose={() => {
            console.log('关闭任务详情');
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default Tasks;
