import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';

@NgModule({
  declarations: [BackTestingComponent],
  imports: [ShareshareComponetsModule],
})
export class StrategyModule {}
