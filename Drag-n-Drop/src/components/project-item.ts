// Project Item Class
import { Draggable } from "../models/drag-drop.js"
import { Project} from "../models/project.js"
import { Component } from "./base-component.js"
import { Autobind } from "../decorators/autobind.js"
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private _project: Project;

    get persons() {
      if (this._project.people === 1) {
        return "1 person";
      }
      return `${this._project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this._project = project;

      this.renderContent();
      this.configure();
    }

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this._project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this._project.description;
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {}

    @Autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this._project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
  }

