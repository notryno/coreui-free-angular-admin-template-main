import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';
import { BacklogComponent } from './backlog/backlog.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Planning',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board',
      },
      {
        path: 'backlog',
        component: BacklogComponent,
        data: {
          title: 'Backlog',
        },
      },
      {
        path: 'board',
        component: BoardComponent,
        data: {
          title: 'Board',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
