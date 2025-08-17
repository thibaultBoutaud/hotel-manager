export class TaskHelper {

    getEvents(tasks) {
        if(tasks)
        return tasks.filter((task) => task.type === "events");
    }

    getRdvs(tasks) {
        return tasks.filter((task) => task.type === "rdvs");
    }

    getNextEvent(events) {
        const currentDate = new Date();
        for (let i = 0; i < events.length; i++) {
            const eventDate = new Date(events[i].date);
            if (eventDate >= currentDate) {
                return events[i];
                break;
            }
        }
    }

    get3FirstRdvs(rdvs) {
        const arr = [];
        for (let i = 0; i < 3; i++) {
            if (rdvs[i]) arr.push(rdvs[i]);
        }
        return arr;
    }
}