import { HOST } from "../../host.js";

export class WeekView {

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

        this.weekDays = [
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche",
        ]
    }

    renderNavigation(date) {
        const el = document.querySelector(".agendaContent__header");
        if (el) {
            el.innerHTML = `
                  <div class="btn btn-today">Today</div>
                  <div class="agendaContent__header--iconsContainer">
                    <i class="fa-solid fa-angle-left previousWeek"></i> <i class="fa-solid fa-angle-right nextWeek"></i>
                  </div>
                  <p>${this.yearMonth[Number(date.month) - 1]} ${date.year}</p>
            `;
        }
    }

    renderParameters(params) {
        const el = document.querySelector(".agendaContent__body__left");
        if (el) {

            // options pour width 600px
            const option = document.createElement("div");
            option.className = "paramsOptions";
            const optionPara = document.createElement("p");
            optionPara.className = "paramsOptionsp";
            optionPara.textContent = "Options";
            const optionIco = document.createElement("i");
            optionIco.className = "fa-solid fa-align-justify paramsOptionsi";
            option.appendChild(optionPara);
            option.appendChild(optionIco);
            el.appendChild(option);

            const optionContainer = document.createElement("div");
            optionContainer.className = "optionsContainer hiddenOnMobile";

            const header = document.createElement("div");
            header.className = "optionsHeader hiddenOnDesktop";
            const leave = document.createElement("i");
            leave.className = "fa-solid fa-xmark exitOptions";
            header.appendChild(leave);
            optionContainer.appendChild(header);

            const userTitle = document.createElement("p");
            userTitle.className = "agendaContent__body__left--category";
            userTitle.textContent = "Users";

            const ul = document.createElement("ul");
            const users = params.filter((param) => param.name);
            for (let i = 0; i < users.length; i++) {
                const li = document.createElement("li");
                const check = document.createElement("div");
                check.className = "checkBox";
                check.setAttribute("data-userId", users[i].id)
                if (users[i].isSelected) {
                    const i = document.createElement("i");
                    i.className = "fa-solid fa-check checkBox__user";
                    check.appendChild(i);
                }
                const name = document.createElement("p");
                name.textContent = users[i].name;
                const miniAvatar = document.createElement("img");
                miniAvatar.setAttribute("src", `${HOST}/api/images/avatars/${users[i].img_url}`)

                li.appendChild(check);
                li.appendChild(name);
                li.appendChild(miniAvatar);
                ul.appendChild(li);
            };


            optionContainer.appendChild(userTitle);
            optionContainer.appendChild(ul);

            const paramTitle = document.createElement("p");
            paramTitle.className = "agendaContent__body__left--category";
            paramTitle.textContent = "Params";

            const paramUl = document.createElement("ul");

            const bank = document.createElement("li");
            const bankBox = document.createElement("div");
            bankBox.className = "checkBoxParams box-bank";
            if (params.bankHolidays) {
                const i = document.createElement("i");
                i.className = "fa-solid fa-check checkBox__Bank";
                bankBox.appendChild(i);
            }
            const bankPara = document.createElement("p");
            bankPara.textContent = "Bank Holidays";
            bank.appendChild(bankBox);
            bank.appendChild(bankPara);
            paramUl.appendChild(bank);



            const birth = document.createElement("li");
            const birthBox = document.createElement("div");
            birthBox.className = "checkBoxParams box-birth";

            if (params.birthDays) {
                const i = document.createElement("i");
                i.className = "fa-solid fa-check checkBox__birthDay";
                birthBox.appendChild(i);
            }
            const birthPara = document.createElement("p");
            birthPara.textContent = "BirthDays";
            birth.appendChild(birthBox);
            birth.appendChild(birthPara);
            paramUl.appendChild(birth);

            optionContainer.appendChild(paramTitle);
            optionContainer.appendChild(paramUl);
            el.appendChild(optionContainer);
            // modal selector
            const modalContainer = document.createElement("div");
            modalContainer.className = "modalAddContainer";
            el.appendChild(modalContainer);
        }
    }

    renderModel() {
        const el = document.querySelector(".modalAddContainer");
        if (el) {
            el.innerHTML = `
            <div class="modal hidden">
  <div class="modalContent">
    <div class="modal__content__header">
      <h3>Nouvelle tâche</h3>
      <i class="fa-solid fa-square-xmark leaveModal"></i>
    </div>

    <form class="formTask-add">
      <!-- Name -->
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>

      <!-- Type -->
      <div>
        <label for="typeSelect">Type</label>
        <select id="typeSelect" name="type">
          <option value="tasks">Tasks</option>
          <option value="courses">Courses</option>
          <option value="rdvs">Rdvs</option>
          <option value="events">Events</option>
          <option value="projets">Projets</option>
          <option value="dayOff">DayOff</option>
          <option value="alert">Alert</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-submit-addTask">Enregistrer</button>
    </form>
  </div>
</div>

            `;
        }
    }

    renderModalFocus(task) {
        const el = document.querySelector(".modalFocus");
        if (el) {
            const date = new Date(task.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dayNum = date.getDay();
            el.innerHTML = `
                <div class="modalContent" data-id=${task.id}>
                    <div class="modalContent__header">
                        <i class="fa-solid fa-pencil task-update"></i>
                        <i class="fa-solid fa-trash-can task-delete"></i>
                        <i class="fa-solid fa-xmark task-leave"></i>
                    </div>
                    <div class="modalContent__body">
                    <div class="modalContent__body__name">
                            <div class="boxTitle"> </div>
                                <div>
                                  <p>${task.name} [${task.type}]</p>
                                  <p> ${day} ${this.yearMonth[month - 1]} ${year}</p>             
                                </div>
                     </div>

                  ${task.description ? `<div class="modalContent__body__description">
    <i class="fa-solid fa-bars"></i>
    <p>${task.description}</p>
</div>` : ''}

                     
                    </div>
                    <div class="modalContent__footer hidden">
                        <form>
                            <div>
                                <label>Name</label>
                                <input type="text" name="name"/>
                            </div>
                            <div>
                                <label for="description">Description</label>
                                <textarea name="description" id="description"></textarea>
                            </div>
                            <div>
                              <label for="typeSelect">Type</label>
                             <select id="typeSelect" name="type">
                                 <option value="tasks">Tasks</option>
                                 <option value="courses">Courses</option>
                                 <option value="rdvs">Rdvs</option>
                                 <option value="events">Events</option>
                                 <option value="projets">Projets</option>
                              </select>
                         </div>
                           <button type="submit" class="btn btn-updateTask">Update</button>
                        </form>
                    </div>
                </div>
              `;
        }
    }

    renderCalendar(data) {
        const el = document.querySelector(".agendaContent__body__right");
        if (el) {

            data.forEach((cell, index) => {
                const containerSupreme = document.createElement("div");
                containerSupreme.className = "dayFiche";
                let isDayOff = false;
                const tasksCheck = cell.tasksByDay;
                for (let i = 0; i < tasksCheck.length; i++) {
                    if (tasksCheck[i].type === "dayOff") isDayOff = true;
                }
                if (isDayOff) containerSupreme.className = "dayFiche dayOff";

                const titleContainer = document.createElement("div");
                titleContainer.className = "dayFiche--title";
                const day = document.createElement("p");
                day.className = "dayAll";
                day.textContent = this.weekDays[index];
                const dayMini = document.createElement("p");
                dayMini.className = "dayMini";
                dayMini.textContent = this.weekDays[index].split("")[0];
                const number = document.createElement("p");
                number.className = cell.weekDays.isCurrentDay ? "weekNumber currentDay" : "weekNumber";
                number.textContent = cell.weekDays.dayDateNum;
                const date = `${cell.weekDays.year}-${cell.weekDays.month}-${cell.weekDays.dayDateNum}`;
                number.setAttribute("data-date", date);
                titleContainer.appendChild(day);
                titleContainer.appendChild(dayMini);
                titleContainer.appendChild(number);
                containerSupreme.appendChild(titleContainer);

                const ul = document.createElement("ul");
                for (let i = 0; i < 20; i++) {
                    const li = document.createElement("li");
                    if (data[index].tasksByDay[i]) {
                        li.className = `${data[index].tasksByDay[i].bg} task`;
                        li.setAttribute("data-id", data[index].tasksByDay[i].id);
                        const para = document.createElement("p");
                        para.className = "taskPara";
                        para.textContent = data[index].tasksByDay[i].name;
                        if (data[index].tasksByDay[i].type === "birthDays") {
                            // calcul de l'age + affichage
                            const date = data[index].tasksByDay[i].date;
                            const age = this.calculAge(date, cell.weekDays.year);
                            para.innerHTML = `<p>Anniversaire</br>🥳🎂🎈🍾</br> ${data[index].tasksByDay[i].name} ${data[index].tasksByDay[i].last_name}</br> ${age} ans</p>`;
                            li.className = `birthDayBg task`;
                        }
                        if (data[index].tasksByDay[i].author_id) {
                            const img = document.createElement("img");
                            img.className = "taskImg"
                            img.setAttribute("src", `${HOST}/api/images/avatars/${data[index].tasksByDay[i].author_img_url}`);
                            li.appendChild(img);
                        }
                        li.appendChild(para);
                    }
                    ul.appendChild(li);
                }
                containerSupreme.appendChild(ul);
                el.appendChild(containerSupreme);
            });

            const modalFocus = document.createElement("div");
            modalFocus.className = "modalFocus hidden";
            el.appendChild(modalFocus);
        }
    }

    calculAge(date, year) {
        const birthDate = new Date(date);
        const day = birthDate.getDate();
        const month = birthDate.getMonth();
        const today = new Date(year, month, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }


    render(data, params) {
        const el = document.querySelector(".agendaContent");
        if (el) {
            el.innerHTML = `               
                    <div class="agendaContent__header">
                        <!-- mettre la navigation -->
                    </div>

                    <div class="agendaContent__body">
                        <div class="agendaContent__body__left">
                            <!-- mettre les parametres -->
                        </div>

                        <div class="agendaContent__body__right">
                            <!-- mettre le calendar -->
                        </div>
                    </div>
            `;

            this.renderNavigation(data.dateSelected);
            this.renderParameters(params);
            this.renderCalendar(data.weekDays);
            this.renderModel();
        }
    }
}



