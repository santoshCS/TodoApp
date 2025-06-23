/******************************************************
 *                     Santosh Chandra Shekhar        *
 *                      To-Do App Component           *
 ******************************************************/
import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  task: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''} ${task.isFromAPI ? 'api-todo' : 'local-todo'}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <span 
          onClick={() => onToggleComplete(task.id)} 
          className={`task-text ${task.completed ? 'completed-text' : ''}`}
        >
          {task.text}
        </span>
        <span className="task-source">
          {task.isFromAPI ? '🌐 API' : '📝 Local'}
        </span>
      </div>
      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          onDelete(task.id); 
        }}
        className="delete-button"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;