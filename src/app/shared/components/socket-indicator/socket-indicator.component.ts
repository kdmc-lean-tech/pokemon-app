import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/models/app.model';

@Component({
  selector: 'app-socket-indicator',
  templateUrl: './socket-indicator.component.html',
  styleUrls: ['./socket-indicator.component.scss']
})
export class SocketIndicatorComponent implements OnInit, OnDestroy {
  public socketConnection: 'connect' | 'disconnect' = 'disconnect';
  private subscriptions = new Subscription();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select('socket').subscribe(({ online }) => {
        this.socketConnection = online ? 'connect' : 'disconnect';
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
