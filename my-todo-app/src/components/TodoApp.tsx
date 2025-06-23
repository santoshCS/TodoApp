/******************************************************
 *                     Santosh Chandra Shekhar        *
 *                      To-Do App Component           *
 ******************************************************/
import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Filter from './Filter';
import { Todo } from '../types/todo';
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from '../utils/localStorage';

interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiDataLoaded, setApiDataLoaded] = useState<boolean>(false);

  // Fetch todos from API
  const fetchTodosFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/todos?limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      
      // Transform API data to match our Todo interface
      const apiTodos: Todo[] = data.todos.map((todo: ApiTodo) => ({
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        isFromAPI: true // Flag to identify API todos
      }));
      
      return apiTodos;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeTodos = async () => {
      // Get existing tasks from localStorage first
      const existingTasks = getTasksFromLocalStorage();
      
      // Check if we already have API data (to avoid re-fetching on every refresh)
      const hasApiData = existingTasks.some(task => task.isFromAPI);
      
      if (!hasApiData) {
        // First time loading - fetch from API
        const apiTodos = await fetchTodosFromAPI();
        const combinedTasks = [...apiTodos, ...existingTasks];
        setTasks(combinedTasks);
        setApiDataLoaded(true);
        // Save combined tasks (including API data) to localStorage
        saveTasksToLocalStorage(combinedTasks);
      } else {
        // Subsequent loads - use localStorage data
        setTasks(existingTasks);
        setApiDataLoaded(true);
        setLoading(false);
      }
    };

    initializeTodos();
  }, []);

  // Save all tasks to localStorage when tasks change (after initial load)
  useEffect(() => {
    if (apiDataLoaded && tasks.length > 0) {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks, apiDataLoaded]);

  const addTask = (taskText: string) => {
    const newTask: Todo = { 
      id: Date.now(), // Use timestamp to avoid conflicts with API IDs
      text: taskText, 
      completed: false,
      isFromAPI: false // This is a local task
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="container">
        <h1>Todo List</h1>
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      {error && (
        <div className="error-message">
          Error: {error}. You can still add your own todos!
        </div>
      )}
      <AddTodo onAdd={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <div className="stats">
        <span>Total: {tasks.length}</span>
        <span>Completed: {tasks.filter(t => t.completed).length}</span>
        <span>Pending: {tasks.filter(t => !t.completed).length}</span>
      </div>
      <TodoList 
        tasks={filteredTasks} 
        onToggleComplete={toggleTaskCompletion} 
        onDelete={deleteTask} 
      />
    </div>
  );
};

export default TodoApp;