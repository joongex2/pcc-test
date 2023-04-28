import { Injectable } from '@angular/core';

export class TaxData {
  filingType: string;
  month: string;
  year: string;
  saleAmount: number;
  taxAmount: number;
  surcharge: number;
  penalty: number;
  totalAmount: number;

  constructor(
    filingType: string,
    month: string,
    year: string,
    saleAmount: number,
    taxAmount: number,
    surcharge: number,
    penalty: number,
    totalAmount: number
  ) {
    this.filingType = filingType;
    this.month = month;
    this.year = year;
    this.saleAmount = saleAmount;
    this.taxAmount = taxAmount;
    this.surcharge = surcharge;
    this.penalty = penalty;
    this.totalAmount = totalAmount;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private taxData: TaxData;

  constructor() { }

  setTaxData(taxData: TaxData) {
    this.taxData = taxData;
  }

  getTaxData() {
    return this.taxData;
  }
}
