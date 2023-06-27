import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRouter } from './search/routing';
import { StrategyRouter } from './strategy/routing';

const routes: Routes = [
  { path: 'search', children: SearchRouter },
  { path: 'strategy', children: StrategyRouter },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
