import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class ProjectStore {
  constructor(store) {
    this.store = store;
    this.entities = [];
  }
  // Observables
  sessionStatus;
  setEntities = entities => {
    return (this.entities = entities);
  };
  handleGet = data => {
    return this.setEntities(data);
  };
  getAll = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/project/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getAllParticipants = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: `/api/get_participants?id=${params.id}`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getApplications = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/project_application/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getFeedback = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/feedback/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getProject = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: `/api/project/${params.id}`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getAnswers = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: `/api/statistics/?id=${params.id}`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  sendFeedback = async params => {
    const sessionPromise = this.store.api.project.sendFeedback(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };
  getQuestions = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/question/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getApp = async id => {
    const sessionPromise = this.store.api.project.getApp({
      id,
      url: `/api/application?project_id=${id}`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  reset = () => {
    this.entities = [];
  };
  deleteProject = async id => {
    const sessionPromise = this.store.api.project.deleteProject(id);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.reset();
  };
  addProject = async params => {
    const sessionPromise = this.store.api.project.addProject(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };
  updateProject = async params => {
    const sessionPromise = this.store.api.project.updateProject(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };

  apply = async id => {
    console.log(id);
    const sessionPromise = this.store.api.project.apply(id);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };
  giveUp = async params => {
    const sessionPromise = this.store.api.giveUp({
      id: params.id,
      url: `/api/project_application/${params.id}/`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  accept = async id => {
    const sessionPromise = this.store.api.accept({
      id,
      url: `/api/project_application/${id}/`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  refuse = async id => {
    const sessionPromise = this.store.api.refuse({
      id,
      url: `/api/project_application/${id}/`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
}

decorate(ProjectStore, {
  entities: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setEntities: action,
  reset: action,
});

export default ProjectStore;
