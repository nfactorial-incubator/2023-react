'use client'
import { useState, useEffect } from 'react';
import TaskService from '@/app/services/TaskService';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-300 py-2"
          >
            {todo}
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
