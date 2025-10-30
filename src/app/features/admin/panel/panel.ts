import { Component } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
import { ToastModule } from 'primeng/toast';
import { Divider } from "primeng/divider";
import { ConfirmDialog } from "primeng/confirmdialog";
@Component({
  selector: 'app-panel',
  imports: [Navbar, DrawerModule, ButtonModule, RouterOutlet, ToastModule, Sidebar, Divider, ConfirmDialog],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  visible: boolean = true;
}
