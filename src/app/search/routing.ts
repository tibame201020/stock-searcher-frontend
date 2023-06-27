import { Routes } from '@angular/router';
import { PriceComponent } from './price/price.component';

const routes: Routes = [
  { path: 'price', component: PriceComponent },
  { path: '', redirectTo: 'price', pathMatch: 'full' },
];

export const SearchRouter = routes;
