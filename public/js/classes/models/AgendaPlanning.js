export class AgendaPlanning {

    constructor(dateHelper) {
        this.dateHelper = dateHelper;
    }


    async getPlanning(tasks) {
        return this.dateHelper.sortTasksByDate(tasks);
    }

    // modal planning
    async getPlanningTasks(tasks) {
        return this.dateHelper.sortTasksByDate(tasks.filter((task) => task.type === "tasks"));
    }
    // modal planning
    async getPlanningCourses(tasks) {
        return this.dateHelper.sortTasksByDate(tasks.filter((task) => task.type === "courses"));
    }
    // modal planning
    async getPlanningRdvs(tasks) {
        return this.dateHelper.sortTasksByDate(tasks.filter((task) => task.type === "rdvs"));
    }
    // modal planning
    async getPlanningEvents(tasks) {
        return this.dateHelper.sortTasksByDate(tasks.filter((task) => task.type === "events"));
    }
    // modal planning
    async getPlanningProjets(tasks) {
        return this.dateHelper.sortTasksByDate(tasks.filter((task) => task.type === "projets"));
    }
}