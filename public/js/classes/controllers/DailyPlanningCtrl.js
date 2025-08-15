export class DailyPlanningCtrl {

    constructor(view, seoManager, eventBinder, dailyPlanningModel) {
        this.view = view;
        this.seoManager = seoManager;
        this.eventBinder = eventBinder;
        this.dailyPlanningModel = dailyPlanningModel;

        this.dailyPlanningModel.init();
        this.eventBinder.setController(this);
    }

    async show() {
        this.view.render();
        const data = this.dailyPlanningModel.getData();
        this.view.renderService(data, this.dailyPlanningModel.service);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - DailyPlanning');
        this.eventBinder.addEventListeners();
    }

}