import React, { useState } from 'react';
import '../css/Todo.css'; // Import CSS file

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [title, setTitle] = useState(''); // Title input
    const [description, setDescription] = useState(''); // Description input
    const [date, setDate] = useState(''); // Date input
    const [priority, setPriority] = useState(''); // Priority input
    const [editIndex, setEditIndex] = useState(null); // Index of the todo being edited

    const addTodo = () => {
        if (title.trim() === '' || description.trim() === '' || date.trim() === '' || priority.trim() === '') {
            return;
        }

        const newTodo = {
            title,
            description,
            date,
            priority,
        };

        // Check if we are editing an existing todo
        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = newTodo;
            setTodos(updatedTodos);
            setEditIndex(null); // Clear edit mode
        } else {
            setTodos([...todos, newTodo]);
        }

        // Clear input fields after adding/editing a todo
        setTitle('');
        setDescription('');
        setDate('');
        setPriority('');
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const editTodo = (index) => {
        const todoToEdit = todos[index];
        setTitle(todoToEdit.title);
        setDescription(todoToEdit.description);
        setDate(todoToEdit.date);
        setPriority(todoToEdit.priority);
        setEditIndex(index);
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="todo-input"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="todo-input"
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="todo-input"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="todo-input"
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onClick={addTodo} className="add-button">
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Date: {todo.date}</p>
                        <p>Priority: {todo.priority}</p>
                        <button onClick={() => editTodo(index)} className="edit-button">
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(index)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
