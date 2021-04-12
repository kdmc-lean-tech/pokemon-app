import { Directive, OnDestroy, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebouncedInput]'
})
export class DebounceInputDirective implements OnDestroy {

  @Output()
  public appDebouncedInput: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public debounceDelay = 250;

  private stream: Subject<any> = new Subject<any>();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.stream
      .pipe(debounceTime(this.debounceDelay))
      .subscribe((value: any) => {
        this.appDebouncedInput.emit(value);
      });
  }

  @HostListener('keyup', ['$event.target'])
  public onKeyup(input: HTMLInputElement): void {
    this.stream.next(input.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
