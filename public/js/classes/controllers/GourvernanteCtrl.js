export class GouvernanteCtrl {

    constructor(view, seoManager, eventBinder, model,) {
        this.view = view;
        this.seoManager = seoManager;
        this.eventBinder = eventBinder;
        this.model = model;

        this.eventBinder.setController(this);
    }

    async show() {
        this.view.render();
        this.eventBinder.addEventListeners();
    }

    showGourvernante(data) {
        this.view.renderGouvernante(data);
        this.eventBinder.addEventListeners();
    }
} 