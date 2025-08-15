import { HOST } from "../../host.js";

export class BirthDaysServices {

    async getBirthDaysByAuth() {
        try {
            const preRes = await fetch(`${HOST}/api/birthDays`, {
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

    async addBirthDay(data) {
        try {
            const preRes = await fetch(`${HOST}/api/birthdays`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: data.name,
                    lastName: data.lastName,
                    date: data.date,
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

    async deleteBirthDay(id) {
        try {
            const preRes = await fetch(`${HOST}/api/birthdays/${id}`, {
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


}