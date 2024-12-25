import { useState, useEffect } from 'react';

export function useTasks() {
  const [categories, setCategories] = useState(() => {
    console.log('初始化categories状态');
    const savedCategories = localStorage.getItem('categories');
    console.log('从localStorage读取的分类数据:', savedCategories);
    return savedCategories ? JSON.parse(savedCategories) : [
      { id: 'default', name: '默认分类', color: '#808080' }
    ];
  });

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

  useEffect(() => {
    console.log('Categories状态更新，准备写入localStorage:', categories);
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
      console.log('成功写入分类数据到localStorage');
    } catch (error) {
      console.error('写入分类数据到localStorage失败:', error);
    }
  }, [categories]);

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
      categoryId: 'default',
      createdAt: new Date().toISOString(),
      dueDate: null
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

  const addCategory = (categoryName, color = '#808080') => {
    console.log('添加分类被触发');
    console.log('分类名称:', categoryName);
    if (!categoryName.trim()) {
      console.log('分类名称为空，显示警告');
      return false;
    }
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName.trim(),
      color
    };
    console.log('新建分类对象:', newCategory);
    setCategories(prevCategories => [...prevCategories, newCategory]);
    console.log('分类添加完成');
    return true;
  };

  const deleteCategory = (categoryId) => {
    console.log('删除分类被触发, categoryId:', categoryId);
    if (categoryId === 'default') {
      console.log('默认分类不能删除');
      return false;
    }
    setCategories(prevCategories => 
      prevCategories.filter(category => category.id !== categoryId)
    );
    // 将该分类下的任务移动到默认分类
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.categoryId === categoryId 
          ? { ...task, categoryId: 'default' }
          : task
      )
    );
    console.log('分类删除完成');
    return true;
  };

  const updateCategory = (categoryId, updates) => {
    console.log('更新分类被触发, categoryId:', categoryId);
    console.log('更新内容:', updates);
    if (categoryId === 'default' && updates.name !== '默认分类') {
      console.log('默认分类名称不能修改');
      return false;
    }
    setCategories(prevCategories => 
      prevCategories.map(category =>
        category.id === categoryId ? { ...category, ...updates } : category
      )
    );
    console.log('分类更新完成');
    return true;
  };

  const reorderTasks = (sourceIndex, targetIndex) => {
    console.log('重新排序任务', { sourceIndex, targetIndex });
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      const [movedTask] = newTasks.splice(sourceIndex, 1);
      newTasks.splice(targetIndex, 0, movedTask);
      console.log('重新排序后的任务列表:', newTasks);
      return newTasks;
    });
  };

  return {
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
  };
}
