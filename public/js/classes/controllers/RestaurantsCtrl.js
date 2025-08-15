export class RestaurantsCtrl{

    constructor(view, seoManager){
        this.view = view;
        this.seoManager = seoManager;
    }

    show(){
        this.view.render();
        this.seoManager.setTitle('Ecorcerie Gestionnaire - Restaurants'); 
    }
}