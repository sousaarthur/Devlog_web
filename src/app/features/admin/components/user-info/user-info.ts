import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../core/service/user';
import { UserInterface } from '../../../../core/interface/userInterface';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-user-info',
  imports: [CommonModule, TagModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo implements OnInit {

  user: UserInterface = {};
  iconRole: string = "";

  constructor(private service: User, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.user$.subscribe(data => {
      if (data) {
        this.user = {
          name: data.name,
          email: data.email,
          role: data.role == "WRITER" ? "ESCRITOR" : data.role == "READER" ? "LEITOR" : "ADMIN"
        };
        this.cdr.detectChanges();
      }
    });
  }
}
