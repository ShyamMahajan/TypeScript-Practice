// Project List Class
import { Component } from "./base-component.js"
import { DragTarget } from "../models/drag-drop.js"
import {  Project, ProjectStatus } from "../models/project.js"
import { ProjectItem } from "../components/project-item.js"
import { projectState } from "../state/project-state.js"
import { Autobind } from "../decorators/autobind.js"
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[] = [];

    constructor(private _type: "active" | "finished") {
      super("project-list", "app", false, `${_type}-projects`);
      this.configure();
      this.renderContent();
    }

    private _renderProjects() {
      const listEl = document.getElementById(
        `${this._type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const project of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, project);
      }
    }

    renderContent() {
      const listId = `${this._type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this._type.toUpperCase() + " PROJECTS";
    }

    configure(): void {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListeners((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this._type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this._renderProjects();
      });
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this._type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }
  }
