import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: input, id: Date.now() }]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const handleSave = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editInput } : todo
    ));
    setEditId(null);
  };


  return (
    <div>
    <form onSubmit={handleAdd}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button>Add</button>
    </form>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input 
                value={editInput} 
                onChange={(e) => setEditInput(e.target.value)} 
              />
              <button onClick={() => handleSave(todo.id)}>Save</button>
            </>
          ) : (
            <>
              {todo.text}
              <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App;

