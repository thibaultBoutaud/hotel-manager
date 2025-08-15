import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@4/build/pdf.mjs";

export class GouvernanteEventBinder {
    constructor(view) {
        this.view = view;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundChangeTask = this.handleChangeTask.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
        document.removeEventListener('change', this.boundChangeTask);
        document.addEventListener('change', this.boundChangeTask);
    }

    async handleClickTask(e) {
        if (e.target.classList.contains("btn-capture")) {
            e.preventDefault();
            this.dllDiv("zoneToDll");
        }
    }

    async handleChangeTask(e) {
        if (e.target.name !== "planningGouvernante") return;

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const file = e.target.files?.[0];
        if (!file) return;

        // get jsonData from excel
        const jsonData = await this.getJsonFromExcel(file);

        // get Date and type
        const datePlanning = this.getDate(jsonData);

        // get jsonData sorted
        const reduceData = this.reduceDataByRoom(jsonData);

        const sortData = this.sortDataByRoom(reduceData);


        const finalData = datePlanning;
        finalData.rooms = sortData;

        this.controller.showGourvernante(finalData);
    }


    dllDiv(idDiv) {
        const div = document.getElementById(`${idDiv}`);

        html2canvas(div).then(canvas => {
            // Convertit en image
            const imgData = canvas.toDataURL('image/png');

            // Crée un lien de téléchargement
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'capture_div.png';
            link.click();
        });
    }

    sortDataByRoom(data) {
        return data.sort((a, b) => a.roomNum - b.roomNum)
    }

    getDate(data) {
        const title = data[1]["Rapport pour: Le Domaine de l'Ecorcerie"];
        const arrTitle = title.split(" ");
        const preDate = arrTitle[5];
        const [day, month, year] = preDate.split("/").map(v => parseInt(v, 10));
        const date = new Date(year, month - 1, day);
        return { date: date };
    }

    reduceDataByRoom(data) {
        const newData = [];

        let isWhatIWant = false;
        let isCheckIns = false;
        let isSurPlace = false;

        for (let i = 0; i < data.length; i++) {
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Check-ins" || data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Sur place") {
                isWhatIWant = true;
            }
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Check-ins") {
                isCheckIns = true;
                isSurPlace = false;
            }
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Sur place") {
                isCheckIns = false;
                isSurPlace = true;
            }
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Check-outs") {
                isWhatIWant = false;
            }
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Chambre") continue;
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Check-ins") continue;
            if (data[i]["Rapport pour: Le Domaine de l'Ecorcerie"] === "Sur place") continue;

            const values = Object.values(data[i]);
            if (isWhatIWant) {
                newData.push({
                    type: isCheckIns ? "Checks-ins" : "Sur place", roomNum: values[1], clientName: values[3], clientPhone: values[4], nbClient: values[5], source: values[6], extras: values[8]
                })
            }

        }
        return newData;
    }

    async getJsonFromExcel(file) {

        const name = file.name.toLowerCase();
        const isXLSX = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || name.endsWith(".xlsx");
        const isXLS = file.type === "application/vnd.ms-excel" || name.endsWith(".xls");

        try {
            if (isXLSX || isXLS) {
                // Charger SheetJS à la volée
                const XLSX = await import("https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm");

                const buf = await file.arrayBuffer();
                const wb = XLSX.read(buf, { type: "array", cellDates: true });

                // Convertir la première feuille en tableau d'objets
                const sheetName = wb.SheetNames[0];
                const ws = wb.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(ws, { defval: null }); // defval pour valeurs vides

                return jsonData;
            }

            alert("Type de fichier non pris en charge. Choisis un .xlsx, .xls ou .pdf.");
        } catch (err) {
            console.error(err);
            alert(`Erreur : ${err.message || err}`);
        }
    }
}
