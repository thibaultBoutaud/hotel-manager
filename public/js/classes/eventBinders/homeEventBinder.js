export class HomeEventBinder {
    constructor(homeView) {
        this.homeView = homeView;
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
        if (e.target.classList.contains("deleteEvent")) {
            await this.deleteTaskEventManger(e);
            this.controller.show();
        }

        else if (e.target.classList.contains("deleteRDV")) {
            await this.deleteTaskEventManger(e);
            this.controller.show();
        }

        else if (e.target.classList.contains("deleteAlert")) { 
            await this.deleteTaskEventManger(e);
            this.controller.show();
        }
        else if (e.target.classList.contains("deleteCourse")) {
            await this.deleteTaskEventManger(e);
            this.controller.show();
        }
    }

    async deleteTaskEventManger(event) {
        const id = event.target.getAttribute("data-id");
        const res = await this.deleteTask(id);
    }

    async deleteTask(id) {
        const res = await this.controller.taskServices.deleteTask(id);
        return res.data.msg;
    }

}

