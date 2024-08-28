import React from 'react';
import TaskItem from './taskItem';


function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h2>Ontem</h2>
        {tasks.filter(task => task.data === new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]).map(task => (
          <TaskItem key={task.id} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
        ))}
      </div>
      <div className="kanban-column">
        <h2>Hoje</h2>
        {tasks.filter(task => task.data === new Date().toISOString().split('T')[0]).map(task => (
          <TaskItem key={task.id} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
        ))}
      </div>
      <div className="kanban-column">
        <h2>Amanhã</h2>
        {tasks.filter(task => task.data === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]).map(task => (
          <TaskItem key={task.id} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
