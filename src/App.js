import React, {useState} from 'react';
import './App.css';

function App(){
  // state for todos array and input fields
  const [todos,setTodos]= useState([]);
  const [todoText, setTodoText]= useState('');
  const [todoCategory, setTodoCategory]= useState('personal');
  const [todoDate, setTodoDate]=useState('');

 // add new todo function
 const addTodo= ()=>{
  if(todoText.trim()==='')return;

  const newTodo={
    id:Date.now(),
    text:todoText,
    category:todoCategory,
    date:todoDate,
    completed:false,
    createdAt:new Date().toISOString()
  };

  setTodos([...todos,newTodo]);
  setTodoText('');
  setTodoDate('');
 };

 // toggle todo completion 
 const toggleTodo= (id)=>{
  setTodos(todos.map(todo =>
    todo.id ===id ? {...todo, completed: !todo.completed} : todo
  ));
 }
 
 //delete todo
 const deleteTodo=(id)=>{
  setTodos(todos.filter(todo => todo.id !== id));
 }

 // handle Enter key press in input
  const handleKeyPress=(e)=>{
    if(e.key==='Enter'){
      addTodo();
    }
  }

 return (
  <div className="App">
    <header className="App-header">
      <h1>My Todo List</h1>

      {/* Todo Input Form*/}
    <div className="todo-form">
     <input
       type="text"
       value={todoText}
       onChange={(e)=>setTodoText(e.target.value)}
       onKeyPress={handleKeyPress}
       placeholder="What needs to be done ?"
       className="todo-input"
     />

      <select
        value={todoCategory}
        onChange={(e)=>setTodoCategory(e.target.value)}
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
        onChange= {(e)=> setTodoDate(e.target.value)}
        className="date-input"
      />
      <button onClick={addTodo} className="add-button" >
        Add Todo
      </button>
    </div>

    {/* Todo List Display */}
    <div className="todo-list">
      {todos.length ===0 ?(
        <p className="empty-message">No todos yet. Add one above !</p>
      ): (
        todos.map(todo =>(
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />

          <div className="todo-content">
          <span className="todo-text">{todo.text}</span>
          <div clasName="todo-meta">
          <span className={`category-badge category-${todo.category}`}>{todo.category}</span>

          <span> {todo.text}</span>
          <span className="category-badge">{todo.category}</span>
          <span className="category-date">{todo.date}</span>
          {todo.date && (
            <span className="todo-date">Due: {todo.date}</span>
          )}
          </div>
          </div>

          <button
            onClick={ ()=> deleteTodo (todo.id)}
            className="delelte-button"
            arial-label="delete todo"
            >
              X
            </button>
          ){'}'}
          </div>
        ))
    )}  
    </div>

    {/* Todo Stats */}
    {todos.length > 0 && (
      <div className="todo-stats">
        <p>
          Total Todos: {todos.length} |
          completed :{todos.filter(todo=> todo.completed).length} |
          Remaining: {todos.filter(todo =>!todo.completed).length}
        
        </p>
        </div>
        )}

    </header>
  </div>
 );
 
}

export default App;