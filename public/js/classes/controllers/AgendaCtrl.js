export class AgendaCtrl {

    constructor(agendaView, seoManager, agendaEventBinder, authServices, weekView, agendaWeekEventBinder, taskServices, agendaWeekModel, yearView, planningView, agendaYearEventBinder, agendaPlanningEventBinder, agendaYearModel, agendaPlanning) {
        this.agendaView = agendaView;
        this.seoManager = seoManager;
        this.agendaEventBinder = agendaEventBinder;
        this.authServices = authServices;
        this.weekView = weekView;
        this.agendaWeekEventBinder = agendaWeekEventBinder;
        this.taskServices = taskServices;
        this.agendaWeekModel = agendaWeekModel;
        this.yearView = yearView;
        this.planningView = planningView;
        this.agendaYearEventBinder = agendaYearEventBinder;
        this.agendaPlanningEventBinder = agendaPlanningEventBinder;
        this.agendaYearModel = agendaYearModel;
        this.agendaPlanning = agendaPlanning;

        this.agendaEventBinder.setController(this);
        this.agendaWeekEventBinder.setController(this);
        this.agendaYearEventBinder.setController(this);
        this.agendaPlanningEventBinder.setController(this);

    };

    async show() {


        await this.authServices.init();
        this.agendaWeekModel.setCurrentDateMsState();
        const auth = await this.authServices.getAuth();
        const userSelectedRes = await this.authServices.getUserById(this.authServices.userIdSelected);
        const userSelected = userSelectedRes.data.user;
        const tasksRes = await this.taskServices.getTasks();
        const tasks = tasksRes.data.tasks;
        const tasksFiltered = await this.agendaWeekModel.getTasksFiltered(auth, userSelected, tasks);
        // récupérer les anniversaires si isAnniversaires
        if (this.agendaWeekModel.birthDays) {
            const allBirthDaysRes = await this.agendaWeekModel.birthDaysServices.getBirthDaysByAuth();
            const allBirthDays = allBirthDaysRes.data.birthDays;
            this.agendaWeekModel.birthDaysTasks = allBirthDays;
        }
        const date = new Date(this.agendaWeekModel.stateDateMs);
        const weekData = await this.agendaWeekModel.getAgendaPerWeek(tasksFiltered, date);

        const params = await this.authServices.getUsersStatus();
        params.bankHolidays = this.agendaWeekModel.bankHolidays;
        params.birthDays = this.agendaWeekModel.birthDays; 

        this.agendaView.render();
        this.weekView.render(weekData, params);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Agenda');

        this.agendaEventBinder.addEventListeners();
        this.agendaWeekEventBinder.addEventListeners();
        this.agendaYearEventBinder.addEventListeners();
        this.agendaPlanningEventBinder.addEventListeners();
    }
}