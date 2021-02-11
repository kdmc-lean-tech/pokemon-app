import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public showError(message: string): void {
    // The second parameter is the text in the button.
    // In the third, we send in the css class for the snack bar.
    // this.snackBar.open(message, 'X', {panelClass: ['error']});
    Swal.fire({
      icon: 'error',
      text: message,
      title: 'error',
      heightAuto: false,
    });
  }
}
