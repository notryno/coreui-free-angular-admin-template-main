import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/models/task.model';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.scss'],
})
export class TaskDetailsModalComponent {
  statusOptions: Status[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private apiService: ApiService ) {
    this.getStatusOptions();
  }

  getStatusOptions(): void {
    this.apiService.getAllStatus().subscribe({
      next: (options: Status[]) => {
        this.statusOptions = options;

      },
      error: (error) => {
        console.error('Error fetching status options:', error);
      }
    });
  }

  saveChanges(): void {
    this.apiService.updateTask(this.data, "KBN").subscribe({
      next: (updatedTask: Task) => {
        console.log('Task updated:', updatedTask);
        this.dialogRef.close(updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }
  
}