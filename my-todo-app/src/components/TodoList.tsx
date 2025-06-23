/******************************************************
 *                     Santosh Chandra Shekhar        *
 *                      To-Do App Component           *
 ******************************************************/
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  tasks: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;