// DefaultHeaderComponent.ts

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AddTaskDialogComponent } from 'src/components/modals/add-task-dialog/add-task-dialog.component';
import { BoardComponent } from 'src/app/views/planning/board.component';


import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  boardComponent: BoardComponent | null = null;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private dialog: MatDialog,
    private apiService: ApiService,
    private taskService: TaskService
  ) {
    super();
  }

  public logout(): void {
    this.authService.logout();
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
      data: { /* additional data if needed */ }
    });
  
    dialogRef.afterClosed().subscribe((newTask: Task | undefined) => {
      if (newTask) {
        this.taskService.addTask(newTask);
      }
    });
  }
  

}
