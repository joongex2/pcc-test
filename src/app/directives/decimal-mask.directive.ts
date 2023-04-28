import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { format2Decimal } from '../utils';

@Directive({
  selector: '[appDecimalMask]'
})
export class DecimalMaskDirective {
  private _oldvalue: string = '';
  private regExpr = /^[+-]?([1-9]\d*|0)?(\.\d{0,2})?$/;

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  change($event) {
    let item = $event.target
    let value = item.value;
    let pos = item.selectionStart; //get the position of the cursor
    let matchvalue = value;
    let noMatch: boolean = (value && !(this.regExpr.test(matchvalue)));
    if (noMatch) {
      item.selectionStart = item.selectionEnd = pos - 1;
      if (item.value.length < this._oldvalue.length && pos == 0) pos = 2;
      if (this.control) this.control.control.setValue(this._oldvalue, { emitEvent: false });
      item.value = this._oldvalue;
      item.selectionStart = item.selectionEnd = pos - 1; //recover the position
    } else {
      this._oldvalue = value;
    }
  }

  @HostListener('focus')
  onFocus() {
    const curValue = this.control.control.value;
    if (!curValue) return;
    const resValue = curValue.replaceAll(',', '');
    this.control.control.setValue(resValue, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur() {
    const curValue = this.control.control.value;
    if (!curValue) return;
    const resValue = format2Decimal(curValue);
    this.control.control.setValue(resValue, { emitEvent: false });
  }
}