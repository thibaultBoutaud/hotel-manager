const pool = require("../connection/sqlConnection");

async function tasksService() {
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // today à 00:00

    const tasks = await readTasks();

    for (let i = 0; i < tasks.length; i++) {
        const taskDateRaw = new Date(tasks[i].date);
        const taskDate = new Date(taskDateRaw.getFullYear(), taskDateRaw.getMonth(), taskDateRaw.getDate()); // task date à 00:00

        if (taskDate < currentDate && tasks[i].status === 0) {
            await updateStatus(tasks[i].id);
        }
    }
}


async function readTasks() {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks ORDER BY _index');
        return tasks;
    } catch (err) {
        console.error("Error reading tasks:", err);
        return [];
    }
}

async function updateStatus(taskId) {
    try {
        const [result] = await pool.execute(
            'UPDATE tasks SET status = 1 WHERE id = ?',
            [taskId]
        );
        console.log(`✅ Tâche ${taskId} mise à jour`);
    } catch (err) {
        console.error("Erreur updateStatus:", err);
    }
}

module.exports = { tasksService };
