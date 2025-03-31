import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setTodos([...todos, { task, description, id: Date.now() }]);
    setTask('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, task, description) => {
    setEditId(id);
    setEditTask(task);
    setEditDescription(description);
  };

  const handleSave = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, task: editTask, description: editDescription } : todo
    ));
    setEditId(null);
  };

  return (
    <div className="container">
      <h1>TO-DO LIST</h1>
      <form onSubmit={handleAdd} className="todo-form">
        <input 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Enter task"
        />
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description"
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="task-container">
            {editId === todo.id ? (
              <>
                <input 
                  value={editTask} 
                  onChange={(e) => setEditTask(e.target.value)} 
                />
                <input 
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)} 
                />
                <button onClick={() => handleSave(todo.id)} className="edit-btn">Save</button>
              </>
            ) : (
              <>
                <div className="task-text">
                  <div className="task-name">{todo.task}</div>
                  <p>{todo.description}</p>
                </div>
                <button onClick={() => handleEdit(todo.id, todo.task, todo.description)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="delete-btn">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
