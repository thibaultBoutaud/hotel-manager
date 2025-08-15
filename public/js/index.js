// composants
import { DecompteEvents } from "./classes/components/DecompteEvents.js";
import { HomeAgendaRdv } from "./classes/components/HomeAgendaRdv.js";
import { WeekView } from "./classes/components/WeekView.js";
import { YearView } from "./classes/components/YearView.js";
import { PlanningView } from "./classes/components/PlanningView.js";
import { MiseAJourAuth } from "./classes/components/MiseAJourAuth.js";
import { HomeAlertView } from "./classes/components/HomeAlertView.js";
import { ProfilFormView } from "./classes/components/ProfilFormView.js";
import { HomeCoursesView } from "./classes/components/HomeCoursesView.js";

// datas
import { dailyPlanningTasks } from "./data/dailyPlanningTasks.js";
import { restaurants } from "./data/restaurants.js";

// utils
import { DateHelper } from "./classes/utils/DateHelper.js";
import { TaskHelper } from "./classes/utils/TaskHelper.js";

// services
import { UserServices } from "./classes/services/UserServices.js";
import { TaskServices } from "./classes/services/TaskServices.js";
import { AuthServices } from "./classes/services/AuthServices.js";
import { MeteoServices } from "./classes/services/MeteoServices.js";
import { BirthDaysServices } from "./classes/services/BirthDaysServices.js";

// core
import { NavHighLighter } from "./classes/core/NavHighLighter.js";
import { NavigationManager } from "./classes/core/NavigationManager.js";
import { NavigationEventBinder } from "./classes/core/NavigationEventBinder.js";
import { SEOManager } from "./classes/core/SEOManager.js";

// models
import { AuthModel } from "./classes/models/AuthModel.js";
import { AgendaPlanning } from "./classes/models/AgendaPlanning.js";
import { AgendaWeek } from "./classes/models/AgendaWeek.js";
import { AgendaYear } from "./classes/models/AgendaYear.js";
import { DailyPlanningModel } from "./classes/models/DailyPlanningModel.js";
import { GouvernanteModel } from "./classes/models/GouvernanteModel.js";

// views
import { HomeView } from "./classes/views/HomeView.js";
import { AuthView } from "./classes/views/AuthView.js";
import { AgendaView } from "./classes/views/AgendaView.js";
import { DailyPlanningView } from "./classes/views/DailyPlanningView.js";
import { RestaurantsView } from "./classes/views/restaurantsView.js";
import { ProfilView } from "./classes/views/ProfilView.js";
import { GouvernanteView } from "./classes/views/GouvernanteView.js";

// ctrls
import { HomeCtrl } from "/public/js/classes/controllers/HomeCtrl.js";
import { AuthCtrl } from "./classes/controllers/AuthCtrl.js";
import { AgendaCtrl } from "./classes/controllers/AgendaCtrl.js";
import { DailyPlanningCtrl } from "./classes/controllers/DailyPlanningCtrl.js";
import { RestaurantsCtrl } from "./classes/controllers/RestaurantsCtrl.js";
import { HeaderCtrl } from "./classes/controllers/HeaderCtrl.js";
import { ProfilCtrl } from "./classes/controllers/ProfilCtrl.js";
import { GouvernanteCtrl } from "./classes/controllers/GourvernanteCtrl.js";

// eventBinder
import { HomeEventBinder } from "./classes/eventBinders/homeEventBinder.js";
import { AuthEventBinder } from "./classes/eventBinders/AuthEventBinder.js";
import { AgendaEventBinder } from "./classes/eventBinders/AgendaEventBinder.js";
import { AgendaWeekEventBinder } from "./classes/eventBinders/AgendaWeekEventBinder.js";
import { AgendaYearEventBinder } from "./classes/eventBinders/AgendaYearEventBinder.js";
import { AgendaPlanningEventBinder } from "./classes/eventBinders/AgendaPlanningEventBinder.js";
import { DailyPlanningEventBinder } from "./classes/eventBinders/DailyPlanningEventBinder.js";
import { HeaderEventBinder } from "./classes/eventBinders/HeaderEventBinder.js";
import { ProfilEventBinder } from "./classes/eventBinders/ProfilEventBinder.js";
import { GouvernanteEventBinder } from "./classes/eventBinders/GouveranteEventBinder.js";

const seoManager = new SEOManager();
const userServices = new UserServices();
const authServices = new AuthServices(userServices);
const taskServices = new TaskServices();
const meteoServices = new MeteoServices();
const birthDaysServices = new BirthDaysServices();

const dateHelper = new DateHelper();
const taskHelper = new TaskHelper();
const agendaPlanning = new AgendaPlanning(dateHelper);

const decompteEvents = new DecompteEvents();
const homeAgendaRdv = new HomeAgendaRdv();
const homeAlertView = new HomeAlertView();
const homeCoursesView = new HomeCoursesView();

const miseAJourAuth = new MiseAJourAuth(authServices);
miseAJourAuth.init();

const headerEventBinder = new HeaderEventBinder(userServices, miseAJourAuth);
const headerCtrl = new HeaderCtrl(headerEventBinder);
headerCtrl.init();

const homeView = new HomeView();
const homeEventBinder = new HomeEventBinder(homeView);
const homeCtrl = new HomeCtrl(homeView, seoManager, homeEventBinder, dateHelper, taskHelper, agendaPlanning, decompteEvents, homeAgendaRdv, homeAlertView, taskServices, meteoServices, homeCoursesView);

const authView = new AuthView();
const authModel = new AuthModel(userServices);
const authEventBinder = new AuthEventBinder(authView);
const authCtrl = new AuthCtrl(authView, seoManager, authEventBinder, authModel, authServices, miseAJourAuth);

const agendaView = new AgendaView();
const weekView = new WeekView();
const yearView = new YearView();
const planningView = new PlanningView();
const agendaWeekModel = new AgendaWeek(dateHelper, birthDaysServices);
const agendaYearModel = new AgendaYear(dateHelper);
const agendaEventBinder = new AgendaEventBinder(agendaView);
const agendaWeekEventBinder = new AgendaWeekEventBinder(weekView);
const agendaYearEventBinder = new AgendaYearEventBinder(yearView);
const agendaPlanningEventBinder = new AgendaPlanningEventBinder(planningView);
const agendaCtrl = new AgendaCtrl(agendaView, seoManager, agendaEventBinder, authServices, weekView, agendaWeekEventBinder, taskServices, agendaWeekModel, yearView, planningView, agendaYearEventBinder, agendaPlanningEventBinder, agendaYearModel, agendaPlanning);

const dailyPlanningView = new DailyPlanningView();
const dailyPlanningModel = new DailyPlanningModel(dailyPlanningTasks);
const dailyPlanningEventBinder = new DailyPlanningEventBinder(dailyPlanningView);
const dailyPlanningCtrl = new DailyPlanningCtrl(dailyPlanningView, seoManager, dailyPlanningEventBinder, dailyPlanningModel);

const restaurantsView = new RestaurantsView(restaurants);
const restaurantsCtrl = new RestaurantsCtrl(restaurantsView, seoManager);

const profilView = new ProfilView();
const profilFormView = new ProfilFormView();
const profilEventBinder = new ProfilEventBinder(profilView);
const profilCtrl = new ProfilCtrl(profilView, seoManager, profilEventBinder, authServices, miseAJourAuth, profilFormView, birthDaysServices);

const gouvernanteView = new GouvernanteView();
const gouvernanteEventBinder = new GouvernanteEventBinder(gouvernanteView);
const gouvernanteModel = new GouvernanteModel();
const gouvernanteCtrl = new GouvernanteCtrl(gouvernanteView, seoManager, gouvernanteEventBinder, gouvernanteModel);

const routes = {
    "home": homeCtrl,
    "auth": authCtrl,
    "agenda": agendaCtrl,
    "planning": dailyPlanningCtrl,
    "restaurants": restaurantsCtrl,
    "profil": profilCtrl,
    "gouvernante": gouvernanteCtrl
}

const navHighLighter = new NavHighLighter();
const navigationManager = new NavigationManager(routes, navHighLighter);
navigationManager.init();

const navigationEventBinder = new NavigationEventBinder(navigationManager);
navigationEventBinder.bindClickLinks();

