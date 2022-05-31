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
            console.log(title, description, people)
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