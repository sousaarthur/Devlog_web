import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../core/service/user';
import { UserInterface } from '../../../../core/interface/userInterface';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo implements OnInit {

  user: UserInterface = {};
  
  constructor(private service:User, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.get().subscribe({
      next: (data) => {
        this.user = {
          name: data.name,
          email: data.email
        }
        this.cdr.detectChanges();
      }
    })
  }
}
