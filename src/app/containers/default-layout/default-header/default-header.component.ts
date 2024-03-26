import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AddTaskDialogComponent } from 'src/components/modals/add-task-dialog/add-task-dialog.component';


import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private dialog: MatDialog
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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the result (new task) here
    });
  }

}
