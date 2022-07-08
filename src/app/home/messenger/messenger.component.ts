import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataSharingService } from 'src/app/data-sharing/data-sharing.service';
import { HomeComponent } from '../components/home.component';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  // isUserLoggedIn: boolean = false;

  constructor(private homeService: HomeService, private homeComponent: HomeComponent) { 
    // cd.detach();
    // setInterval(() => {
    //   this.cd.detectChanges();
    //   this.getFriendInfo()
    // }, 250);
    this.getFriendInfo()


  }

  ngOnInit(): void {
    

    // this.cd.detectChanges();
    // console.log("NAME " + this.$_U_NAME);
  }

  

  static $_FRIEND_ID = -999

  $_U_NAME = ''
  $_U_SURNAME = ''

  getFriendInfo() {
    console.log("FINAL ID: " + MessengerComponent.$_FRIEND_ID);
    if (MessengerComponent.$_FRIEND_ID != -999) {
      setInterval(()=>{
        this.homeService.getUserInfo(MessengerComponent.$_FRIEND_ID)
        .subscribe(
          (response: any) => {
            console.log("USER CONV: " + JSON.stringify(response));
            
            // this.dataSharingService.isUserLoggedIn.next(true);
            console.log(response['Name']);
            
            this.$_U_NAME = response['Name']
            this.$_U_SURNAME = response['Surname']
            this.homeComponent.$_show_messenger = true
            // this.cd.detectChanges();
            
          }, (err) => {
            console.log(JSON.stringify(err));
          }
        )
      }, 250);
    }
      
  }

}
