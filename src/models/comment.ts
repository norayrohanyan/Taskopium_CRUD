import { Comment } from "../interfaces/commentInterface";

export default class CommentModel implements Comment {
    private _commentId: string = "";
    private _author: string = "UserX";
    private _content: string = "";
    private _timestamp: Date = new Date();

    constructor(data: Comment) {
        this._commentId = data.commentId;
        this._author = data.author;
        this._content = data.content;
        this._timestamp = data.timestamp;
    }

    get commentId(): string {
        return this._commentId;
    }

    get author(): string {
        return this._author;
    }

    get content(): string {
        return this._content;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set commentId(commentId: string) {
        this._commentId = commentId;
    }
    set author(author: string) {
        this._author = author;
    }

    set content(content: string) {
        this._content = content;
    }

    set timestamp(timestamp: Date) {
        this._timestamp = timestamp;
    }

    editContent(content: string): void {
        this._content = content;
    }
}