export interface Comment {
    commentId: string;
    author: string;
    content: string;
    timestamp: Date;

    editContent(content: string): void;
  }