import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Status } from '../models/status.model';
import { User } from '../models/user.model';

// <p>Placeholder content for the first card.</p>
//           <p>Create endpoint to get status</p>
//           <p>Render  cards according to status</p>
//           <p>Sort tasks into their respective cards</p>
//           <p>Add form modals for Project, User, Tasks, Childtasks, comment</p>
//           <p>Dropdown for status</p>


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getAllTasks(projectKey: string): Observable<Task[]> {
    const endpoint = `${this.apiUrl}/project/${projectKey}/task/list`;

    // Get the bearer token from sessionStorage
    const authToken = sessionStorage.getItem('Bearer Token');
    
    // Set headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    // Add headers to the HTTP request
    return this.http.get<Task[]>(endpoint, { headers });
  }


  getAllStatus(): Observable<Status[]> {
    const endpoint = `${this.apiUrl}/statuses`;

    // Get the bearer token from sessionStorage
    const authToken = sessionStorage.getItem('Bearer Token');
    
    // Set headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    // Add headers to the HTTP request
    return this.http.get<Status[]>(endpoint, { headers });
  }

  getAllUser(projectKey: string): Observable<User[]> {
    const endpoint = `${this.apiUrl}/users/${projectKey}`;

    // Get the bearer token from sessionStorage
    const authToken = sessionStorage.getItem('Bearer Token');
    
    // Set headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    // Add headers to the HTTP request
    return this.http.get<User[]>(endpoint, { headers });
  }

  addTask(task: Task, projectKey: string): Observable<Task> {
    const endpoint = `${this.apiUrl}/project/${projectKey}/task/add`;
    const authToken = sessionStorage.getItem('Bearer Token');

    const form = new FormData();
    form.append('summary', task.summary);
    form.append('description', task.description);
    form.append('taskId', task.taskId.toString());
    form.append('assigneeId', task.assigneeId?.id.toString() ?? '');
    form.append('reporterId', task.reporterId?.id.toString() ?? '');
    form.append('statusId', task.statusId?.id.toString() ?? '');
    form.append('dueDate', task.dueDate.toISOString());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    console.log(form);
    return this.http.post<Task>(endpoint, form, { headers });
  }

  updateTask(task: Task, projectKey: string): Observable<Task> {
    const endpoint = `${this.apiUrl}/project/${projectKey}/task/${task.id}/update`;
    const authToken = sessionStorage.getItem('Bearer Token');

    const form = new FormData();
    form.append('summary', task.summary);
    form.append('description', task.description);
    form.append('assigneeId', task.assigneeId?.id.toString() ?? '');
    form.append('reporterId', task.reporterId?.id.toString() ?? '');
    form.append('statusId', task.statusId?.id.toString() ?? '');
    form.append('dueDate', task.dueDate.toISOString());
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    return this.http.post<Task>(endpoint, form, { headers });
  }

  addStatus(statusName: string): Observable<Status> {
    const endpoint = `${this.apiUrl}/status/add`;

    // Get the bearer token from sessionStorage
    const authToken = sessionStorage.getItem('Bearer Token');
    
    // Set headers with Authorization Bearer token and Content-Type
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    // Create the payload for adding a new status
    const form = new FormData();
    form.append('status', statusName);

    // Add headers to the HTTP request and send a POST request to the endpoint
    return this.http.post<Status>(endpoint, form, { headers });
  }

}
