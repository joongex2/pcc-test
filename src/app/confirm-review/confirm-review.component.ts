import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxService } from '../tax.service';
import { ConfirmReviewModalComponent } from './modal/confirm-review-modal/confirm-review-modalcomponent';

@Component({
  selector: 'app-confirm-review',
  templateUrl: './confirm-review.component.html',
  styleUrls: ['./confirm-review.component.scss']
})
export class ConfirmReviewComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private taxService: TaxService
  ) { }

  ngOnInit(): void { }

  openModal() {
    const taxData = this.taxService.getTaxData();
    const modalRef = this.modalService.open(ConfirmReviewModalComponent);
    modalRef.componentInstance.taxData = taxData;
  }
}
