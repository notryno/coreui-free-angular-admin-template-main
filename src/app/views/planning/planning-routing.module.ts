import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';

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
