export class RestaurantsView {
    constructor(restaurants) {
        this.restaurants = this.majRestaurants(restaurants);
        this.jour = "";
    }

    majRestaurants(restaurants) {
        const now = new Date();
        this.jour = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
        const heure = now.getHours();
        const minutes = now.getMinutes();

        return restaurants.map((resto) => {

            const thing = {};
            thing.name = resto.name;
            thing.img_url = resto.imgName;
            thing.phone = resto.phone;

            thing.isOpenned = resto.horaires[this.jour].isOpened;
            if (thing.isOpenned) {
                thing.horaires = resto.horaires[this.jour].horaires;
                const horaires = resto.horaires[this.jour].horairesData;
                let horaireText = "";
                if (horaires.length > 1) {
                    horaireText = horaires[1];
                } else {
                    horaireText = horaires[0];
                }

                if (Number(horaireText.split("-")[1]) <= Number(`${heure}.${minutes}`)) thing.isOpenned = false;
            }
            return thing;

        });
    }

    displayAvailableRestaurantsInPriority(restaurants) {
        const openResto = [];
        const closedResto = [];
        restaurants.forEach((resto) => {
            if (resto.isOpenned) {
                openResto.push(resto);
            } else {
                closedResto.push(resto);
            }
        })
        return openResto.concat(closedResto);
    }

    render() {
        const classedRestaurants = this.displayAvailableRestaurantsInPriority(this.restaurants)
        const el = document.getElementById('root');
        if (el) {
            el.innerHTML = "";

            const restaurantsContainer = document.createElement("div");
            restaurantsContainer.className = "restaurants";

            // header
            const restaurantHeader = document.createElement("div");
            restaurantHeader.className = "restaurants__header bg_head";

            const titre = document.createElement("p");
            titre.textContent = "Restaurants";

            restaurantHeader.appendChild(titre);
            restaurantsContainer.appendChild(restaurantHeader);

            // content
            const restaurantContent = document.createElement("div");
            restaurantContent.className = "restaurants__content bg_main";

            let cpt = 0;
            classedRestaurants.forEach((resto) => {
                const fiche = document.createElement("div");
                fiche.className = `restaurants__fiche ${resto.isOpenned ? 'fade-in' : 'resto-close fade-in'}`;

                const img = document.createElement("img");
                img.src = `/public/assets/images/restaurants/${resto.img_url}`;
                fiche.appendChild(img);

                const text = document.createElement("div");
                text.className = "restaurants__fiche__text";

                const name = document.createElement("div");
                name.className = "restaurants__fiche--name";

                const isOpen = document.createElement("div");
                isOpen.className = `${resto.isOpenned ? "ball green" : "ball red"}`;

                const titre = document.createElement("p");
                titre.className = "restaurants__fiche__name--titre";
                titre.textContent = resto.name;

                name.appendChild(isOpen);
                name.appendChild(titre);
                text.appendChild(name);

                const horaires = document.createElement("p");
                horaires.className = "restaurants__fiche__name--horaires";
                horaires.textContent = resto.horaires ? resto.horaires : "fermé";
                text.appendChild(horaires);

                const jour = document.createElement("div");
                jour.className = "restaurants__fiche__name--jour";
                const jourPara = document.createElement("p");
                jourPara.textContent = this.jour;
                jour.appendChild(jourPara);
                text.appendChild(jour);

                const phone = document.createElement("p");
                phone.textContent = this.getPhoneFormat(resto.phone);
                text.appendChild(phone);

                fiche.appendChild(text);

                setTimeout(() => {
                    restaurantContent.appendChild(fiche);
                }, cpt);

                cpt += 100; 

            });


            restaurantsContainer.appendChild(restaurantContent);
            el.appendChild(restaurantsContainer);
        }
    }

    getPhoneFormat(val) {
        const cleanVal = val.split("").filter((cell) => cell !== " ").join("");
        const phoneArr = cleanVal.split("");
        let newPhoneArr = phoneArr.map((cell, i) => {
            if (i % 2 !== 0) {
                return i === phoneArr.length - 1 ? cell : `${cell}.`
            } else {
                return cell;
            }
        });

        return newPhoneArr.join("");
    }


}

