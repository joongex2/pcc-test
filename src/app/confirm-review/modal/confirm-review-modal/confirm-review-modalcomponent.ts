import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-review-modal',
  templateUrl: './confirm-review-modal.component.html',
  styleUrls: ['./confirm-review-modal.component.scss']
})
export class ConfirmReviewModalComponent implements OnInit {
  @Input() taxData: any;
  JSON = JSON;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
}
