/******************************************************
 *                     Santosh Chandra Shekhar        *
 *                      To-Do App Component           *
 ******************************************************/

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isFromAPI?: boolean; // Optional flag to identify API vs local todos
}