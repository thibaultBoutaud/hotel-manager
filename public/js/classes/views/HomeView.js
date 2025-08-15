export class HomeView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="home">

                <div class="banner bgImg-blue">
                    <div class="banner__container">
                          <div class="banner__text">
                             <p class="banner__text--title">I'm doing my part</p>
                             <p>They’re doing their part. Are you? Join the Mobile Infantry and save the world. Service guarantees citizenship.</p>
                            <p>Would you like to now more ?</p>                         
                             </div>
                          <div class="banner__container__button">
                            <div class="btn">Join</div>
                          </div>
                    </div>
                </div>

                <div class="home__webSites">
                    <p class="home__webSites--title">Sites webs</p>
                    <div class="home__webSites--container">
                        <a href="https://www.amen.fr/" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/amen.png"/>
                                <p>Amen</p>
                            </div>
                        </a>
                        <a href="https://amenitiz.com/fr/" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/amenitiz.png"/>
                                 <p>Amenitiz</p>
                            </div>
                        </a>
                        <a href="https://www.expedia.com" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/expedia.png"/>
                                <p>Expedia</p>
                            </div>
                        </a>
                          <a href="https://www.booking.com" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/booking.png"/>
                                <p>Bokking</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/youtube.png"/>
                                 <p>Youtube</p>
                            </div>
                        </a>
                        <a href="https://chatgpt.com" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/gpt.webP"/>
                                 <p>Gpt</p>
                            </div>
                        </a>
                        <a href="https://www.canva.com" target="_blank">
                             <div>
                                <img src="/public/assets/images/icons/canva.png"/>
                                <p>Canva</p>
                            </div>
                        </a>
                
                    </div>
                </div>

                <div class="home__bodyContainer">
                    <div class="home__bodyContainer__plannings">
                        <div class="home__bodyContainer__plannings__events">
                        </div>
                         <div class="home__bodyContainer__plannings__rdvs">
                        </div>
              
                    </div>
                    <div class="home__bodyContainer__alarmes">
                          <div class="home__bodyContainer__alarmes__alerts">
                          <p>Alerts</p>
                          </div>
                          <div class="home__bodyContainer__alarmes__courses">
                          <p>Courses</p>
                          </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
} 