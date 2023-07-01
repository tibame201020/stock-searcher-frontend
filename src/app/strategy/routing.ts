import { CodeListComponent } from './code-list/code-list.component';
import { Routes } from '@angular/router';
import { BackTestingComponent } from './back-testing/back-testing.component';

const routes: Routes = [
  { path: 'codelist', component: CodeListComponent },
  { path: 'backtesting', component: BackTestingComponent },
  { path: '', redirectTo: 'backtesting', pathMatch: 'full' }
];

export const StrategyRouter = routes;
