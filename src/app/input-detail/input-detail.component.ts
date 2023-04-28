import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { TaxData, TaxService } from '../tax.service';
import { format2Decimal, maxTaxAmountValidator, toNumber } from '../utils';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.scss']
})
export class InputDetailComponent implements OnInit {
  form: FormGroup;
  months: any[] = [
    { title: 'January', value: '01' },
    { title: 'February', value: '02' },
    { title: 'March', value: '03' },
    { title: 'April', value: '04' },
    { title: 'May', value: '05' },
    { title: 'June', value: '06' },
    { title: 'July', value: '07' },
    { title: 'August', value: '08' },
    { title: 'September', value: '09' },
    { title: 'October', value: '10' },
    { title: 'November', value: '11' },
    { title: 'December', value: '12' }
  ];
  years: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _taxService: TaxService
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 2020; i <= currentYear; i++) {
      this.years.push(i.toString());
    }

    this.form = this._formBuilder.group({
      filingType: ['0', [Validators.required]],
      month: [null, [Validators.required]],
      year: [null, [Validators.required]],
      saleAmount: [null, [Validators.required]],
      taxAmount: [null, [Validators.required]],
      surcharge: '0.00',
      penalty: '0.00',
      totalAmount: '0.00'
    });

    this.form.get('filingType').valueChanges.subscribe(v => {
      this.form.get('saleAmount').reset();
      this.form.get('taxAmount').reset();
      if (v === '0') {
        this.form.get('surcharge').setValue('0.00');
        this.form.get('penalty').setValue('0.00');
      } else {
        this.form.get('penalty').setValue('200.00');
      }
    });

    this.form.get('taxAmount').valueChanges.subscribe(v => {
      let surcharge = format2Decimal((toNumber(v) * 0.1).toFixed(2));
      this.form.get('surcharge').setValue(surcharge);
    });

    merge(
      this.form.get('taxAmount').valueChanges,
      this.form.get('surcharge').valueChanges,
      this.form.get('penalty').valueChanges
    ).subscribe(v => {
      this.form.get('totalAmount').setValue(this.calculateTotalAmount());
    });

    const taxData: any = this._taxService.getTaxData();
    if (taxData) {
      taxData.saleAmount = format2Decimal(taxData.saleAmount);
      taxData.taxAmount = format2Decimal(taxData.taxAmount);
      taxData.surcharge = format2Decimal(taxData.surcharge);
      taxData.penalty = format2Decimal(taxData.penalty);
      taxData.totalAmount = format2Decimal(taxData.totalAmount);
      this.form.setValue(taxData);
    }
  }

  calculateTaxAmount() {
    let saleAmount = this.form.get('saleAmount').value;
    let taxAmount = format2Decimal((toNumber(saleAmount) * 0.07).toFixed(2));
    this.form.get('taxAmount').setValue(taxAmount);
    this.form.get('taxAmount').clearValidators();
    this.form.get('taxAmount').setValidators([Validators.required, maxTaxAmountValidator(taxAmount)]);
    this.form.get('taxAmount').updateValueAndValidity();
  }

  calculateTotalAmount() {
    const totalAmount =
      toNumber(this.form.get('taxAmount').value) +
      toNumber(this.form.get('surcharge').value) +
      toNumber(this.form.get('penalty').value)
    return format2Decimal(totalAmount);
  }

  get filingType() {
    return this.form.get('filingType').value;
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    } else {
      const taxData = new TaxData(
        this.form.get('filingType').value,
        this.form.get('month').value,
        this.form.get('year').value,
        toNumber(this.form.get('saleAmount').value),
        toNumber(this.form.get('taxAmount').value),
        toNumber(this.form.get('surcharge').value),
        toNumber(this.form.get('penalty').value),
        toNumber(this.form.get('totalAmount').value)
      )
      this._taxService.setTaxData(taxData);
      this._router.navigate(['./../confirm-review']);
    }
  }
}
