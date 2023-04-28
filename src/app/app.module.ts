import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmReviewComponent } from './confirm-review/confirm-review.component';
import { ConfirmReviewModalComponent } from './confirm-review/modal/confirm-review-modal/confirm-review-modalcomponent';
import { DecimalMaskDirective } from './directives/decimal-mask.directive';
import { InputDetailComponent } from './input-detail/input-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    InputDetailComponent,
    ConfirmReviewComponent,
    ConfirmReviewModalComponent,
    DecimalMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
