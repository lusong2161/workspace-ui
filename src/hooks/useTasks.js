import { useState, useEffect } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    console.log('初始化tasks状态');
    const savedTasks = localStorage.getItem('tasks');
    console.log('从localStorage读取的原始数据:', savedTasks);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    console.log('Tasks状态更新，准备写入localStorage:', tasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('成功写入localStorage');
    } catch (error) {
      console.error('写入localStorage失败:', error);
    }
  }, [tasks]);

  const addTask = (newTaskText) => {
    console.log('添加任务被触发');
    console.log('任务内容:', newTaskText);
    if (!newTaskText.trim()) {
      console.log('任务内容为空，显示警告');
      return false;
    }
    if (newTaskText.length > 100) {
      console.log('任务内容超过100个字符，显示警告');
      return false;
    }
    const newTaskObj = {
      id: Date.now(),
      text: newTaskText.trim(),
      status: '进行中',
      priority: '中',
      createdAt: new Date().toISOString()
    };
    console.log('新建任务对象:', newTaskObj);
    setTasks(prevTasks => {
      console.log('设置新任务列表');
      return [...prevTasks, newTaskObj];
    });
    console.log('任务添加完成');
    return true;
  };

  const deleteTask = (taskId) => {
    console.log('删除任务被触发, taskId:', taskId);
    console.log('当前任务列表:', tasks);
    setTasks(prevTasks => {
      const newTasks = prevTasks.filter(task => task.id !== taskId);
      console.log('删除后的任务列表:', newTasks);
      return newTasks;
    });
    console.log('任务删除完成');
  };

  const updateTask = (taskId, updates) => {
    console.log('更新任务被触发, taskId:', taskId);
    console.log('更新内容:', updates);
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      );
      console.log('更新后的任务列表:', newTasks);
      return newTasks;
    });
    console.log('任务更新完成');
  };

  const [editingTask, setEditingTask] = useState(null);

  const startEditing = (task) => {
    console.log('开始编辑任务:', task);
    setEditingTask({ ...task });
    console.log('设置编辑状态完成');
  };

  const saveEdit = () => {
    console.log('保存编辑被触发');
    if (editingTask) {
      console.log('正在保存的任务:', editingTask);
      updateTask(editingTask.id, editingTask);
      console.log('任务更新完成');
      setEditingTask(null);
      console.log('退出编辑状态');
    } else {
      console.log('没有正在编辑的任务');
    }
  };

  return {
    tasks,
    editingTask,
    addTask,
    deleteTask,
    updateTask,
    startEditing,
    saveEdit
  };
}
