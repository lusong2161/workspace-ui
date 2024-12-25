import React from 'react';
import '../styles/export-button.css';

function ExportButton({ tasks, categories }) {
  const exportToCSV = () => {
    console.log('开始导出任务数据');
    
    // 准备CSV头部
    const headers = ['任务内容', '状态', '优先级', '分类', '创建时间', '到期日期'];
    
    // 转换任务数据为CSV行
    const taskRows = tasks.map(task => {
      const category = categories.find(c => c.id === task.categoryId)?.name || '默认分类';
      const createdAt = new Date(task.createdAt).toLocaleString('zh-CN');
      const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('zh-CN') : '无';
      
      return [
        task.text,
        task.status,
        task.priority,
        category,
        createdAt,
        dueDate
      ];
    });
    
    // 组合所有行
    const csvContent = [
      headers,
      ...taskRows
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // 创建Blob对象
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    // 创建下载链接
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.href = url;
    link.download = `任务列表_${timestamp}.csv`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('任务数据导出完成');
  };
  
  return (
    <button className="export-button" onClick={exportToCSV}>
      导出任务列表
    </button>
  );
}

export default ExportButton;
