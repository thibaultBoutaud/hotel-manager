export class AgendaView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="agenda">
                <div class="agenda__viewSelection">
                    <p class="agenda__viewSelection--title">Views</p>
                    <ul class="agenda__viewSelection__viewContainer">
                        <li class="weekView">
                            <i class="fa-solid fa-calendar-week weekViewi"></i>
                            <p class="weekViewPara">Week</p>
                        </li>
                        <li class="yearView">
                             <i class="fa-solid fa-calendar-days yearViewi"></i>
                             <p class="yearViewPara">Year</p>
                        </li>
                        <li class="planningView">
                             <i class="fa-solid fa-rectangle-list planningViewi"></i>
                             <p class="planningViewPara">Planning</p>
                        </li>
                    </ul>
                </div>
                <div class="agendaContent"></div>
            </div>
            `
        }
    }
}