import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CameraService } from 'src/app/services/camera.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  users: Observable<User[]>;
  userId: string;
  photoPaths: SafeResourceUrl[] = [];
  
  constructor(private hotelService: HotelService,
    private cameraService: CameraService,
    private photoService: PhotoService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.getCurrentUser().subscribe(
      data => this.userId = data.uid
    );
    this.users = this.hotelService.getUsers(); 
  }

  async takePicture() {
    const photoPath = await this.cameraService.takePicture();
    this.photoService.insertPhoto(photoPath);
  }

  removePhoto(path: SafeResourceUrl) {
    this.photoService.removePhoto(path);
  }
}
