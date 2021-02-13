import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public showError(message: string): void {
    Swal.fire({
      icon: 'error',
      text: message,
      title: 'Error',
      heightAuto: false,
    });
  }

  public showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      text: message,
      title: 'Success',
      heightAuto: false,
    });
  }

  public showWarning(message: string) {
    Swal.fire({
      icon: 'warning',
      text: message,
      title: 'Warning',
      heightAuto: false,
    });
  }
}
