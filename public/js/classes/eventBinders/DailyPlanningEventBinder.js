export class DailyPlanningEventBinder {

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
        // toggle done/undone
        if (e.target.classList.contains("dailyPlanningTaskBox") || e.target.classList.contains("dPTBi")) {
            const el = e.target.closest(".dailyPlanningTaskBox");
            const container = el.closest(".dailyPlanning__content__tasksContainer");
            const childrenEl = Array.from(container.querySelectorAll(".dailyPlanningTaskBox"));
            const index = childrenEl.indexOf(el);
            this.controller.dailyPlanningModel.toggleTask(index);
            this.controller.show();
        }

        // navigation
        else if (e.target.classList.contains("service--morning") || e.target.classList.contains("serviceI--morning") || e.target.classList.contains("serviceP--morning")) {
            this.controller.dailyPlanningModel.service = "morning";
            this.controller.show();
        }
        else if (e.target.classList.contains("service--afternoon") || e.target.classList.contains("serviceI--afternoon") || e.target.classList.contains("serviceP--afternoon")) {
            this.controller.dailyPlanningModel.service = "afternoon";
            this.controller.show();
        }
        else if (e.target.classList.contains("service--evening") || e.target.classList.contains("serviceI--evening") || e.target.classList.contains("serviceP--evening")) {
            this.controller.dailyPlanningModel.service = "evening";
            this.controller.show();
        }

        // reset
        else if (e.target.classList.contains("btn-reset") || e.target.classList.contains("resetPara") || e.target.classList.contains("resetIco")) {
            const el = e.target.closest(".btn-reset");
            const service = el.getAttribute("data-service");
            this.controller.dailyPlanningModel.resetService(service);
            this.controller.show();
        }

    }
}