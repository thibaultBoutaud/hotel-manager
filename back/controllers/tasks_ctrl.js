
const pool = require("../connection/sqlConnection");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs').promises;


exports.readTasks = async (req, res, next) => {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks ORDER BY _index');
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ tasks: tasks });
    } catch (err) {
        return res.status(500).json({ err });
    }
};


exports.readCourses = async (req, res, next) => {
    try {
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE type = ? ORDER BY _index', ["courses"]);
        if (tasks.length === 0) {
            return res.status(200).json({ courses: [] });
        }
        return res.status(200).json({ courses: tasks });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.readAlerts = async (req, res, next) => {
    console.log("ctrl alerts")
    try {
        const type = "alert";
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE type = ? ORDER BY _index', [type]);
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ alerts: tasks });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.readOneTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ tasks: tasks[0] });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.readTasksByAuth = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const [tasks] = await pool.execute('SELECT * FROM tasks WHERE user_id = ? ORDER BY _index', [userId]);
        if (tasks.length === 0) {
            return res.status(200).json({ tasks: [] });
        }
        return res.status(200).json({ tasks: tasks });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { name, description, date, type, author_id, owner_id, author_img_url } = req.body;
        const data = {
            id: uuidv4(),
            name: name || null,
            description: description || null,
            date: date || null,
            type: type || null,
            author_id: author_id || null,
            owner_id: owner_id || null,
            author_img_url: author_img_url
        }

        data.user_id = owner_id;

        const keys = Object.keys(data).filter((key) => data[key] !== null);
        console.log(keys);
        const values = keys.map((key) => data[key]);
        console.log(values);
        const placeholder = keys.map(() => "?").join(", ");
        console.log(placeholder);

        await pool.execute(`INSERT INTO tasks (${keys.join(", ")}) VALUES(${placeholder})`, values);
        return res.status(200).json({ msg: "task created" })

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const [task] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [taskId]);
        if (req.auth.userId !== task[0].user_id) {
            return res.status(400).json({ msg: "action non authorisée" });
        }
        const { name, description, type } = req.body;

        const data = {
            name: name || null,
            description: description || null,
            type: type || null
        }

        const keys = Object.keys(data).filter((key) => data[key] !== null);
        const values = Object.values(data).filter((value) => value !== null);
        const placeholder = keys.map((key) => `${key} = ?`).join(", ");
        values.push(taskId);

        await pool.execute(`UPDATE tasks SET ${placeholder} WHERE ID = ?`, values);
        return res.status(200).json({ msg: "task updated" })

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const [task] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [taskId]);

        if (req.auth.userId !== task[0].user_id) return res.status(400).json({ msg: "action non authorisée" })
        await pool.execute(`DELETE FROM tasks WHERE id = ?`, [taskId]);
        return res.status(200).json({ msg: "task deleted" });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

