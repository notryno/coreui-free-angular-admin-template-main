import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { Status } from 'src/app/models/status.model';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {

  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  task: Task = {
    id: 0,
  summary: '',
  description: '',
  comment: '',
  childTaskId: 0,
  taskId: 0,
  assigneeId: null,
  reporterId: null,
  attachment: '',
  statusId: null,
  dueDate: new Date()
  };
  statuses: Status[] = []; 
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getAllStatus();
    this.getAllUser();
  }

  getAllStatus(): void {
    this.apiService.getAllStatus().subscribe({
      next: (statuses: Status[]) => {
        this.statuses = statuses;
        console.log('Statuses:', statuses);
      },
      error: (error) => {
        console.error('Error fetching statuses:', error);
      }
    });
  }

  getAllUser(): void {
    this.apiService.getAllUser().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log('Users:', users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  addTask(): void {
    this.apiService.addTask(this.task, "KBN").subscribe({
      next: (newTask: Task) => {
        console.log('New task added:', newTask);
        this.taskAdded.emit(newTask);
        this.dialogRef.close(newTask);
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
