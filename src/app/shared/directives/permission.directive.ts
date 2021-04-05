import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Permissions } from '../../models/role.model';
import { AppState } from '../../store/models/app.model';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
  @Input()  permission: string;
  private subscriptions = new Subscription();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store<AppState>
    ) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.store.select('auth')
      .subscribe(({ user }) => {
        if (user) {
          const { permissions } = user.roleId;
          this.verifyPermission(permissions);
        }
      })
    );
  }

  private verifyPermission(permissions: Permissions[]) {
    const permissionExit = permissions.find(p => p.codename === this.permission);
    if (permissionExit) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
