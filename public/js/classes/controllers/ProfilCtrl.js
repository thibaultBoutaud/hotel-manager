export class ProfilCtrl {

    constructor(view, seoManager, eventBinder, authServices, miseAJourAuth, profilFormView, birthDaysServices) {
        this.view = view;
        this.seoManager = seoManager;
        this.eventBinder = eventBinder;
        this.authServices = authServices;
        this.miseAJourAuth = miseAJourAuth;
        this.profilFormView = profilFormView;
        this.birthDaysServices = birthDaysServices;

        this.eventBinder.setController(this);
    }

    async show() {
        const data = await this.authServices.getAuth();
        this.view.render(data);
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Profil'); 
        this.eventBinder.addEventListeners();
    }
}