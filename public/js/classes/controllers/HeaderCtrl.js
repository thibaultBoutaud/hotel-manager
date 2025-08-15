export class HeaderCtrl {
    constructor(headerEventBinder) {
        this.headerEventBinder = headerEventBinder;
    }
 
    init() {
        this.headerEventBinder.addEventListeners();
    }
}