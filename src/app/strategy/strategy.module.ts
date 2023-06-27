import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';
import { DailyStockLineComponent } from './daily-stock-line/daily-stock-line.component';

@NgModule({
  declarations: [BackTestingComponent, DailyStockLineComponent],
  imports: [ShareshareComponetsModule],
})
export class StrategyModule {}
