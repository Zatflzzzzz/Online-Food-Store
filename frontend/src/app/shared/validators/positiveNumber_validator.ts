import { AbstractControl, ValidationErrors } from "@angular/forms";

export const PositiveNumberValidator = (controlName: string) => {
  return (form: AbstractControl): ValidationErrors | null => {
    const control = form.get(controlName);

    if (!control || control.value == null) return null;

    let errors = control.errors || {};

    if (control.value <= 0) {
      errors = {...errors, lessThenZero: true};
    } else if (controlName === "stars" && control.value > 5) {
      errors = {...errors, moreThenExpected: true};
    } else {
      if (errors.lessThenZero) delete errors.lessThenZero;
      if (errors.moreThenExpected) delete errors.moreThenExpected;
    }

    // Обновляем ошибки контроллера
    control.setErrors(Object.keys(errors).length ? errors : null);

    return null;
  };
};