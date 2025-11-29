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
        <p>No todos yet. Add one above !</p>
      ): (
        todos.map(todo =>(
          <div key={todo.id} className="todo-item">
          <span> {todo.text}</span>
          <span className="category-badge">{todo.category}</span>
          <span className="category-date">{todo.date}</span>
          </div>
        ))
      )}
    </div>
    </header>
  </div>
 );
 
}

export default App;