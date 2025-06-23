import { Todo } from '../types/todo';

const STORAGE_KEY = 'todo-tasks';

export const saveTasksToLocalStorage = (tasks: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export const getTasksFromLocalStorage = (): Todo[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
};