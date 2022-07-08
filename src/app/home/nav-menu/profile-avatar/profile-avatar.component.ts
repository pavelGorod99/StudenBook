import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/registration/service/registration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.css']
})
export class ProfileAvatarComponent implements OnInit {

  // $_baseUrl = 'http://localhost/StudenBook/api/'

  $userProfileImage: string = 'assets/img/Studentbook_default_photo.png'

  $_USER_IMAGE_PATH = ''

  $_USER_NAME = ''

  $userId = -1

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.$userId = parseInt(String(sessionStorage.getItem('USER_ID')))
    this.setProfileImage()
    this.setUserName()
  }

  setProfileAvatar() {
    this.http.post(`${environment.apiHost}get_profile_avatar.php`, {_USER_ID: sessionStorage.getItem('USER_ID')})
      .subscribe((imagePath: any) => {

        this.$userProfileImage = environment.apiHost + 'api' + imagePath
        
        // this.$_USER_IMAGE_PATH = imagePath
        // console.log("this.$_USER_IMAGE_PATH: " + this.$_USER_IMAGE_PATH);
        
      })
  }

  setProfileImage() {
    let params = new HttpParams()
    params = params.set('userId', this.$userId)
    this.http.get(`${environment.apiHost}/get_profile_avatar`, {
      params: params
    }).subscribe((data: any) => {
      this.$userProfileImage = environment.apiHost + '/api/' + data;
      console.log("PHOTO: " + this.$userProfileImage);
    }, (err) => {
      console.log(JSON.stringify(err));
    });    
  }

  setUserName() {
    this.$_USER_NAME = sessionStorage.getItem('USER_NAME') + ' ' + sessionStorage.getItem('USER_SURNAME')
  }

  onFileUpload($event: any) {
    let selectedFile = $event.target.files[0]
    console.log("selected file: " + selectedFile.name);

    let userPhoto = new FormData()

    console.log("USER IMAGE PATH: " + this.$_USER_IMAGE_PATH);
    var $_userPathsOnServer = this.$_USER_IMAGE_PATH.split("/")
    console.log("user mail: " + String(sessionStorage.getItem('USER_EMAIL')));
    
    console.log("$_userPathsOnServer: " + $_userPathsOnServer);
    

    userPhoto.append('file', selectedFile, selectedFile.name)
    userPhoto.append('photo_way', $_userPathsOnServer[0] + '/' + $_userPathsOnServer[1] + '/' + $_userPathsOnServer[2] + '/')
    userPhoto.append('user_mail', String(sessionStorage.getItem('USER_EMAIL')))
    
    this.registrationService.uploadUserPhoto(userPhoto)
      .subscribe((response: any) => {
        this.setProfileAvatar()
      }, (err) => {
        console.log("ERROR: " + JSON.stringify(err));
      })    
  }
}
