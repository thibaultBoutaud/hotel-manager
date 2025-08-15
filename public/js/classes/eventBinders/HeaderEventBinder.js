export class HeaderEventBinder {

    constructor(userServices, miseAJourAuth) {
        this.userServices = userServices;
        this.miseAJourAuth = miseAJourAuth;

        this.boundHandleClickTask = this.handleClickTask.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
    }

    async handleClickTask(e) {
        if (e.target.classList.contains("log-out")) {
            // créer une déconection des cookies https-only
            await this.userServices.logOut();
            await this.miseAJourAuth.init();
        }
    }

}