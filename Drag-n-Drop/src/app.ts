//autobind Decorator
function Autobind(_:any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value
    const adjDescriptor:PropertyDescriptor = {
        configurable : true,
        get(){
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor
}

//Validator
interface Validator {
    value : string | number;
    required ?: boolean;
    minLength ?: number;
    maxLength ?: number;
    min ?:number;
    max ?: number;
}

class ValidatorOb implements Validator{
    isValid = true;
    constructor(public value:string|number,public required ?:boolean,public minLength?:number,public maxLength?:number, public min?:number, public max?:number){
        this.value = value;
        this.required = required
    }

    validate(){
        if(this.required){
            this.isValid = this.isValid && !!this.value  
        }
        if(this.minLength){
            this.isValid = this.isValid && !!(this.value.toString().trim().length >= this.minLength)
        }
        if(this.maxLength){
            this.isValid = this.isValid && !!(this.value.toString().trim().length <= this.maxLength)
        }
        if(this.min){
            this.isValid = this.isValid && !!(this.value >= this.min)
        }
        if(this.max ){
            this.isValid = this.isValid && !!(this.value <= this.max)
        }
        return this.isValid;
    }
}


//Project Class

enum ProjectStatus {Active, Finished}
class Project {
    constructor(
        public id:string, 
        public title:string, 
        public description:string, 
        public people:number, 
        public status: ProjectStatus){
    }
}


// Project State Class

type Listener = (items: Project[]) => void

class ProjectState {
    projects: Project[] = []
    listeners : Listener[] = []
    private static _instance : ProjectState 

    static getInstance(){
        if(this._instance){
            return this._instance
        }else{
            this._instance = new ProjectState()
            return this._instance
        }
    }

    addProject(title:string, description:string, people:number){
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
        this.projects.push(newProject);
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice())
        }

    }

    addListeners(fn : Listener){
        this.listeners.push(fn)
    }
}

const projectState = ProjectState.getInstance()

// Project List Class
class ProjectList {
    templateElement : HTMLTemplateElement
    hostElement : HTMLDivElement
    element : HTMLElement
    assignedProjects : Project[] = []

    constructor(private _type: "active" | "finished"){
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true)
        this.element = importNode.firstElementChild as  HTMLElement;
        this.element.id = `${this._type}-projects`

         projectState.addListeners((projects : Project[]) => {
            const relevantProjects = projects.filter((prj) => {
               if(this._type === "active"){
                   return prj.status === ProjectStatus.Active
               }
               return prj.status === ProjectStatus.Finished
            })
             this.assignedProjects = relevantProjects
             this._renderProjects()
         })

        this._attach()
        this._renderContent()

    }

    private _renderProjects(){
        const listEl = document.getElementById(`${this._type}-projects-list`)! as HTMLUListElement
        listEl.innerHTML = ''
        for(const project of this.assignedProjects){
            const listItem = document.createElement("li")
            listItem.textContent = project.title
            listEl.appendChild(listItem)
        }
    }   

    private _attach(){
        this.hostElement.insertAdjacentElement("beforeend", this.element)
    }

    private _renderContent(){
        const listId = `${this._type}-projects-list`
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this._type.toUpperCase() + " PROJECTS"
    }


}

// Project Input Class
class ProjectInput {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLFormElement
    titleInputElement : HTMLInputElement
    descriptionInputElement : HTMLInputElement
    peopleInputElement : HTMLInputElement
    constructor(){
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement

        const importNode = document.importNode(this.templateElement.content, true)
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input"

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

        this._configure()
        this._attach()
    }

    private _attach(){
        this.hostElement.insertAdjacentElement("afterbegin", this.element)
    }

    private _clearInputs(){
        this.titleInputElement.value = ""
        this.descriptionInputElement.value = ""
        this.peopleInputElement.value = ""
    }

    private _gatherUserData(): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enterPeople = this.peopleInputElement.value


        const titleValidator = new ValidatorOb(enteredTitle.trim(), true, 2)
        const descValidator = new ValidatorOb(enteredDescription.trim(), true, 3)
        const peopleValidator = new ValidatorOb(+enterPeople, true)

        if(titleValidator.validate() && descValidator.validate() && peopleValidator.validate()) {
            return [enteredTitle, enteredDescription, +enterPeople]
        }else{
            alert("please enter valid input")
            return
        }
    }

    @Autobind
    private _onSubmitHander(event: Event){
        event.preventDefault()
        const userData = this._gatherUserData()
        if(Array.isArray(userData)){
            const [title, description, people] = userData
            projectState.addProject(title, description, people)
            this._clearInputs()
        }else{
            console.log("no valid data")
        }
        
    }

    private _configure(){
        this.element.addEventListener("submit", this._onSubmitHander)
    }

}

const projectInput = new ProjectInput()
const activeProjectList = new ProjectList("active")
const finishedProjectList = new ProjectList("finished")