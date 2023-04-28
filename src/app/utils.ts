import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as numeral from 'numeral';

export const format2Decimal = (val) => {
    return numeral(val).format('(0,0.00)');
}

export const toNumber = (val: string): number => {
    return numeral(val).value() || 0;
}

export const maxTaxAmountValidator = (maxInput: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const maxTaxAmount = toNumber(maxInput);
        const taxAmount = toNumber(control.value);
        return taxAmount > maxTaxAmount ? { max: true } : null;
    }
}