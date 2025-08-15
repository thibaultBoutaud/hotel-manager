export class AgendaYear {
 
    constructor(dateHelper){
        this.dateHelper = dateHelper;
        this.stateYear = null;
    }

    previousWeek() {
        this.stateYear--;
        return this.stateYear;
    }

    nextWeek() {
        this.stateYear++;
        return this.stateYear;
    }

    getAgendaPerYear(year = false) {
        if (!year) year = new Date().getFullYear();
        const daysPerMonths = [31, this.dateHelper.getDaysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentDate = new Date();
        this.stateDateMs = currentDate;

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        return daysPerMonths.map((days, index) => ({
            year,
            month: index + 1,
            days: Array.from({ length: days }, (_, i) => {
                const day = i + 1;
                return {
                    isCurrentDay: year === currentYear && index === currentMonth && day === currentDay,
                    day,

                };
            })
        }));
    }
}

