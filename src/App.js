import React, { useState,useEffect } from 'react';
import { FaTrash, FaCalendarAlt, FaTag } from 'react-icons/fa';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoCategory, setTodoCategory] = useState('personal');
  const [todoDate, setTodoDate] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect (() =>{
    const remaining= todos.filter(todo => !todo.compelted).length;
    document.title =remaining >0 ? `(${remaining}) FLOWORK` : 'FLOWORK';
  }, [todos]); 

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const addTodo = () => {
    if (todoText.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: todoText,
      category: todoCategory,
      date: todoDate,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([...todos, newTodo]);
    setTodoText('');
    setTodoDate('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FLOWORK</h1>
        
        {/* Todo Input Form */}
        <div className="todo-form">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          
          <select 
            value={todoCategory} 
            onChange={(e) => setTodoCategory(e.target.value)}
            className="category-select"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>
          
          <input
            type="date"
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            className="date-input"
          />
          
          <button onClick={addTodo} className="add-button">
            Add Todo
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {filter === 'all' 
                ? 'No todos yet. Add one above!' 
                : `No ${filter} todos!`
              }
            </p>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                <div className="card-header">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.text}</span>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                    aria-label="Delete todo"
                  >
                    <FaTrash className="trash-icon" />
                  </button>
                </div>
                
                <div className="card-footer">
                  <div className="todo-meta">
                    <span className={`category-badge category-${todo.category}`}>
                      <FaTag className="meta-icon" />
                      {todo.category}
                    </span>
                    {todo.date && (
                      <span className="todo-date">
                        <FaCalendarAlt className="meta-icon" />
                        Due: {todo.date}
                      </span>
                    )}
                    <span className="created-date">
                      Added: {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Todo Stats & Clear Button */}
        {todos.length > 0 && (
          <div className="todo-stats-container">
            <div className="todo-stats">
              <p>
                <span className="stat-item">Total: {todos.length}</span>
                <span className="stat-item">Completed: {todos.filter(todo => todo.completed).length}</span>
                <span className="stat-item">Remaining: {todos.filter(todo => !todo.completed).length}</span>
                {filter !== 'all' && (
                  <span className="stat-item">Showing: {filter} ({filteredTodos.length})</span>
                )}
              </p>
            </div>
            
            {/* Clear Completed Button */}
            {todos.filter(todo => todo.completed).length > 0 && (
              <button 
                onClick={clearCompleted}
                className="clear-completed-btn"
              >
                Clear Completed
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;