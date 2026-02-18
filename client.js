import axios from "axios";


async function main() {
    try {
        // 1. Create a task
        const createResponse = await axios.post("http://localhost:3000/tasks", {
            title: "Learn Axios with Task API",
            completed: false,
        });
        console.log("Created task:", createResponse.data);

        // 2. Fetch all tasks
        const listResponse = await axios.get("http://localhost:3000/tasks");
        console.log("All tasks:");
        console.log(listResponse.data);

        // 3. Fetch only completed=false tasks using query param
        const incompleteResponse = await axios.get(
            "http://localhost:3000/tasks",
            {
                params: { completed: "false" },
            }
        );
        console.log("Incomplete tasks (completed=false):");
        console.log(incompleteResponse.data);

        // 4. Update the task to mark it as completed
        const taskId = createResponse.data.id;
        const updateResponse = await axios.put(
            `http://localhost:3000/tasks/${taskId}`,
            {
                completed: true,
            }
        );
        console.log("Updated task (marked as completed):", updateResponse.data);

        // 5. Fetch the updated task by ID
        const getResponse = await axios.get(
            `http://localhost:3000/tasks/${taskId}`
        );
        console.log("Fetched updated task by ID:", getResponse.data);

        // 6. Delete the task
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        console.log("Deleted task with ID:", taskId);
    } catch (err) {
        console.error("Error calling API with axios:");
        console.error(err.message);
    }
}

main();
