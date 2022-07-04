// Base class of the  input
class Field {
  public errors: string[];
  public input: HTMLInputElement;

  constructor(input: HTMLInputElement) {
    // Stores the required input 
    this.input = input;
    // Stores the list of errors
    this.errors = [];
    // Gets the element that will show the error
    let errorMessage: HTMLParagraphElement = document.createElement('p');
    errorMessage.className = 'text-danger';
    this.input.parentNode?.insertBefore(errorMessage, this.input.nextSibling);
    // Every time the input change the validations are checked
    this.input.addEventListener('input', () => {
      this.errors = [];
      this.validate();
      errorMessage.innerText = this.errors[0] || '';
    })
  }

  public validate() {}
}
// First validator that will be added
function RequiredFieldDecorator(field: Field): Field {
  // Stores the validate method that is not modified yet to check the previous 
  // validator before apply this new validator
  let validate = field.validate;
  // Modify the validate function to add the new validator
  field.validate = function() {
    // Executes the old validate function before new validation
    validate();
    let value = field.input.value;
    if (!value) {
      field.errors.push('Este campo es requerido');
    }
  }
  // Returns all the input again to allow apply new validators
  return field;
}

function EmailFieldDecorator(field: Field): Field {
  let validate = field.validate;
  field.validate = function() {
    validate();
    let value = field.input.value;
    if (value.indexOf("@") === -1) {
      field.errors.push('Debe ser un email');
    }
  }
  return field;
}

let field = new Field(document.querySelector('#email')!);
field = RequiredFieldDecorator(field);
field = EmailFieldDecorator(field);