export class DateHelper {

    ajouterJours(date, nbJours) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setDate(date.getDate() + nbJours);
        return nouvelleDate;
    }

    sortTasksByDate(tasks) {
        return tasks.sort((a, b) => a.date.localeCompare(b.date));
    }

    getDaysInFebruary(year) {
        if (year === null) throw new Error("Year not set");
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }

    getCurrentDayLetterNum(num) {
        return num === 0 ? 6 : num - 1;
    }

    calculerPaques(annee) {
        const a = annee % 19;
        const b = Math.floor(annee / 100);
        const c = annee % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mois = Math.floor((h + l - 7 * m + 114) / 31);
        const jour = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(annee, mois - 1, jour);
    }

    // convertie une date en string avec format 00-00-00
    convertDateToSTring(date = false) {
        if (date === false) {
            date = new Date();
        }
        
        date = new Date(date);
        const year = date.getFullYear();
        const month = this.getFormatForNumbersWidhtZeroBefore(date.getMonth());
        const day = this.getFormatForNumbersWidhtZeroBefore(date.getDate());
        return `${year}-${month}-${day}`;
    }


    // changer le nom et ne marche probablement plus car un peu diff (month+1 ou month+2)
    async fetchTasksFromApi(tasks, userIdSelected, auth) {
        tasks = tasks.filter((task) => task.user_id === (userIdSelected ? userIdSelected : auth.id));
        tasks = tasks.map((task) => {
            const myDate = new Date(task.date);
            return {
                ...task,
                date: this.convertDateToSTring(myDate)
            }
        });
    }

    checkIfTask(year, month, day, tasks) {
        const matchedTasks = tasks.filter(task => {
            const [taskYear, taskMonth, taskDay] = task.date.split("-").map(Number);
            return taskYear === year && taskMonth === month && taskDay === day;
        });
        return matchedTasks.length ? matchedTasks : null;
    }
}