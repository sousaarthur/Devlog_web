import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/service/user';
import { uploadImage } from '../../../../core/service/upload';
import { UserInterface } from '../../../../core/interface/userInterface';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'app-config-user-info',
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  templateUrl: './config-user-info.html',
  styleUrl: './config-user-info.css',
})
export class configUserInfo implements OnInit {
constructor(
    private messageService: MessageService,
    private userService: User,
    private cdr: ChangeDetectorRef,
    private uploadService: uploadImage,
    private fb: FormBuilder
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  userData: UserInterface = { avatar: '' };
  imageUrl: string = "";
  configForm!: FormGroup;
  isUploading = false;

  ngOnInit(): void {
    this.configForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      bio: [''],
      linkedin: [''],
      github: [''],
    });
    this.loadUser();
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.isUploading = true;
    this.uploadService.upload(file).subscribe({
      next: (res) => {
        this.imageUrl = res.url;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Upload feito com sucesso!' });
        this.isUploading = false;
      },
      error: (err) => {
        console.error("Erro ao fazer upload:", err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao fazer upload!' });
        this.isUploading = false;
      }
    })
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  loadUser() {
    this.userService.get().subscribe({
      next: (data) => {
        this.userData = {
          avatar: data.avatar
        };
        this.imageUrl = data.avatar;
        this.configForm.patchValue({
          name: data.name,
          email: data.email,
          bio: data.bio,
          linkedin: data.linkedin,
          github: data.github
        });
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit() {
    const formValue = this.configForm.value;
    this.userData = {
      name: formValue.name,
      bio: formValue.bio,
      avatar: this.userData.avatar == this.imageUrl ? this.userData.avatar : this.imageUrl,
      linkedin: formValue.linkedin,
      github: formValue.github
    }
    if (this.imageUrl && this.imageUrl !== this.userData.avatar) {
      this.userData.avatar = this.imageUrl;
    }
    this.userService.update(this.userData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
