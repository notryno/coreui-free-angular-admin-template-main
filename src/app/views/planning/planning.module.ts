import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';


import { BoardComponent } from './board.component';
import { BacklogComponent } from './backlog/backlog.component';

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
    TabsModule,
    MatMenuModule,
    MatIconModule,
    MatButton
  ],
  declarations: [
    BoardComponent,
    BacklogComponent,
  ]
})
export class PlanningModule {
}
