export class HomeAlertView {

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


    render(alerts = []) {
        const el = document.querySelector(".home__bodyContainer__alarmes__alerts");
        if (el) {
            const alertContainer = document.createElement("div");
            alertContainer.className = "alertContainer";
            for (let i = 0; i < alerts.length; i++) {
                const alert = document.createElement("div");
                alert.className = "alert";
                const ico = document.createElement("i");
                ico.className = "fa-solid fa-triangle-exclamation alert-red";
                const name = document.createElement("p");
                name.textContent = alerts[i].name;
                const dateEl = document.createElement("p");
                const realDate = new Date(alerts[i].date);
                const year = realDate.getFullYear();
                const month = realDate.getMonth();
                const day = realDate.getDate();
                dateEl.textContent = `${day} ${this.yearMonth[month]} ${year}`;
                const deleteIco = document.createElement("i");
                deleteIco.className = "fa-solid fa-ban deleteAlert";
                deleteIco.setAttribute("data-id", alerts[i].id);
                alert.appendChild(ico);
                alert.appendChild(name);
                alert.appendChild(dateEl);
                alert.appendChild(deleteIco);
                alertContainer.appendChild(alert);
            }
            el.appendChild(alertContainer);
        }
    }

}