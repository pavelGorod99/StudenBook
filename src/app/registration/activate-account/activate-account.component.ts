import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  // baseUrl = 'http://localhost/StudenBook/api'

  @Output() step1CompleteEvent = new EventEmitter<boolean>()
  step1Complete() {
    this.step1CompleteEvent.emit(true)
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['EMAIL'] == null) {
        this.router.navigate(['/login']);
      } else {
        if (sessionStorage.getItem('accountActivated') != null) {
          if (String(sessionStorage.getItem('accountActivated')) == "1") {
            this.$activatedAccount = true
            var spinner = document.getElementById('loadingDataSpinner')
            if (spinner) {
              spinner.style.setProperty('display', 'none', 'important')
            }
          }
        } else {
          this.activateUserAccount(params['EMAIL'], params['NAME'], params['FOLDER'], params['PHOTO'])
        }
      }
    })
  }

  ngOnDestroy() {
    localStorage.removeItem('accountActivated')
  }

  $userEmail = ''

  activateUserAccount($userEmail: string, $userName: string, $userFolder: string, $userPhoto: string) {
    this.$userEmail = $userEmail
    return this.http.post(`${environment.apiHost}/activate_user_account`, {
      userEmail: $userEmail, 
      userName: $userName, 
      userFolder: $userFolder, 
      userAvatarPhoto: $userPhoto
    }).subscribe((response: any) => {
      console.log(response);
      var spinner = document.getElementById('loadingDataSpinner')
      if (spinner) {
        spinner.style.setProperty('display', 'none', 'important')
        $("#liveToast1").toast('show');
        this.generateSmsCode($userEmail)
        localStorage.removeItem('hashed_user_folder')
        localStorage.removeItem('USER_AVATAR_PHOTO')
      }
    }, (err) => {
      console.log(JSON.stringify(err));
    })
  }
  
  generateSmsCode($userEmail: string) {
    return this.http.put(`${environment.apiHost}/send_sms_to_phone_number`, {
      userEmail: $userEmail
    }).subscribe((result) => {
      console.log("r: " + result);
    })
  }

  $activatedAccount = false

  $smsCode = ''
  $errMessage = ''
  confirmSmsCode() {
    var spinner = document.getElementById('loadingDataSpinner')
    if (spinner) {
      spinner.style.setProperty('display', 'flex', 'important')
    }
    // this.$userEmail = 'eugenia.cruppa1954@gmail.com'

    console.log('EMAIL:' + this.$userEmail);
    console.log('smsCode:' + this.$smsCode);
    
    
    let params = new HttpParams()
    params = params.set('userEmail', this.$userEmail)
    params = params.set('smsCode', this.$smsCode)
    return this.http.get(`${environment.apiHost}/confirm_phone_number`, {
      params: params
    }).subscribe((result: any) => {
      if (spinner) {
        spinner.style.setProperty('display', 'none', 'important')
      }
      console.log(result);
      if (result != null) {
        if (result == 0) {
          this.$errMessage = 'Confirmation code is wrong!'
        } else {
          this.$activatedAccount = true
          sessionStorage.setItem('accountActivated', String(1))
        }
      }
    }, (error) => {
      console.log(error);
    })
  }
}
