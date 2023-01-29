import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum FormControlErrors {
  UNIQUE = 'unique',
  REQUIRED = 'required',
  MAX = 'max',
  MIN = 'min',
}

export const ReservedStringValidator = (
  reserverd: readonly string[]
): ValidatorFn => {
  return ({ value }: AbstractControl): ValidationErrors | null =>
    reserverd.includes(value) ? { [FormControlErrors.UNIQUE]: true } : null;
};
