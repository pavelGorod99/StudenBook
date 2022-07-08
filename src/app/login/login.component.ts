import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  $_usernamePassErr = '';

  $userLogin: string = ''
  $userPass: string = ''

  constructor(private loginService: LoginService, private route: Router) { }

  // helloWorld() {
  //   this.loginService.test().subscribe((res) => {
  //     console.log(res);
      
  //   })
  // }

  ngOnInit(): void {

    // this.loginService.test().subscribe((res) => {
    //   console.log(res);
      
    // })

    // console.log(localStorage.getItem('hashed_user_folder'))
    // console.log(localStorage.getItem('USER_AVATAR_PHOTO'))
  }

  goToHome() {
    this.route.navigate(['/home']);
  }

  goToRegistration() {
    this.route.navigate(['/registration']);
  }

  login(): void {

    if (this.$userLogin == '' && this.$userPass == '') {
      this.$_usernamePassErr = 'Fields of Username and Password are empty!';
    } else if (this.$userLogin == '') {
      this.$_usernamePassErr = 'Field Username is empty!';
    } else if (this.$userPass == '') {
      this.$_usernamePassErr = 'Field Password is empty!';
    } else {

      var bcrypt = require('bcryptjs')

      this.loginService.getUserLogin(this.$userLogin)
      .subscribe(
        (response: any) => {
          if (response == -1) {
            this.$_usernamePassErr = 'User with this email doesn\'t exists!'
          } else if (response) {
            if (bcrypt.compareSync(this.$userPass, response['Password'])){

              sessionStorage.setItem('USER_ID', response['ID'])
                sessionStorage.setItem('USER_NAME', response['Name'])
                sessionStorage.setItem('USER_SURNAME', response['Surname'])
                sessionStorage.setItem('USER_PASSWORD', response['Password'])
                sessionStorage.setItem('USER_EMAIL', response['Email'])

                this.loginService.switchUserToOnlineMode(response['ID'])
                  .subscribe(() => {
                    sessionStorage.setItem('CURRENT_PATH', 'section')
                    this.route.navigate(['/home'], {replaceUrl: true});
                  })

            } else this.$_usernamePassErr = 'Login or password is wrong!';
          } 
          
        }, (err) => {
          console.log(JSON.stringify(err));
        }
      );
      this.$_usernamePassErr = '';
    }
  }

  $_SERVER_PATH = ''

  onFileUpload(event: any) {

    

    // let selectedFile = event.target.files[0]
    // console.log("selected file: " + selectedFile.name);
    // console.log(selectedFile);
    
    // selectedFile.forEach((element: any) => {
    //     console.log("* " + element);
    // });

    // this.loginService.cordova_test()
    //   .catch((err) => {
    //     console.log(err);
    //   })

    // this.loginService.createTemporarUserFolder()
    //   .subscribe((data: any) => {
    //     if (data) {
    //       console.log("Path: " + data);
    //       this.$_SERVER_PATH = data
    //     }
    //   }, (err) => {
    //     console.log(err);
    //   })


    // const fs = require('fs');
    // var dir = './tmp';
    //   if (! fs. existsSync(dir)){
    //   fs. mkdirSync(dir);
    // }
    
    // const reader = new FileReader()
    // reader.onload = () => {
    //   console.log("result file: " + reader.result);
    // }
    // reader.readAsDataURL(this.selectedFile)
  }  
}
