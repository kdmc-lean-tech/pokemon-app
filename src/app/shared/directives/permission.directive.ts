import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Permissions } from '../../models/role.model';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit, OnDestroy {
  @Input()  permission: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private sessionService: SessionService
    ) {
  }

  ngOnInit() {
    const { permissions } = this.sessionService.getUser().roleId;
    this.verifyPermission(permissions);
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
  }
}
