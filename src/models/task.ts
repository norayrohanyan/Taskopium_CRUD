import { Task } from "../interfaces/taskInterface";
import { Comment } from "../interfaces/commentInterface";
import { Priority, Status } from "../interfaces/enum";

export default class TaskModel implements Task {
  private _taskId: string = "";
  private _title: string = "";
  private _description: string = "";
  private _deadline: Date = new Date();
  private _priority: Priority = Priority.LOW;
  private _status: Status = Status.TODO;
  private _assignee: string = "";
  private _creator: string = "";
  private _tags: string[] = [];
  private _creationDate: Date = new Date();
  private _lastUpdated: Date = new Date();
  private _estimatedTime: number = 0;
  private _attachments: string[] = [];
  private _comments: Comment[] = [];

  constructor(data: Task) {
    this.taskId = data.taskId;
    this.title = data.title;
    this.description = data.description;
    this.deadline = data.deadline;
    this.priority = data.priority;
    this.status = data.status;
    this.assignee = data.assignee;
    this.creator = data.creator;
    this.tags = data.tags;
    this.creationDate = data.creationDate;
    this.lastUpdated = data.lastUpdated;
    this.estimatedTime = data.estimatedTime;
    this.attachments = data.attachments;
    this.comments = data.comments;
  }

  get taskId(): string {
    return this._taskId;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get deadline(): Date {
    return this._deadline;
  }

  get priority(): Priority {
    return this._priority;
  }

  get status(): Status {
    return this._status;
  }

  get assignee(): string {
    return this._assignee;
  }

  get creator(): string {
    return this._creator;
  }

  get tags(): string[] {
    return this._tags;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  get lastUpdated(): Date {
    return this._lastUpdated;
  }

  get estimatedTime(): number {
    return this._estimatedTime;
  }

  get attachments(): string[] {
    return this._attachments;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  set taskId(value: string) {
    this._taskId = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set deadline(value: Date) {
    this._deadline = value;
  }

  set priority(value: Priority) {
    this._priority = value;
  }

  set status(value: Status) {
    this._status = value;
  }

  set assignee(value: string) {
    this._assignee = value;
  }

  set creator(value: string) {
    this._creator = value;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  set creationDate(value: Date) {
    this._creationDate = value;
  }

  set lastUpdated(value: Date) {
    this._lastUpdated = value;
  }

  set estimatedTime(value: number) {
    this._estimatedTime = value;
  }

  set attachments(value: string[]) {
    this._attachments = value;
  }

  set comments(value: Comment[]) {
    this._comments = value;
  }

  update(data: Partial<Task>): void {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (key in this) {
                // @ts-ignore
                this[key] = data[key];
              }
          }
      }
  }

  setPriority(priority: Priority): void {
    this.priority = priority;
    this.lastUpdated = new Date();
  }


  changeStatus(status: Status): void {
    this.status = status;
    this.lastUpdated = new Date();
  }

  assignToUser(user: string): void {
    this.assignee = user;
    this.lastUpdated = new Date();
  }

  addComments(comment: Comment): void {
    this.comments.push(comment);
    this.lastUpdated = new Date();
  }

  toJSON(): Task {
    return {
        taskId: this._taskId,
        title: this._title,
        description: this._description,
        deadline: this._deadline,
        priority: this._priority,
        status: this._status,
        assignee: this._assignee,
        creator: this._creator,
        tags: this._tags,
        creationDate: this._creationDate,
        lastUpdated: this._lastUpdated,
        estimatedTime: this._estimatedTime,
        attachments: this._attachments,
        comments: this._comments
    } as Task;
  }
}
