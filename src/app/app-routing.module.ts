import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmReviewComponent } from './confirm-review/confirm-review.component';
import { InputDetailComponent } from './input-detail/input-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'input-detail' },
  { path: 'input-detail', component: InputDetailComponent },
  { path: 'confirm-review', component: ConfirmReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
