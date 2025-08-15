export class AgendaYearEventBinder {

    constructor(view) {
        this.view = view;
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
        if (e.target.classList.contains("numero")) {
            const dateStr = e.target.getAttribute("data-date");
            const date = new Date(dateStr);
            this.controller.agendaWeekModel.stateDateMs = date.getTime();
            this.controller.show();
        }

        else if (e.target.classList.contains("agendaYearTurnLeft")) {
            this.controller.agendaYearModel.previousWeek();
            const year = this.controller.agendaYearModel.stateYear;
            const data = this.controller.agendaYearModel.getAgendaPerYear(year);
            this.controller.yearView.render(data);
        }

        else if (e.target.classList.contains("agendaYearTurnRight")) {
            this.controller.agendaYearModel.nextWeek();
            const year = this.controller.agendaYearModel.stateYear;
            const data = this.controller.agendaYearModel.getAgendaPerYear(year);
            this.controller.yearView.render(data);
        }

        else if (e.target.classList.contains("agendYear__console__today")) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const data = this.controller.agendaYearModel.getAgendaPerYear(currentYear);
            this.controller.yearView.render(data);
        }
    }


}