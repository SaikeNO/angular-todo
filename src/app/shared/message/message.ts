import { Message as MessageType } from 'primeng/api';
import { throwError } from 'rxjs';

export class Message {
  messages: MessageType[] = [];

  handleError(error = { statusText: 'One or more fields are required' }) {
    this.messages = [
      {
        severity: 'error',
        summary: 'Error',
        detail: error.statusText,
      },
    ];
    return throwError(() => new Error(error.statusText));
  }
}
