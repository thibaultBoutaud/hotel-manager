export class HomeCtrl {

    constructor(homeView, seoManager, homeEventBinder, dateHelper, taskHelper, modelAgendaPlanning, decompteEvent, composantAgendaRdv, homeAlertView, taskServices, meteoServices, homeCoursesView) {
        this.homeView = homeView;
        this.seoManager = seoManager;
        this.homeEventBinder = homeEventBinder;
        this.dateHelper = dateHelper;
        this.taskHelper = taskHelper;
        this.modelAgendaPlanning = modelAgendaPlanning;
        this.decompteEvent = decompteEvent;
        this.composantAgendaRdv = composantAgendaRdv;
        this.homeAlertView = homeAlertView;
        this.taskServices = taskServices;
        this.meteoServices = meteoServices;
        this.homeCoursesView = homeCoursesView;

        this.homeEventBinder.setController(this);
    }

    async show() {
        const meteoData = await this.meteoServices.getDataMeteo();
        this.homeView.render();
        await this.showDecompteEvent(meteoData);
        await this.show3NextRdvs();
        await this.showAlerts();
        await this.showCourses();
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Accueil');
        this.homeEventBinder.addEventListeners();
    }

    async showDecompteEvent(meteoData) {
        const tasks = await this.getTasks();
        const events = this.taskHelper.getEvents(tasks);
        const eventsSortedByDate = this.dateHelper.sortTasksByDate(events);
        const nextEvent = this.taskHelper.getNextEvent(eventsSortedByDate);
        this.decompteEvent.render(nextEvent, meteoData);
    }

    async show3NextRdvs() {
        const tasks = await this.getTasksByAuth();
        const rdvs = this.taskHelper.getRdvs(tasks);
        const rdvsSortedByDate = this.dateHelper.sortTasksByDate(rdvs);
        const first3Rdvs = this.taskHelper.get3FirstRdvs(rdvsSortedByDate);
        this.composantAgendaRdv.render(first3Rdvs);
    }

    async showAlerts() {
        const alerts = await this.getAlerts();
        this.homeAlertView.render(alerts);
    }

    async showCourses() {
        const courses = await this.getAllUsersCourses();
        this.homeCoursesView.render(courses);
    }

    async getTasks() {
        const res = await this.taskServices.getTasks();
        return res.data.tasks;
    }

    async getTasksByAuth() {
        const res = await this.taskServices.getTasksByAuth();
        return res.data.tasks;
    }

    async getAlerts() {
        const res = await this.taskServices.getAlerts();
        return res.data.alerts;
    }

    async getAllUsersCourses() {
        const res = await this.taskServices.getAllUsersCourses();
        return res.data.courses;
    }
}