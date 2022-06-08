// Project Input Class
import { Component } from "./base-component.js"
import { ValidatorOb } from "../util/validation.js"
import { projectState } from "../state/project-state.js"
import { Autobind } from "../decorators/autobind.js"
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this._onSubmitHander);
    }
    renderContent() {}

    private _clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    private _gatherUserData(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enterPeople = this.peopleInputElement.value;

      const titleValidator = new ValidatorOb(enteredTitle.trim(), true, 2);
      const descValidator = new ValidatorOb(enteredDescription.trim(), true, 3);
      const peopleValidator = new ValidatorOb(+enterPeople, true);

      if (
        titleValidator.validate() &&
        descValidator.validate() &&
        peopleValidator.validate()
      ) {
        return [enteredTitle, enteredDescription, +enterPeople];
      } else {
        alert("please enter valid input");
        return;
      }
    }

    @Autobind
    private _onSubmitHander(event: Event) {
      event.preventDefault();
      const userData = this._gatherUserData();
      if (Array.isArray(userData)) {
        const [title, description, people] = userData;
        projectState.addProject(title, description, people);
        this._clearInputs();
      } else {
        console.log("no valid data");
      }
    }
  }

