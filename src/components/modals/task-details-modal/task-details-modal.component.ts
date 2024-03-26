import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.scss'],
})
export class TaskDetailsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}