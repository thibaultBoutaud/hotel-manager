export class AuthEventBinder {
    constructor(authView) {
        this.authView = authView;
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
        if (e.target.classList.contains("toggleSign")) {
            this.authView.isConnectionPage = !this.authView.isConnectionPage;
            this.authView.render();
        }

        if (e.target.classList.contains("btn-inscription")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const formData = new FormData(form);
            this.controller.inscription(formData);

        }

        if (e.target.classList.contains("btn-connection")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const formData = new FormData(form);
            this.controller.connection(formData);
        }
    }

}