import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { User } from '../../../core/service/user';
import { UserInterface } from '../../../core/interface/userInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule, AvatarGroupModule],
  template: `
    <p-avatar 
      [label]="user.avatar == '' || user.avatar == null ? user.name : undefined"
      [image]="user.avatar"
      size="large" 
      [style]="{ 'background-color': user.avatar == '' || user.avatar == null ? '#2b7fff' : null , color: user.avatar == '' || user.avatar == null ? '#fafafa' : null }" 
      shape="circle" />
  `,
  styles: [`
    :host ::ng-deep .p-avatar img {
      object-fit: cover !important;
      width: 100%;
      height: 100%;
    }
  `]
})
export class Avatar implements OnInit {
  user: UserInterface = { avatar: '' };
  
  constructor(private service: User, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.user$.subscribe(user => {
      if (user) {
        this.user = {
          avatar: user.avatar
        };
        this.cdr.detectChanges();
      }
    });
  }
}