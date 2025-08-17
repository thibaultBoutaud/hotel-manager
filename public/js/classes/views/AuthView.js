export class AuthView {
    constructor() {
        this.isConnectionPage = true;
    }

    render() {
        const el = document.getElementById("root");
        if (el) {
            this.isConnectionPage ? this.renderConnectionPage(el) : this.renderInscriptionPage(el);
            
        }
    }

    renderConnectionPage(el) {
        if (el) {
            el.innerHTML = ` 
            <div class="auth"> 
                <form id="form-connection">
                    <div class="form__header">
                        <img src="/public/assets/images/logos/employIn.png"/> 
                        <p>Log in to your account</p>
                    </div>
                     <div class="form__body">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="René"/>
                        </div>
                            <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="123Soleil"/>
                        </div>
                    </div>
                    <div class="form__footer">
                        <button class="btn btn-connection">Log in</button>
                        <p>Don't have an account? <span class="bold toggleSign">Sign up</span></p>
                          <div class="form__footer__answer"></div>
                    </div>
                </form>
            </div>
            `;
        }
    }

    renderInscriptionPage(el) {
        if (el) {
            el.innerHTML = ` 
            <div class="auth"> 
                <form id="form-inscription">
                    <div class="form__header">
                        <img src="/public/assets/images/logos/employIn.png"/>
                        <p>Create an account</p>
                    </div>
                     <div class="form__body">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="René"/>
                        </div>
                            <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="123Soleil"/>
                        </div>
                            <div class="form-group">
                            <label>Magic word</label>
                            <input type="text" name="magicWord" placeholder="magicWord"/>
                        </div>
                    </div>
                    <div class="form__footer">
                        <button class="btn btn-inscription">Sign in</button>
                        <p>Already have an account? <span class="bold toggleSign">Log in</span></p>
                      <div class="form__footer__answer"></div>
                    </div>
                </form>
            </div>
            `;
        }
    }

    showSuccess(char) {
        const el = document.querySelector(".form__footer__answer");
        if (el) {
            el.innerHTML = "";
            setTimeout(() => {
                el.classList.remove("success");
                el.innerHTML = "";
            }, [2000]);
            el.classList.add("success");
            const ico = document.createElement("i");
            ico.className = "fa-solid fa-check";
            const para = document.createElement("p");
            para.textContent = char;
            el.appendChild(ico);
            el.appendChild(para);
        }
    }

    showError(char) {
        const el = document.querySelector(".form__footer__answer");
        if (el) {
            el.innerHTML = "";
            setTimeout(() => {
                el.classList.remove("error");
                el.innerHTML = "";
            }, [2000]);
            el.classList.add("error");
            const ico = document.createElement("i");
            ico.className = "fa-solid fa-triangle-exclamation";
            const para = document.createElement("p");
            para.textContent = char;
            el.appendChild(ico);
            el.appendChild(para);
        }
    }
} 