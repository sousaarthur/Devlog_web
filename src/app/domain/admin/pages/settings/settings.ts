import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { configUserInfo } from "../../components/config-user-info/config-user-info";
import { ConfigUserSecurity } from "../../components/config-user-security/config-user-security";
import { ConfigUserTheme } from '../../components/config-user-theme/config-user-theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    configUserInfo,
    ConfigUserSecurity,
    ConfigUserTheme
],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  active: boolean = true;
  outlined!: string;
  severity: ButtonSeverity = 'secondary';

  ngOnInit(): void {
      
  }

  filter:string = "userInfo";

  switchButton(page:string){
    this.filter = page;
  }
}
