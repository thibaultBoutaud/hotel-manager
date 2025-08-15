export class ProfilEventBinder {
    constructor(profilView) {
        this.profilView = profilView;
        this.boundHandleClickTask = this.handleClickTask.bind(this);
        this.boundHandleChangeTask = this.handleChangeTask.bind(this);
        this.boundHandleInputTask = this.handleInputTask.bind(this);
    }

    setController(controller) {
        this.controller = controller;
    }

    addEventListeners() {
        document.removeEventListener('click', this.boundHandleClickTask);
        document.addEventListener('click', this.boundHandleClickTask);
        document.removeEventListener('change', this.boundHandleChangeTask);
        document.addEventListener('change', this.boundHandleChangeTask);
        document.removeEventListener('input', this.boundHandleInputTask);
        document.addEventListener('input', this.boundHandleInputTask);
    }

    async handleClickTask(e) {
        if (e.target.classList.contains("profilUpdate-name")) {
            this.controller.profilFormView.renderName();
            this.addEventListeners();
        }
        else if (e.target.classList.contains("profilUpdate-password")) {
            this.controller.profilFormView.renderPassword();
            this.addEventListeners();
        }
        else if (e.target.classList.contains("profilUpdate-role")) {
            this.controller.profilFormView.renderRole();
            this.addEventListeners();
        }
        else if (e.target.classList.contains("profilCreateBirthDays")) {
            this.controller.profilFormView.renderAddBirthday();
            this.addEventListeners();
        }

        else if (e.target.classList.contains("profilUpdate-birthdays")) {
            const birthDaysRes = await this.controller.birthDaysServices.getBirthDaysByAuth();
            const birthDays = await birthDaysRes.data.birthDays;
            this.controller.profilFormView.renderUpdateBirthDay(birthDays);
            this.addEventListeners();
        }



        else if (e.target.classList.contains("btn-profil-name")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const name = form.elements['name'].value;
            const formData = new FormData();
            formData.append("name", name);
            const res = await this.controller.authServices.updateUser(formData);
            await this.controller.show();
            await this.controller.miseAJourAuth.init();
        }

        else if (e.target.classList.contains("btn-profil-password")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const oldPassword = form.elements['password-old'].value;
            const newPassword = form.elements['password-new'].value;
            const passwordConfirmation = form.elements['password-confirmation'].value;

            const formData = new FormData();
            formData.append("oldPassword", oldPassword);
            formData.append("newPassword", newPassword);
            formData.append("passwordConfirmation", passwordConfirmation);
            const res = await this.controller.authServices.updatePassword(formData);
            console.log(res);
            await this.controller.miseAJourAuth.init();
            await this.controller.show();
        }

        else if (e.target.classList.contains("btn-profil-role")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const role = form.elements['role'].value;
            const formData = new FormData();
            formData.append("role", role);
            const res = await this.controller.authServices.updateUser(formData);
            await this.controller.miseAJourAuth.init();
            await this.controller.show();
        }

        else if (e.target.classList.contains("btn-profil-birthDay-add")) {
            e.preventDefault();
            const form = e.target.closest("form");
            const name = form.elements['name'].value;
            const lastName = form.elements['lastName'].value;
            const year = Number(form.elements['birthDay-year'].value);
            const month = Number(form.elements['birthDay-month'].value) - 1;
            const date = Number(form.elements['birthDay-date'].value);
            const fullDate = new Date(Date.UTC(year, month, date));
            const data = {
                name: name,
                lastName: lastName,
                date: fullDate
            }

            form.reset();
            // definir la bdd birthDay + service // controller le format et ensuite renvoyer une réponse ui
            const res = await this.controller.birthDaysServices.addBirthDay(data);
            await this.controller.miseAJourAuth.init();
            await this.controller.show();
        }
        else if (e.target.classList.contains("delete-birthDay")) {
            console.log("deleting birthdaty in process");
            const id = e.target.closest(".fiche-birthDay").getAttribute("data-id");
            console.log(id);
            await this.controller.birthDaysServices.deleteBirthDay(id);
            const birthDaysRes = await this.controller.birthDaysServices.getBirthDaysByAuth();
            const birthDays = await birthDaysRes.data.birthDays;
            this.controller.profilFormView.renderUpdateBirthDay(birthDays);
            this.addEventListeners();
        }

    }

    async handleChangeTask(e) {
        if (e.target.id === "img-avatar") {
            const inputEl = e.target;
            const imgPreview = document.querySelector(".avatar-preview");
            imgPreview.src = URL.createObjectURL(inputEl.files[0]);
            const formData = new FormData();
            formData.append("img_url", inputEl.files[0]);
            await this.controller.authServices.updateUser(formData);
            this.controller.miseAJourAuth.init();
            this.controller.show();
        }
    }

    async handleInputTask(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('.date');
        const input = e.target;
        if (!input.closest(".birthdayInputsContainer")) return;
        const idx = Array.from(inputs).indexOf(input);
        const maxLength = input.maxLength;
        const value = input.value;

        if (value.length >= maxLength) {
            const nextInput = inputs[idx + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

}