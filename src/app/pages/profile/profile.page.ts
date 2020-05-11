import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CameraService } from 'src/app/services/camera.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  photoPaths: SafeResourceUrl[] = [];
  
  constructor(
    private cameraService: CameraService,
    private photoService: PhotoService,
    private authService: AuthService
  ) {}

  async takePicture() {
    const photoPath = await this.cameraService.takePicture();
    this.photoService.insertPhoto(photoPath);
  }

  removePhoto(path: SafeResourceUrl) {
    this.photoService.removePhoto(path);
  }
}
