//Validator
  export interface Validator {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export class ValidatorOb implements Validator {
    isValid = true;
    constructor(
      public value: string | number,
      public required?: boolean,
      public minLength?: number,
      public maxLength?: number,
      public min?: number,
      public max?: number
    ) {
      this.value = value;
      this.required = required;
    }

    validate() {
      if (this.required) {
        this.isValid = this.isValid && !!this.value;
      }
      if (this.minLength) {
        this.isValid =
          this.isValid &&
          !!(this.value.toString().trim().length >= this.minLength);
      }
      if (this.maxLength) {
        this.isValid =
          this.isValid &&
          !!(this.value.toString().trim().length <= this.maxLength);
      }
      if (this.min) {
        this.isValid = this.isValid && !!(this.value >= this.min);
      }
      if (this.max) {
        this.isValid = this.isValid && !!(this.value <= this.max);
      }
      return this.isValid;
    }
  }

