import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/models/task.model';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.scss'],
})
export class TaskDetailsModalComponent {

  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  statuses: Status[] = [];
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private apiService: ApiService ) {
    this.getAllStatus();
    this.getAllUser();
  }

  getAllStatus(): void {
    this.apiService.getAllStatus().subscribe({
      next: (status: Status[]) => {
        this.statuses = status;

      },
      error: (error) => {
        console.error('Error fetching status options:', error);
      }
    });
  }

  getAllUser(): void {
    this.apiService.getAllUser().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  saveChanges(): void {
    console.log('Task:', this.data);
    this.apiService.updateTask(this.data, "KBN").subscribe({
      next: (updatedTask: Task) => {
        console.log('Task updated:', updatedTask);
        this.taskAdded.emit(updatedTask);
        this.dialogRef.close(updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }
  
}