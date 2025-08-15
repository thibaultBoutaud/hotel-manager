export class EventCountdownModel {
    constructor(eventDate) {
        this.eventDate = new Date(eventDate);
    }

    getCountdownParts() {
        const now = new Date();
        const diff = this.eventDate - now;

        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const days =Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = this.getFormatForNumbersWidhtZeroBefore(Math.floor((diff / (1000 * 60 * 60)) % 24));
        const minutes = this.getFormatForNumbersWidhtZeroBefore(Math.floor((diff / (1000 * 60)) % 60));
        const seconds = this.getFormatForNumbersWidhtZeroBefore(Math.floor((diff / 1000) % 60));

        return { days, hours, minutes, seconds };
    }

    toString() {
        const { days, hours, minutes, seconds } = this.getCountdownParts();
        return `${days}j ${hours}h ${minutes}min ${seconds}s`;
    }

    getFormatForNumbersWidhtZeroBefore(number) {
        return number < 10 ? `0${number}` : number;
    }
}