import { Status } from "./status.model";
import { User } from "./user.model";

export interface Task {
  id: number;
  summary: string;
  description: string;
  comment: string;
  childTaskId: number;
  taskId: number;
  assigneeId: User | null; 
  reporterId: User | null; 
  attachment: string;
  statusId: Status | null;
  dueDate: Date;
}
