import React, { useEffect, useState } from "react";
import TodoItem from "./component/TodoItem";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      setError("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (text.trim()) {
      try {
        setAdding(true);
        await axios.post("http://localhost:5000/api/todos", { text });
        setText("");
        fetchTodos();
      } catch (err) {
        setError("Failed to add todo.");
      } finally {
        setAdding(false);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      setError("Failed to delete todo.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 transition-all duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📝 Todo App</h1>

      <div className="flex mb-6 gap-3">
        <input
          className="border border-gray-300 p-2 rounded flex-1 outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to do?"
        />
        <button
          className={`px-4 py-2 rounded text-white transition ${
            adding ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={addTodo}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">No todos found. 🎉</div>
      )}
    </div>
  );
}

export default App;
