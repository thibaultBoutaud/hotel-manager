import { HOST } from "../../host.js";

export class TaskServices {



    async getTasks() {
        try {
            const preRes = await fetch(`${HOST}/api/tasks`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async getAlerts() {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/alerts`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async readOneTask(id) {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }
    async getAllUsersCourses() {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/alerts/courses`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }
    

    async createTask(data) {
        try {
            const preRes = await fetch(`${HOST}/api/tasks`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    date: data.date,
                    type: data.type,
                    author_id: data.author_id || null,
                    owner_id: data.owner_id || null,
                    author_img_url: data.author_img_url || null
                }),
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async updateTask(data, id) {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    type: data.type
                }),
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

    async deleteTask(id) {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

        async getTasksByAuth() {
        try {
            const preRes = await fetch(`${HOST}/api/tasks/authTasks`, {
                method: "GET", 
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
            });
            const res = await preRes.json();
            return {
                status: preRes.status,
                ok: preRes.ok,
                data: res
            };
        } catch (err) {
            console.error(err);
        }
    }

}