export class HomeAgendaRdv {


    render(rdvs) {
        const el = document.querySelector(".home__bodyContainer__plannings__rdvs");
        if (el) {
            const title = document.createElement("p");
            title.textContent = "Next rdvs";
            const ul = document.createElement("ul");
            ul.className = "home__bodyContainer__plannings__rdvs__container";
            for (let i = 0; i < rdvs.length; i++) {
                if (rdvs[i]) {
                    const li = document.createElement("li");
                    const name = document.createElement("p");
                    name.textContent = rdvs[i].name;
                    const date = document.createElement("p");
                    date.textContent = new Date(rdvs[i].date).toLocaleDateString('fr-FR');
                    const deleteIco = document.createElement("i");
                    deleteIco.className = "fa-solid fa-ban deleteRDV";
                    deleteIco.setAttribute("data-id", rdvs[i].id);
                    li.appendChild(name);
                    li.appendChild(date);
                    li.appendChild(deleteIco);
                    ul.appendChild(li);
                }
            }
            el.appendChild(title);
            el.appendChild(ul);
        }
    }
}