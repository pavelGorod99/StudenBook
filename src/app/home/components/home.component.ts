import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConversationsService } from '../nav-menu/menu-left-side/conversations/service/conversations.service';
import * as bootstrap from 'bootstrap';
import { HomeService } from '../service/home.service';
import { CallService } from '../nav-menu/menu-left-side/conversations/service/call.service';

declare var joinConf: any;

declare var streamID: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // $_LOCALHOST = 'http://localhost:'

  // $_API_PATH = '/StudenBook/api/'

  // baseUrl = this.$_LOCALHOST + this.$_API_PATH

  $userId = -999;

  $userProfileImage: string = 'assets/img/Studentbook_default_photo.png'

  $_USER_FULL_NAME = ''

  $_show_messenger = false

  baseUrl = environment.apiHost

  constructor(private location: LocationStrategy, 
              private route: Router, 
              private http: HttpClient,
              private conversationService: ConversationsService,
              private homeService: HomeService,
              private callService: CallService) {

    // history.pushState(null, '', window.location.href);  
    // this.location.onPopState(() => {
    //   history.pushState(null, 'null', window.location.href);
    //   route.navigate(['/home'])
    // }); 
    // sessionStorage.setItem('CURRENT_PATH', 'section')
    // console.log("CP: " + sessionStorage.getItem('CURRENT_PATH'));
     
  }

  $checkingForCallsInterval: any

  $callStatulLabel = ' calling you...'

  $friendName = ''
  $friendSurname = ''
  $friendAvatar = ''

  $callToken = ''

  $friendId = ''

  $incomingCallAudio: any

  $incomingCallModalElement: any
  $incomingCallModal: any

  ngAfterViewInit() {

    this.followForCalls()

    this.$incomingCallModalElement = document.getElementById('callIncomingModal') as HTMLDivElement

    if (this.$incomingCallModalElement) {
      this.$incomingCallModal = new bootstrap.Modal(this.$incomingCallModalElement)
    }

  }

  followForCalls() {

    console.log("CALLLLLLLLLLLL");

    this.callService.$checkingForCallsInterval = setInterval(() => {

      this.conversationService.checkForCalls(this.$userId)
        .subscribe((result: any) => {

          if (result != '' && result.friend_id != undefined) {

            if (result.status == 'PENDING') {

              console.log("CALLLLLLLLLLLL2");

              this.$callStatulLabel = ' calling you...'

              this.$friendId = result.user_id
              this.$callToken = result.token

              this.homeService.getUserIncomingCallInfo(Number(result['user_id']))
                .subscribe((userInfo: any) => {

                  console.log(userInfo);
                  
                  
                  if (userInfo.Name != undefined && this.callService.$userCalling) {

                    this.callService.setDivsForIncomingCall('none', 'block')
                    console.log("START CALL MODAL");
                    this.$friendName = userInfo.Name
                    this.$friendSurname = userInfo.Surname
                    this.$friendAvatar = this.baseUrl + '/api/' + userInfo.Avatar_Path

                    this.$incomingCallModal.show()
                    this.$incomingCallModalElement.classList.add('show')
                    this.$incomingCallModalElement.style.display = 'block'
                    this.$incomingCallModalElement.setAttribute('role', 'dialog')
                    this.$incomingCallModalElement.setAttribute('modal', 'true')
                    this.$incomingCallAudio = new Audio()
                    this.$incomingCallAudio.muted = true
                    this.$incomingCallAudio.src = '../../../assets/music/OnePlusIncomingRingtone.mp3'
                    this.$incomingCallAudio.load();
                    this.$incomingCallAudio.muted = false
                    this.$incomingCallAudio.play();
                    
                    this.continueIncomingCallRingtone()

                    this.callService.$userCalling = false
                  }
              })
            } else if (result.status == 'ENDCALL') {

              if (this.$incomingCallAudio) {
                this.$incomingCallAudio.pause();
                this.$incomingCallAudio.currentTime = 0;
                this.$incomingCallModal.hide()
                this.callService.$userCalling = true
              }
            }
          }
        })
    }, 2500)
  }

  continueIncomingCallRingtone() {

    this.callService.$continueIncomingCallsInterval = setInterval(() => {

        if(this.$incomingCallAudio.paused == false) {
          this.$incomingCallAudio.load();
          this.$incomingCallAudio.play();
        }

    }, 15000)
  }

  answerCall() {  

    this.$callStatulLabel = 'Connecting ...'
    
    this.conversationService.updateStatusCall(Number(this.$friendId), this.$userId, this.$callToken, 'ANSWERED')
      .subscribe((response) => {

        console.log(response);
        
        if (response == true) {

          this.$incomingCallAudio.pause();
          this.$incomingCallAudio.currentTime = 0;

          new joinConf(this.$callToken);

          this.checkIfBothStreamsAreConnected()

        }
    });
  }

  $videoCallContainer: any
  $incomingCallContainer: any

  checkIfFriendEndedCallBoolean = true

  checkIfBothStreamsAreConnected() {

    this.callService.$streamsAreConnectedInterval2 = setInterval(() => {

      if (!this.callService.$streamsAreConnected1) {

        this.callService.$incomingVideoCaller = document.getElementsByTagName("video")[0]
        this.callService.$incomingVideoReceiver = document.getElementsByTagName("video")[1]

        if (this.callService.$incomingVideoCaller && this.callService.$incomingVideoReceiver) {

          console.log("STREAMID: " + streamID)

          if (this.callService.$incomingVideoCaller.id.includes("local-media-incoming") && 
              this.callService.$incomingVideoReceiver.id == "remote-media-incoming-" + streamID) {

            this.callService.$streamsAreConnected1 = true

            this.callService.setDivsForIncomingCall('block', 'none')

            if (this.callService.$checkIfFriendEndedCallBoolean1) {
              
              this.callService.checkIfFriendEndedCall(
                
                this.$incomingCallModal, 
                this.callService.$incomingVideoCaller,
                this.callService.$incomingVideoReceiver,
                this.callService.$incomingVideoCallContainer, 
                this.callService.$incomingCallContainer,
                this.$callToken,
                0)

              this.callService.$checkIfFriendEndedCallBoolean1 = true
            }
          }
        }
      }

    }, 1000)
  }

  hangUpTheCall() {

    this.conversationService.updateStatusCall(Number(this.$friendId), Number(this.$userId), this.$callToken, 'ENDCALL')
      .subscribe((response) => {

        if (response == true) {

          // alert(response)

          this.$incomingCallAudio.pause();
          this.$incomingCallAudio.currentTime = 0;

          this.callService.closeVideoStramAndModal(
            this.$incomingCallModal,
            this.callService.$incomingVideoCaller,
            this.callService.$incomingVideoReceiver,
            this.callService.$incomingVideoCallContainer, 
            this.callService.$incomingCallContainer,
            0
          )
        }
      })
  }

  onDestroy() {
    this.$incomingCallAudio = null
  }

  ngOnInit(): void { this.init() }

  init(): void {

    

    // console.log("Initialization");

    this.getUserID()

    // console.log("user id " + this.USER_ID);
    
    this.setProfileInfo()

    this.setProfileImage()
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }

  getUserID() { 
    if (sessionStorage.getItem("USER_ID") == null) {
      this.goToLogin()
    }
    this.$userId = Number(sessionStorage.getItem("USER_ID"));
  }

  setProfileInfo() {
    this.$_USER_FULL_NAME = sessionStorage.getItem('USER_NAME') + ' ' + sessionStorage.getItem('USER_SURNAME')
  }

  setProfileImage() {

    this.homeService.getProfileImagePath(this.$userId)
      .subscribe((data: any) => {
      
      this.$userProfileImage = environment.apiHost + data;
      console.log("HOME PROFILE PHOTO: " + this.$userProfileImage);
      
    }, (err) => {

      console.log(JSON.stringify(err));
    });    
  }

  display_main_tab = true
  display_conversations = false

  showConversations() {
    this.display_main_tab = false
    this.display_conversations = true
  }
}
