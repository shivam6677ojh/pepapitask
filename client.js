import axios from "axios";


async function main() {
    try {
        // 1. Create a task
        const createResponse = await axios.post("http://localhost:3000/tasks", {
            title: "Learn Axios with Task API",
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
    } catch (err) {
        console.error("Error calling API with axios:");
        console.error(err.message);
    }
}

main();
