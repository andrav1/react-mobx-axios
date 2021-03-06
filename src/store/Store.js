import createApi from '../services/api';
import DashboardStore from './DashboardStore';
import AuthStore from './AuthStore';
import ProjectStore from './ProjectStore';
import StatisticsStore from './StatisticsStore';

class Store {
  constructor(config) {
    this.config = config;

    this.dashboardStore = new DashboardStore(this);
    this.authStore = new AuthStore(this);
    this.projectStore = new ProjectStore(this);
    this.statsStore = new StatisticsStore(this);

    this.api = createApi({
      config: config.api,
    });
  }
}

export default Store;
