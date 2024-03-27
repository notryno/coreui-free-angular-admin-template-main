// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {}

  updateTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addTask(newTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task => {
      if (task.id === updatedTask.id) {
        // Update only the fields that are present in updatedTask
        task.summary = updatedTask.summary ?? task.summary;
        task.description = updatedTask.description ?? task.description;
        task.statusId = updatedTask.statusId ?? task.statusId;
        task.reporterId = updatedTask.reporterId ?? task.reporterId;
        task.assigneeId = updatedTask.assigneeId ?? task.assigneeId;
        task.dueDate = updatedTask.dueDate ?? task.dueDate;
      }
      return task;
    });
    this.tasksSubject.next(updatedTasks);
  }
  
}