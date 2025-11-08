import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
import { ToastModule } from 'primeng/toast';
import { Divider } from "primeng/divider";
import { Toast } from 'primeng/toast';
import { LoadingService } from '../../../core/service/loading';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-panel',
  imports: [Navbar, DrawerModule, ButtonModule, RouterOutlet, ToastModule, Sidebar, Divider, Toast, Loading],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel implements AfterViewInit {
  visible: boolean = true;
  loadingVisible: boolean = false;

  constructor(private loadingService: LoadingService, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadingService.loading$.subscribe(value => {
      this.loadingVisible = value;
      this.cd.detectChanges(); 
    });
  }
}
