import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration-page2',
  templateUrl: './registration-page2.component.html',
  styleUrls: ['./registration-page2.component.css']
})
export class RegistrationPage2Component implements OnInit {

  // selectedFile: File
  imagePreview: string = ''

  constructor(private registrationService:RegistrationService) { 
    // this.selectedFile = null
   }

  ngOnInit(): void {
    // this.step2CompleteEvent.emit(true)
  }

  @Output() step2CompleteEvent = new EventEmitter<boolean>()
  step2Complete() {

    this.registrationService.createUserFolder(String(localStorage.getItem('hashed_user_folder')))
          .subscribe((userFolder) => {

            if (this.$_USER_PHOTO != null) {
              
              let userPhotoObject = new FormData()
              userPhotoObject.append('file', this.$_USER_PHOTO, this.$_USER_PHOTO.name)
              userPhotoObject.append('photo_way', userFolder + "/")
              userPhotoObject.append('user_mail', String(localStorage.getItem('user_mail')))

              this.registrationService.uploadUserPhoto(userPhotoObject)
                .subscribe((data) => {
                  console.log(data);
                  this.step2CompleteEvent.emit(true)
                }, (err) => {
                  console.log(err);
                })
            }
          }, (err) => {
            console.log("Error: " + JSON.stringify(err));
          })
  }

  $disableSaveButton = true

  activateSavePhotoButton() {
    this.$disableSaveButton = false
  }

  $_MESS_LABEL = 'Upload your photo!'

  $_USER_PHOTO: any

  onFileUpload(event: any) {
    // this.$_USER_PHOTO = event.target.files[0]
    let file = String($("#formFile").val())
    this.$_USER_PHOTO = $("#formFile").prop('files')[0];
    console.log("selected file: " + this.$_USER_PHOTO.name);

    $("#liveToast1").toast('show');

    this.$disableSaveButton = true

    // DECOMENT
    localStorage.setItem('user_avatar_photo', this.$_USER_PHOTO.name)

    // localStorage.removeItem('temp_path')
    // localStorage.removeItem('user_path')
    // localStorage.removeItem('user_folder')
    // localStorage.removeItem('user_avatar_folder')

    // this.registrationService.uploadUserPhoto(userPhoto)
    //   .subscribe((res: any) => {
    //     this.$_MESS_LABEL = 'Your photo was uploaded successfully'
    //   }, (err) => {
    //     console.log(err);
    //   })
    // const fs = require('fs');

    
    // const reader = new FileReader()
    // reader.onload = () => {
    //   console.log("result file: " + reader.result);
    // }
    // reader.readAsDataURL(this.selectedFile)
  }
}
