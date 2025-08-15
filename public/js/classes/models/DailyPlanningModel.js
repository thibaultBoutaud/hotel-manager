

export class DailyPlanningModel {
    constructor(tasksPlanningData) {
        this.tasksPlanningData = tasksPlanningData;
        this.isPlanningStarted = false;
        this.planning = {};
        this.isFinished = true;
        this.service = "morning";
    }

    toggleTask(index) {
        this.planning[this.service][index].isDone = !this.planning[this.service][index].isDone;
    }

    checkIfisFinished() {
        this.isFinished = true;
        for (let i = 0; i < this.planning.length; i++) {
            if (!this.planning[i].isDone) {
                this.isFinished = false;
                break;
            }
        }
    }

    resetService(service) {
        this.planning[service].map((serviceTask) => serviceTask.isDone = false);
    }

    getData() {
        return this.planning[this.service];
    }

    init() {
        this.planning = this.tasksPlanningData;
    }


}