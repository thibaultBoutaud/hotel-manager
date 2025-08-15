export class MeteoServices {
    constructor() {
        this.apiKey = "dc8c9152e8adaad0ec8bf635818c0d42";
        this.ville = "Ligugé,FR";
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.ville}&units=metric&lang=fr&appid=${this.apiKey}`;
    }

    async getDataMeteo() {
        const preRes = await fetch(this.url);
        const res = await preRes.json();
        if (res) return res;
    }



}