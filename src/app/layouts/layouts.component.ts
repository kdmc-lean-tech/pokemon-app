import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { loadingConfiguration } from '../shared/constants/global.constants';
import { setSocketStatus } from '../store/actions/socket.actions';
import { AppState } from '../store/models/app.model';
import { SessionService } from '../services/session.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('snav ') snav: MatDrawer;
  private subscriptions = new Subscription();
  public isLoading = false;
  public loadingConfiguration = loadingConfiguration;

  constructor(
    private sessionService: SessionService,
    private socket: Socket,
    private store: Store<AppState>,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select('auth').subscribe(({ token, user }) => {
        token && user ? this.connect() : this.disconnect();
      })
    );
    this.subscriptions.add(
      this.store.select('ui').subscribe(({ isLoading }) => {
        Promise.resolve(null).then(() => this.isLoading = isLoading);
      })
    );
    this.subscriptions.add(
      this.socketService.connect.subscribe(() => {
        this.store.dispatch(setSocketStatus({ online: true }));
      })
    );
    this.subscriptions.add(
      this.socketService.disconnect.subscribe(() => {
        this.store.dispatch(setSocketStatus({ online: false }));
      })
    );
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.snav.open();
    });
  }

  public connect(): void {
    this.socket.ioSocket.io.opts.query = { token: this.sessionService.getToken() };
    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }


  ngOnDestroy() {
    this.disconnect();
    this.subscriptions.unsubscribe();
  }
}
