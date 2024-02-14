import { Priority, Status } from './enum';
import { Comment } from './commentInterface';  
export interface Task {
    taskId: string;
    title: string;
    description: string;
    deadline: Date;
    priority: Priority;
    status: Status;
    assignee: string;
    creator: string;
    tags: string[];
    creationDate: Date;
    lastUpdated: Date;
    estimatedTime: number;
    attachments: string[];
    comments: Comment[];
    
    update(details: Partial<Task>): void;
    setPriority(priority: Priority): void;
    assignToUser(user: string): void;
    addComments(comment: Comment): void;
    changeStatus(status: Status): void;
}