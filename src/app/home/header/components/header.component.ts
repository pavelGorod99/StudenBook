import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { time } from 'console';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { SectionContainerServiceService } from '../../section-container/service/section-container-service.service';
import { HomeService } from '../../service/home.service';
import { SearchResultService } from '../search-result-service/search-result.service';
import { SearchTextService } from '../search-result-service/search-text.service';
import ShortUniqueId from 'short-unique-id';
import { environment } from 'src/environments/environment';

$(document).ready( function () {
  $(".sidebarNavigation .navbar-collapse")
  .hide()
  .clone()
  .appendTo("body")
  .removeAttr("class")
  .addClass("sideMenu")
  .show(),
  $("body")
  .append("<div class='overlay'></div>"),
  $(".sideMenu")
  .addClass(
    $(".sidebarNavigation").attr("data-sidebarClass")!),
    $(".navbar-toggle, .navbar-toggler").on("click", function () {
      $(".sideMenu, .overlay").toggleClass("open"),
      $(".overlay").on("click", function () {
        $(this).removeClass("open"),
        $(".sideMenu").removeClass("open")
      })
    }),
    $("body").on("click",".sideMenu.open .nav-item", function () {
      $(this).hasClass("dropdown") || $(".sideMenu, .overlay").toggleClass("open")
    }),
    $(window).resize( function () { 
      $(".navbar-toggler").is(":hidden") ? $(".sideMenu, .overlay").hide() : $(".sideMenu, .overlay").show()
    })
  });

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {

  results$!: Observable<any>;
  subject = new Subject()

  // $_LOCALHOST = 'http://localhost:'

  // $_API_PATH = '/StudenBook/api/'

  $_API_HOST = environment.apiHost

  constructor(private router: Router, private http: HttpClient, private homeService: HomeService, private dataResult: SearchResultService, private sectionContainerService: SectionContainerServiceService, public searchText: SearchTextService) { 

    // if (sessionStorage.getItem('CURRENT_TEXT_SEARCH') != null)
    // (<HTMLInputElement>document.getElementById('search_bar')).value = String(sessionStorage.getItem('CURRENT_TEXT_SEARCH'))
    // environment.apiHost
     
  }

  resultData: any

  clearSearch($event: any) {
    console.log(this.$_SEARCH_TEXT);
    this.dataResult.$_SEARCH_FINISHED = false
    this.dataResult.resultsContainer(false)
  }

  $_SHOW_NC = true

  showNotificationContainer() {
    var notif_div = <HTMLElement> document.getElementById("notification_container");
    if (this.$_SHOW_NC) {
      notif_div.style.display = "block"
      this.$_SHOW_NC = false
    } else {
      notif_div.style.display = "none"
      this.$_SHOW_NC = true
    }
  }

  $_NOTIF_COUNT = -1

  $_NOTIF_LIST = new Array()

  $idComponent: any;

  ngOnDestroy() {
    if (this.$idComponent) {
      clearInterval(this.$idComponent);
    }
  }

  getNotifications() {
    // console.log("getNotifications");

    const uid = new ShortUniqueId({ length: 16 }); 

    this.$idComponent = setInterval(() => {

      this.homeService.getNotifications(Number(sessionStorage.getItem('USER_ID'))).pipe(take(1))
      .subscribe((data: any) => {
        // console.log("NOTIFICATIONS: " + JSON.stringify(data));
        // alert(1)
        if (data != null) {
          if (this.$_NOTIF_COUNT < data.length) {
            this.$_NOTIF_COUNT = data.length;
            // alert(this.$_NOTIF_COUNT)
            var count_div = <HTMLElement> document.getElementById("notif_countDiv");
            if (count_div != null)
              count_div.style.display = "block"

            this.$_NOTIF_LIST = data;

            this.$_NOTIF_LIST.forEach((element: any) => {
              element['spec_num_notif'] = uid()
            });
          }
        } else {
          this.$_NOTIF_COUNT = -1
          this.$_NOTIF_LIST = new Array()
        }
      }, (err) => {
        console.log(JSON.stringify(err));
      })

      // this.getNotifications()
    }, 500)
  }

  acceptFriendship($_FRIEND_ID: number, $_ACCEPT: boolean, $_NOTIF: any) {

    let $_ACCEPT_F = false

    if ($_ACCEPT) $_ACCEPT_F = true

    this.homeService.acceptFriendshipRequest(Number(sessionStorage.getItem('USER_ID')), $_FRIEND_ID, $_ACCEPT_F)
      .subscribe((result) => {
        console.log("FRIENDSHIP WAS ACCEPTED: " + JSON.stringify(result));
        console.log("DIV ID: " + 'friendship_req_btn' + $_NOTIF['spec_num_notif']);
        
        var div = <HTMLInputElement> document.getElementById('friendship_req_btn' + $_NOTIF['spec_num_notif']);
        div.style.display = 'none'

        this.$_NOTIF_LIST.forEach((element,index)=>{
          if(element==$_NOTIF) this.$_NOTIF_LIST.splice(index,1);
       });

        this.$_NOTIF_COUNT = this.$_NOTIF_LIST.length
        console.log("$_NOTIF_COUNT: " + this.$_NOTIF_COUNT);
        

      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  rejectFriendship($_FRIEND_ID: number) {

  }

  ngOnInit(): void {

    this.$_SEARCH_TEXT = '1';
    this.getNotifications()

    // if (sessionStorage.getItem('CURRENT_TEXT_SEARCH') != null)
    // (<HTMLInputElement>document.getElementById('search_bar')).value = String(sessionStorage.getItem('CURRENT_TEXT_SEARCH'))
    this.dataResult.data.subscribe(resultData => this.resultData = resultData)

    this.results$ = this.subject.pipe(
      debounceTime(500),
      map(searchText => {
        console.log("RESULT: " + searchText)

        // if (!this.dataResult.$_SEARCH_FINISHED) {

          if (String(searchText)[0] != ' '){

            this.getDataBySearching(String(searchText), true)
          }


        // }
      })
    )
  }

  $_SHOW_FROM = 0

  $_SHOW_T0 = 14

  getDataBySearching($_SEARCH_TEXT: string, $_DISPLAY_RESULT_POPUP: boolean) {

    let searchResults: string[]

    if (!this.dataResult.$_SEARCH_FINISHED)
      searchResults = String($_SEARCH_TEXT).split(' ')
    else searchResults = String(this.dataResult.$_CURRENT_TEXT).split(' ')

    for (let i = 0; i < searchResults.length; i++)
      if (searchResults[i] == ' ' || searchResults[i] == '')
        searchResults.splice(i, 1)

      if (searchResults.length > 0) {

        this.homeService.search(searchResults, Number(sessionStorage.getItem('USER_ID')), this.dataResult.$_SHOW_FROM, this.dataResult.$_SHOW_TO)
          .subscribe((results) => {

            console.log(results);
            console.log("RESULTS GET DATA: " + JSON.stringify(results));
            
            if (this.dataResult.$_SEARCH_FINISHED)
              this.dataResult.getLastData(results)
            else this.dataResult.getData(results)

            if (!this.dataResult.$_SEARCH_FINISHED)

              if ($_DISPLAY_RESULT_POPUP)
                this.dataResult.resultsContainer(true)
              else this.dataResult.resultsContainer(false)

          }, (err) => {
            console.log(JSON.stringify(err));
          })
      }
        
      else {
        
        if (!this.dataResult.$_SEARCH_FINISHED)
          if ($_DISPLAY_RESULT_POPUP) 
            this.dataResult._noDataFound(true)
          else this.dataResult._noDataFound(false)
      }
  }

  searchForSpace(element: string){
    return element == ''
  }

  $_SEARCH_TEXT = ''

  onKeydownSearch($event: any) {
    console.log("TEXTE ENTER 2");
    console.log(this.$_SEARCH_TEXT);
    if (this.dataResult.$_CURRENT_TEXT != $event.target.value)
      this.dataResult.$_SEARCH_FINISHED = false
    const searchText = $event.target.value
    this.subject.next(searchText)
  }

  $_SEARCH_FINISHED = false


  // $_CURRENT_TEXT = ''

  onKeydown($event:any){
    console.log("TEXTE ENTER");
    // , { queryParams: { q: $event.target.value }}
    sessionStorage.setItem("CURRENT_TEXT_SEARCH", $event.target.value)

    this.router.navigate(['/home/searching-results'], { queryParams: { q: $event.target.value }})
    this.sectionContainerService.displayItem('searching_results')
    sessionStorage.setItem('CURRENT_PATH', 'searching_results')
    this.dataResult.$_SEARCH_FINISHED = true
    sessionStorage.setItem('SEARCH_FINISHED', 'true')
    this.dataResult.resultsContainer(false)
    this.dataResult.$_CURRENT_TEXT = $event.target.value
    sessionStorage.setItem('CURRENT_TEXT', $event.target.value)
    this.getDataBySearching($event.target.value, false)
    $event.preventDefault();
  }

  $_FULL_NAME_USER = ''

  setFullNameUser() {
    this.$_FULL_NAME_USER = sessionStorage.getItem('USER_NAME') + ' ' + sessionStorage.getItem('USER_SURNAME')
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.homeService.setUserLogOutStatus(Number(sessionStorage.getItem('USER_ID')))
      .subscribe(result => {
        
        console.log("USER OFFLINE: " + result);

        sessionStorage.removeItem('USER_ID')
        sessionStorage.removeItem('USER_NAME')
        sessionStorage.removeItem('USER_SURNAME')
        sessionStorage.removeItem('USER_PASSWORD')
        sessionStorage.removeItem('CURRENT_PATH')
        
        this.goToLogin()

      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  goToMain() {
    sessionStorage.setItem('CURRENT_PATH', 'section')
  }

}
