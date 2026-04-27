import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // fetchTodo

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`${API}/todos`);
        const data = await res.json();
        console.log("Todo Data", data);
        setTodos(data);
      } catch (err) {
        console.log("unable to fetch data", err?.message);
      }
    };
    fetchTodo();
  }, []);

  const addTodo = async () => {
    try {
      if (!title) return;
      const res = await fetch(`${API}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTitle("");
    } catch (err) {
      console.error("Unable to create Todo", err?.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/todos/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("unable to delete Todo", err?.message);
    }
  };

  const toggleTodo = (data) => {
    console.log("Toggeled", data);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>TODO App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
