import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() label: string;
  @Input() color: 'light-blue' | 'blue' = 'blue';
  @Input() size: 'small' | 'medium' | 'large' | 'extra-large' = 'medium';
  @Input() type: 'button' | 'submit' | 'menu' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() submitted = new EventEmitter<boolean>();

  constructor() { }

  public eventClick() {
    this.submitted.emit(true);
  }
}
