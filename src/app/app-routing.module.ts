import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BagSummaryComponent } from './components/bag-summary/bag-summary.component';
import { ClothesDetailComponent } from './components/clothes-detail/clothes-detail.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ClothesComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: 'clothesdetail/:clothesId', component: ClothesDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bagsummary', component: BagSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
