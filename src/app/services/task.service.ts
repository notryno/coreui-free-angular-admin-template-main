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
}