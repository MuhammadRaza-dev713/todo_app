const express = require("express");
const Todo = require("../models/Todo"); // ✅ Model name should be capitalized

const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err.message });
  }
});

// POST a new todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text }); // ✅ Capital "T"
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err.message });
  }
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true }); // ✅ Correct method
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err.message });
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id); // ✅ Correct method
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err.message });
  }
});

module.exports = router;
