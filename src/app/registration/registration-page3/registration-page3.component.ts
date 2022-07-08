import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration-page3',
  templateUrl: './registration-page3.component.html',
  styleUrls: ['./registration-page3.component.css']
})
export class RegistrationPage3Component implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.sendRequestToActivateAccount()
  }

  sendRequestToActivateAccount() {
    console.log(String(localStorage.getItem('user_mail')));
    console.log(String(localStorage.getItem('user_name')));
    
    this.registrationService.sendMailForActivationAccount(
      String(localStorage.getItem('user_mail')), 
      String(localStorage.getItem('user_name')),
      String(localStorage.getItem('hashed_user_folder')),
      String(localStorage.getItem('user_avatar_photo'))
      )
      .subscribe((response: any) => {
          
          console.log(response);
        
          console.log("MESSAGE WAS SENT SUCCESSFULLY TO MAIL");
          // console.log(JSON.stringify(response));
          localStorage.removeItem('user_mail')
          localStorage.removeItem('user_name')
      }, (err) => {
        console.log("ERROR: " + JSON.stringify(err));
      })
  }

  @Output() step3CompleteEvent = new EventEmitter<boolean>()
  step2Complete() {
    this.step3CompleteEvent.emit(true)
  }
}
