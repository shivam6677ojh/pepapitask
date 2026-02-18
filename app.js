import express from "express";
const app = express();

// Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory task storage
let tasks = [];
let nextId = 1;

// Simple health/home route (optional)
app.get("/", (req, res) => {
    res.send("Task Manager API is running");
});

// 1. GET /tasks
app.get("/tasks", (req, res) => {
    const { completed } = req.query;

    let result = tasks;

    if (completed !== undefined) {
        if (completed !== "true" && completed !== "false") {
            return res.status(400).json({ error: "completed must be 'true' or 'false'" });
        }

        const completedBool = completed === "true";
        result = tasks.filter((task) => task.completed === completedBool);
    }

    res.json(result);
});

// 2. GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const task = tasks.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

// 3. POST /tasks
app.post("/tasks", (req, res) => {
    const { title, completed } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "'title' is required and must be a string" });
    }

    const task = {
        id: nextId++,
        title,
        completed: completed !== undefined ? Boolean(completed) : false,
    };

    tasks.push(task);

    res.status(201).json(task);
});

// 4. PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;

    const task = tasks.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = Boolean(completed);
    }

    res.json(task);
});

// 5. DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(index, 1);
    res.status(204).send();
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

