import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SectionContainerServiceService } from 'src/app/home/section-container/service/section-container-service.service';
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';
import { HomeService } from 'src/app/home/service/home.service';
import ShortUniqueId from 'short-unique-id';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  // $_LOCALHOST = 'http://localhost:'

  // $_API_PATH = '/StudenBook/api/'

  $_API_HOST = environment.apiHost

  $_FRIEND_LIST = new Array()

  constructor(private sectionContainerService: SectionContainerServiceService, private router: Router, private browserNavigationService: BrowserNavigationService, private homeService: HomeService) {

    browserNavigationService.load(router)

    this.updateFriendsStatus()
  }

  $_FRIEND_UPDATE_INTERVAL: any

  updateFriendsStatus() {
    this.$_FRIEND_UPDATE_INTERVAL = setInterval(() => {
      this.getFriends()
    }, 100);
  }

  $_CURRENT_COUNT_FL = -1

  getFriends() {

    const uid = new ShortUniqueId({ length: 16 }); 

    this.homeService.getListOfFriends(Number(sessionStorage.getItem('USER_ID')))
      .subscribe((data: any) => {
        console.log("FRIENDS: " + JSON.stringify(data));

        if (data != null) 
          if (this.$_CURRENT_COUNT_FL < data.length) {

            this.$_CURRENT_COUNT_FL = data.length

            this.$_FRIEND_LIST = data;

            this.$_FRIEND_LIST.forEach((element: any) => {
              element['elem_f_identif'] = uid()
            });
          }
      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  $_SHOW_FOC = true

  openOptions($_ID_ELEM: any) {

    var div_opt_container = <HTMLElement> document.getElementById("options-container-" + $_ID_ELEM);

    if (this.$_SHOW_FOC) {
      div_opt_container.style.display = "block"
      this.$_SHOW_FOC = false
    } else {
      div_opt_container.style.display = "none"
      this.$_SHOW_FOC = true
    }
  }

  openMessage() {

  }

  ngOnInit(): void {

  }

}
