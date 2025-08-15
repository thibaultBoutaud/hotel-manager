export class HomeCoursesView {

    constructor() {
        this.yearMonth = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ];
    }

    render(data) {
        const el = document.querySelector(".home__bodyContainer__alarmes__courses");
        if (el) {
            const coursesContainer = document.createElement("div");
            coursesContainer.className = "alertContainer";
            for (let i = 0; i < data.length; i++) {
                const alert = document.createElement("div");
                alert.className = "alert";
                const ico = document.createElement("i");
                ico.className = "fa-solid fa-truck-fast courses-green";
                const name = document.createElement("p");
                name.textContent = data[i].name;
                const dateEl = document.createElement("p");
                const realDate = new Date(data[i].date);
                const year = realDate.getFullYear();
                const month = realDate.getMonth();
                const day = realDate.getDate();
                const deleteIco = document.createElement("i");
                deleteIco.className="fa-solid fa-ban deleteCourse"; 
                deleteIco.setAttribute("data-id", data[i].id);
                dateEl.textContent = `${day} ${this.yearMonth[month]} ${year}`;
                alert.appendChild(ico);
                alert.appendChild(name);
                alert.appendChild(dateEl);
                alert.appendChild(deleteIco);
                coursesContainer.appendChild(alert);
            }
            el.appendChild(coursesContainer);
        }
    }
}