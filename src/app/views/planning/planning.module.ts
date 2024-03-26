import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { BoardComponent } from './board.component';

import { PlanningRoutingModule } from './planning-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlanningRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule
  ],
  declarations: [
    BoardComponent,
  ]
})
export class PlanningModule {
}
