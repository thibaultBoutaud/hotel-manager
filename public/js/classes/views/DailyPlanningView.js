export class DailyPlanningView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
           <div class="dailyPlanning">
                <div class="dailyPlanning__services">
                <p>Services</p>
                    <div class="dailyPlanning__services__content">
                    <div class="service--morning">
                        <i class="fa-solid fa-mug-saucer serviceI--morning""></i> <p  class="serviceP--morning">Morning</p>
                    </div>
                    <div class="service--afternoon">
                        <i class="fa-solid fa-sun serviceI--afternoon"></i> <p class="serviceP--afternoon">Afternoon</p>
                    </div>
                    <div class="service--evening">
                        <i class="fa-solid fa-moon serviceI--evening"></i> <p serviceP--evening>Evening</p>
                    </div>
                    </div>
                </div> 
                <div class="dailyPlanning__content"></div>  
           </div>
           `;
        }
    }



    renderService(data, service = "morning") {
        const dataByService = data;
        this.renderTasks(dataByService, service)
    }

    renderTasks(data, service) {
        const el = document.querySelector(".dailyPlanning__content");
        if (el) {
            let cpt = 0;
            const title = document.createElement("p");
            title.textContent = `${service} tasks`;

            const btnReset = document.createElement("div");
            btnReset.setAttribute("data-service", service);
            btnReset.className = "btn-reset";
            const resetPara = document.createElement("p");
            resetPara.className="resetPara";
            resetPara.textContent = `Reset ${service} tasks`;
            btnReset.appendChild(resetPara);
            const resetIco = document.createElement("i");
            resetIco.className = "fa-solid fa-rotate-right resetIco"; 
            btnReset.appendChild(resetIco);


            const tasksContainer = document.createElement("div");

            tasksContainer.className = "dailyPlanning__content__tasksContainer";
            for (let i = 0; i < data.length; i++) {
                const task = document.createElement("div");
                if(data[i].isDone){
                    task.className="dark";
                }

                const name = document.createElement("p");
                if (data[i].isDone) name.className = "rayé"
                name.textContent = data[i].name;
                const iconContainer = document.createElement("div");
                iconContainer.className = "dailyPlanningTaskBox"
                if (data[i].isDone) {
                    const icon = document.createElement("i");
                    icon.className = "fa-solid fa-check dPTBi";
                    iconContainer.appendChild(icon);
                }

                task.appendChild(iconContainer);
                task.appendChild(name);

                    tasksContainer.appendChild(task);

            }
            el.appendChild(title);
            el.appendChild(btnReset);
            el.appendChild(tasksContainer);
        }
    }

}