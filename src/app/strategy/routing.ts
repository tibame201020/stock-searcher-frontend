import { Routes } from '@angular/router';
import { BackTestingComponent } from './back-testing/back-testing.component';

const routes: Routes = [
    { path: 'backtesting', component: BackTestingComponent },
    { path: '', redirectTo: 'backtesting', pathMatch: 'full' }
];

export const StrategyRouter = routes;
