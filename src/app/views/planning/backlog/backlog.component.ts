import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsModalComponent } from '@docs-components/modals/task-details-modal/task-details-modal.component';
import { Task } from 'src/app/models/task.model';
import { ApiService } from 'src/app/services/api.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent {
  tasks: Task[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private taskService: TaskService
    ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getAllTasks("KBN").subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  handleTaskClick(task: Task): void {
    if (task) {
      const dialogRef = this.dialog.open(TaskDetailsModalComponent, {
        data: {
          id: task.id,
          summary: task.summary,
          description: task.description,
          statusId: task.statusId,
          assigneeId: task.assigneeId,
          reporterId: task.reporterId,
          dueDate: new Date(task.dueDate),
        }
      });

      dialogRef.afterClosed().subscribe((updatedTask: Task | undefined) => {
        if (updatedTask) {
          this.taskService.updateTask(updatedTask);
        }
      });
    }
  }
}

