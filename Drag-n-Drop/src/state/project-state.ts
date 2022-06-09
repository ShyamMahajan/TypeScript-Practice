// Project State Management
import { Project, ProjectStatus } from "../models/project"

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners(fn: Listener<T>) {
      this.listeners.push(fn);
    }
  }

  export class ProjectState extends State<Project> {
    projects: Project[] = [];
    private static _instance: ProjectState;

    constructor() {
      super();
    }
    static getInstance() {
      if (this._instance) {
        return this._instance;
      } else {
        this._instance = new ProjectState();
        return this._instance;
      }
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this._updateListeners();
    }
    moveProject(prjId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === prjId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this._updateListeners();
      }
    }
    private _updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
