// import { getIfisConnected } from "../../services/Auth.js";

export class NavigationManager {

    constructor(routes, navHighLighter) {
        this.routes = routes;
        this.navHighLighter = navHighLighter;

        window.addEventListener('popstate', (event) => {
            const page = event.state?.page || this.getPageFromURL();
            this.navigate(page, null);
        });
    }

    getPageFromURL() {
        const pathname = window.location.pathname;
        const segments = pathname.split("/").filter(Boolean);

        if (segments.length === 1) {
            return segments[0];
        } else if (segments.length === 2) {
            return segments.join("_");
        }
        return null;
    }

    show404() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `<h2>404</h2><p>Page introuvable</p>`
        }
    }

    async navigate(pageKey, push = true) {
        const pageKeyWithoutParams = pageKey.split("?")[0];
        const controller = this.routes[pageKeyWithoutParams];

        // const isUserConnected = await this.checkIfIsConnected();
        // if (!isUserConnected && pageKey!=='auth') return;

        if (!controller) {
            this.show404();
            return;
        }

        if (push) {
            const url = `/${pageKey.replace('_', '/')}`;
            history.pushState({ page: pageKey }, '', url);
        }

        controller.show();
        this.navHighLighter.highlight(pageKey);
    }

    // async checkIfIsConnected() {
    //     const res = await getIfisConnected();
    //     return (res && res.data.isUser) ? true : false;
    // }

    init() {
        const initialPage = this.getPageFromURL() || 'home';
        this.navigate(initialPage, false);
    }
}