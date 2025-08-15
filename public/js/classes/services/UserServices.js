import { HOST } from "../../host.js";

export class UserServices {

    async getMyProfil() {
        try {
            const preRes = await fetch(`${HOST}/api/auth/myProfil`, {
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

    async inscription(data) {
        try {
            const preRes = await fetch(`${HOST}/api/auth/inscription`, {
                method: "POST",
                headers: {
                },
                credentials: "include",
                body: data,
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

    async connection(data) {
        try {
            const preRes = await fetch(`${HOST}/api/auth/connection`, {
                method: "POST",
                headers: {
                },
                credentials: "include",
                body: data,
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

    async getIfisConnected(data) {
        try {
            const preRes = await fetch(`${HOST}/api/auth/isConnected`, {
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

    async getUsers() {
        try {
            const preRes = await fetch(`${HOST}/api/auth`, {
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

    async getOneUser(id) {
        try {
            const preRes = await fetch(`${HOST}/api/auth/getOneUser/${id}`, {
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

    async logOut() {
        try {
            const preRes = await fetch(`${HOST}/api/auth/logOut`, {
                method: "POST",
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

    async updateUser(data) { 
        try {
            const preRes = await fetch(`${HOST}/api/auth/update`, {
                method: "PUT",
                headers: {
                },
                credentials: "include",
                body: data,
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

        async updatePassword(data) { 
        try {
            const preRes = await fetch(`${HOST}/api/auth/updatePassword`, {
                method: "PUT",
                headers: {
                },
                credentials: "include",
                body: data,
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