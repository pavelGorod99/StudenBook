import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DragScrollComponent } from 'custom_module/ngx-drag-scroll/src/public-api';
import { debounceTime, map, take } from 'rxjs/operators';
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../../../components/home.component';
import { HomeService } from '../../../service/home.service';
import * as $ from 'jquery';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConversationsService } from './service/conversations.service';
import { Observable, Subject } from 'rxjs';
import { TimeService } from 'src/app/time-service/time.service';

import * as bootstrap from 'bootstrap';

import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'
import { CallService } from './service/call.service';
import ShortUniqueId from 'short-unique-id';

// declare var name: any;

declare var joinConf: any;

declare var streamID: any;


interface MessageContent {

  date: string;
  time: string;
  content: {
    ID: number
    message: string
    time: string
  }
}

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit, AfterViewInit {

  @ViewChild("localVideo") videoRef!: ElementRef;

  conversationFormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required])
  });

  // get conversationNameFc(): FormControl {
  //   return this.conversationFormGroup.get('name') as FormControl;
  // }


  @ViewChild('chat_div') chat_div_element!: ElementRef;

  @ViewChild('div_root') div_root!: HTMLDivElement

  @ViewChild('char_paragraph') char_paragraph!: HTMLParagraphElement

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  @ViewChild('formChat') formChat!: FormControl;

  @ViewChild('nav', { read: DragScrollComponent, static: true }) ds!: DragScrollComponent;

  @ViewChild('scrollMe') scrollChat!: HTMLDivElement

  hideScrollbar:any;

  disabled:any;

  xDisabled:any;

  yDisabled:any;

  imagelist = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png',
    '15.png',
    '16.png',
    '17.png',
    '18.png',
    '19.png',
    '20.png',
    '21.png',
    '22.png',
    '23.png',
    '24.png',
    '25.png',
    '26.png',
    '27.png',
    '28.png',
    '29.png',
    '30.png'
  ];

  leftNavDisabled = false;

  rightNavDisabled = false;

  index = 0;

  $_FRIENDS_LIST = new Array()
  $_FRIEND_BackUp_LIST = new Array()

  $_FRIENDS_PHOTO: any

  // thumbnail: any

  _conversations = false

  $_U_NAME = ''

  $_U_SURNAME = ''

  $_MESSAGE = ''

  $_MESSAGE_LIST = new Array()

  $_FRIEND_ID = -1

  text = "";

  shiftEnterBool = false

  lastLineCount = 0

  result$!: Observable<any>
  subject = new Subject();

  baseUrl = environment.apiHost

  constructor(private elementRef: ElementRef, 
    private _ngZone: NgZone, 
    private homeService: HomeService, 
    private sanitizer: DomSanitizer, 
    private homeComponent: HomeComponent, 
    private router: Router, 
    private browserNavigationService: BrowserNavigationService, 
    private conversationService: ConversationsService,
    private cdref: ChangeDetectorRef,
    private timeService: TimeService,
    private fb: FormBuilder,
    private callService: CallService,
    private route: ActivatedRoute) {
      
    browserNavigationService.load(router)
  }

  $friendName = ''
  $friendSurname = ''
  $friendImage = ''
  $friendID = -1

  $audio: any

  $callStatus = ''

  $currentToken = ''

  $checkIfFriendAnsweredInterval: any

  $callStatulLabel = 'Calling ...'

  makeACall(friend: any) {

    console.log(friend);
    
    this.callService.$hideAllModalsAux = true

    this.$friendName = friend.Name
    this.$friendSurname = friend.Surname
    this.$friendImage = this.baseUrl + '/api/' + friend.Avatar_Path
    this.$friendID = Number(friend.ID)

    this.callService.setDivsForOutgoingCalls('none', 'block')

    this.$callStatulLabel = 'Calling ...'

    const uid = new ShortUniqueId({ length: 10 });

    this.$currentToken = uid();

    this.conversationService.sendCallRequest(this.$userId, Number(friend.ID), this.$currentToken) //+
      .subscribe((response) => {

        console.log(response);

        if (response == true) {
  
          this.$callStatus = 'PENDING'

          this.$audio = new Audio();
          this.$audio.src = '../../../../../assets/music/OutgoingiPhoneCall.mp3'
          this.$audio.load();
          this.$audio.play();
          this.$callingModalElement.style.display = 'block'
          this.modalBack()

          // let sidebarDivOverlay = document.getElementById('overlayDiv')!
          // sidebarDivOverlay.style.display = 'none'

          // let navbarsExampleDefault = document.getElementById('navbarsExampleDefault')!
          // navbarsExampleDefault.style.display = 'none'

          // $(".sideMenu, .overlay").hide()

          this.endCallIfDidntAnswer(Number(friend.ID), this.$currentToken)
          
          if (!this.callService.$friendAnswered) {

            this.callService.$checkIfFriendAnsweredInterval = setInterval(() => {

              if (this.callService.$turnOnCallerVideo) { //+
                // alert(1)
                this.checkIfFriendAnswered(this.$userId, Number(friend.ID), this.$currentToken)
                this.checkIfFriendHungUpCall(this.$userId, Number(friend.ID), this.$currentToken)
              }

            }, 1000)

          }
        }
      })
  }

  checkIfFriendHungUpCall($userId: number, $friendId: number, $token: string) {
    this.conversationService.checkIfFriendStatus($userId, $friendId, $token, 'ENDCALL')
      .subscribe((response) => {
        if (response == true) {

          document.getElementById('mobileDesktopNavbar')!.style.display = 'block'

          document.getElementById('shadowDiv')!.style.display = 'none'

          this.$audio.pause();
          this.$audio.currentTime = 0;
          this.$callingModal.hide();
          this.$callingModalElement.classList.remove('show')
          this.$callingModalElement.style.display = 'none'

          this.callService.$friendAnswered = true

          this.callService.initOutgoingParameters()

          var modalsForDelete = document.querySelectorAll('.modal-backdrop')
  
          modalsForDelete.forEach(box => {
            box.remove();
          });

          clearInterval(this.callService.$checkIfFriendAnsweredInterval);
        }
      })
  }

  checkIfFriendAnswered($userId: number, $friendId: number, $token: string) {

    this.conversationService.checkIfFriendStatus($userId, $friendId, $token, 'ANSWERED')
      .subscribe((response: any) => {

          if (response == true && this.callService.$turnOnCallerVideo) {

            this.$audio.pause();
            this.$audio.currentTime = 0;

            this.$callStatulLabel = "Connecting ..."

            new joinConf($token);

            this.callService.$friendAnswered = true
            this.callService.$turnOnCallerVideo = false
   
            this.checkIfBothStreamsAreConnected()
          }
      })
  }

  $directVideoCallContainer: any
  $outgoingCallContainer: any

  checkIfBothStreamsAreConnected() {

    this.callService.$streamsAreConnectedInterval = setInterval(() => {

      if (!this.callService.$streamsAreConnected) {

        this.callService.$outgoingVideoCaller = document.getElementsByTagName("video")[0]
        this.callService.$outgoingVideoReceiver = document.getElementsByTagName("video")[1]

        if (this.callService.$outgoingVideoCaller && this.callService.$outgoingVideoReceiver) {

          if (this.callService.$outgoingVideoCaller.id.includes("local-media-incoming") && 
              this.callService.$outgoingVideoReceiver.id == "remote-media-incoming-" + streamID) {

            this.callService.$streamsAreConnected = true

            this.callService.setDivsForOutgoingCalls('block', 'none')

            if (this.callService.$checkIfFriendEndedCallBoolean) {
              
              this.callService.checkIfFriendEndedCall(

                this.$callingModal, 
                this.callService.$outgoingVideoCaller, 
                this.callService.$outgoingVideoReceiver, 
                this.callService.$outgoingVideoContainer, 
                this.callService.$outgoingCallContainer, 
                this.$currentToken, 
                1)

              this.callService.$checkIfFriendEndedCallBoolean = false
            }
          }
        }
      }
    }, 1000);
  }

  endCallIfDidntAnswer($friendID: number, $token: string) {

    this.callService.$outgoingCallTimeout = setTimeout(() => {

      if (this.$callStatus == 'PENDING' && !this.$audio.paused) {
        this.conversationService.updateStatusCall(this.$userId, $friendID, $token, 'ENDCALL')
          .subscribe((response) => {
            console.log(response);
          })

        this.$callStatulLabel = 'Call ended ...'
        this.$callStatus = 'ENDCALL'
        this.$audio.pause()


        clearInterval(this.callService.$outgoingCallTimeout);
      }
      
    }, 54000)
    
  }

  hangUpTheCall() {

    this.conversationService.updateStatusCall(this.$userId, this.$friendID, this.$currentToken, 'ENDCALL')
      .subscribe((response) => {
        if (response == true) {
          this.endAudioAndCloseModal()
        } 
      })
  }

  endAudioAndCloseModal() {
    this.$audio.pause();
    this.$audio.currentTime = 0;

    document.getElementById('mobileDesktopNavbar')!.style.display = 'block'

    document.getElementById('shadowDiv')!.style.display = 'none'
    
    this.callService.closeVideoStramAndModal(
      
      this.$callingModal, 
      this.callService.$outgoingVideoCaller, 
      this.callService.$outgoingVideoReceiver, 
      this.callService.$outgoingVideoContainer, 
      this.callService.$outgoingCallContainer, 
      1)

    if(this.callService.$outgoingCallTimeout) {
      clearTimeout(this.callService.$outgoingCallTimeout)
    }
  }

  $callingModalElement: any
  $callingModal: any

  ngAfterViewInit() { 
    this.$callingModalElement = document.getElementById('staticBackdrop')
    if (this.$callingModalElement) {
      this.$callingModal = new bootstrap.Modal(this.$callingModalElement)
    }
  }

  modalBack() {
    document.getElementById('mobileDesktopNavbar')!.style.display = 'none'

    var modalsForDelete = document.querySelectorAll('.modal-backdrop')
  
    modalsForDelete.forEach(box => {
      box.remove();
    });

    document.getElementById('shadowDiv')!.style.display = 'block'
  }

  subscribe: any

  ngOnInit(): void {

    if (this.route.snapshot.queryParamMap.get("ID")) {
      this.clickItem(this.route.snapshot.queryParamMap.get("ID"))
    } else {
      this.getLastConversation()
    }

    this.getPeopleConversationData()

    this.getUserLogInTime()

    this.result$ = this.subject.pipe(
      debounceTime(500),
      map(searchConversations => {

        console.log(searchConversations);
        if (String(searchConversations)[0] != ' ') {
          this.getDataBySearchingConversation(String(searchConversations))
        }
      })
    )
  }

  $_USER_LOGIN_TIME!: Date;

  getUserLogInTime() {
    this.conversationService.getLogInTime(Number(sessionStorage.getItem('USER_ID')))
      .subscribe((result:any) => {
        this.$_USER_LOGIN_TIME = new Date(result['user_log_in_time'])
        console.log(this.$_USER_LOGIN_TIME);
        
      })
  }

  ngAfterContentChecked() {
    this.updateTextAreaTopScroll()
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  $spinner = false

  $currentID = -1

  clickItem(ID:any) {

    if (ID != this.$currentID) {

      this.$currentID = ID;

      this.$spinner = true

    console.log("FRIEND ID: " + ID);

    if (this.$idComponent) {
      clearInterval(this.$idComponent);
    }
    
    this.homeService.getUserInfo(ID)
      .subscribe(user_details => {
        this.$_CONVERSATION_DETAILS = user_details
        this.conversationService.getConversationMessages(Number(sessionStorage.getItem('USER_ID')), ID)
          .subscribe((result: any) => {
            if (result) {
              if (result.length == 0) {
                document.getElementById('noMessagesContainer')!.style.display = 'flex'
              } else {
                document.getElementById('noMessagesContainer')!.style.display = 'none'
              }
            }
            this.getConversation(ID)
          })
      })
    }
  }

  updateTextAreaTopScroll() {
    if (this.scrollChat) {
      this.scrollChat.scrollTop = this.scrollChat.scrollHeight
    }
    
    this.cdref.detectChanges();
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }

  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }

  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(idx: number) {
    this.ds.moveTo(idx);
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onIndexChanged(idx:any) {
    this.index = idx;
  }

  onKeydown(event:any){
    event.preventDefault();
  }

  getChat($userId: number, $_FRIEND_ID: number) {
    this.homeService.getAllMessages($userId, $_FRIEND_ID)
      .subscribe((response: any) => {
          console.log(JSON.stringify(response));
          this.$_MESSAGE_LIST = response;
          this._conversations = true
      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  onKeydownSearchConversation(event: any) {
    console.log(event.target.value + ' *');
    this.subject.next(event.target.value)
  }

  clearSearch(event: any) {
    if (event.target.value == '' && this.$_FRIEND_BackUp_LIST.length > 0) {
      this.$_FRIENDS_LIST = this.$_FRIEND_BackUp_LIST
      this.$_FRIEND_BackUp_LIST = []
    }
  }

  getDataBySearchingConversation($_SEARCH_TEXT: string) {

    console.log($_SEARCH_TEXT.length);

    if ($_SEARCH_TEXT.length == 0 && this.$_FRIEND_BackUp_LIST.length > 0) {
      this.$_FRIENDS_LIST = this.$_FRIEND_BackUp_LIST
    }
    
    let searchResults = $_SEARCH_TEXT.split(' ')

    let i = 0
    searchResults.forEach(
      e => {
       if (e == ' ' || e == '') searchResults.splice(i, 1)
       i++;
      }
    )
    
    if (searchResults.length > 0)
      this.conversationService.searchConversation(searchResults)
        .subscribe((results: any) => {
          console.log(results);
          // if (results.length > 0) {
            this.$_FRIEND_BackUp_LIST = this.$_FRIENDS_LIST
            this.$_FRIENDS_LIST = results
          // }
        })
  }

  $messages = new Array()

  sendMessage(event: any) {

    let $message = ''

    let messContainer = document.getElementById('m_div')!
    let textInputDivHeight = document.getElementById('textInputDiv')!.clientHeight

    if (event.type == 'click') {
      $message = $("#spanMessage").html()
    } else {
      $message = event.target.textContent
    }

    if (event.repeat) {
      if (event.keyCode == 8 && $message == '') {
        let el = document.getElementById('block-1')
        if (el) el.innerHTML = '<br>'
        event.preventDefault();
      }
    }

    if (event.keyCode == 8 && $message == '') {

      messContainer.style.height = (300 - ((textInputDivHeight - 24) - 45)) + 'px'

      let el = document.getElementById('block-1')
      if (el) el.innerHTML = '<br>'
      event.preventDefault();

    } else if (event.keyCode == 13 && event.shiftKey) {
      
      messContainer.style.height = (300 - ((textInputDivHeight + 24) - 45)) + 'px'

      this.updateTextAreaTopScroll()

    } else if (event.keyCode == 13 || event.type == 'click') {

      let now = new Date(Date.now())
      let current_year = now.getFullYear()
      let current_month = this.timeService.padTo2Digits(now.getMonth() + 1)
      let current_date = this.timeService.padTo2Digits(now.getDate())
      let date = current_year + '-' + current_month + '-' + current_date

      // trimit mesajul
      //  - verific daca data si ora de logare == cu data si ora de logare din ultimul mesaj atasat
      //  - daca nu ete egal, atunci inserez in $messages la sfarsit un nou rand pt ora curenta
      //    - dupa fac request la server si trmit mesajul
      //      - daca sa transmis cu success atunci fac update la $messages
      let time1 = new Date();
      if (this.$messages.length > 0)
        time1 = new Date(this.$messages[this.$messages.length - 1]['date'] + ' ' + this.$messages[this.$messages.length - 1]['time'])
      
      let firstMessage = time1 < this.$_USER_LOGIN_TIME

      

      if (firstMessage || this.$messages.length == 0) {

        this.$messages.push({
          'date': date,
          'time': now.getHours() + ':' + now.getMinutes(),
          'content': [{
            'ID': Number(sessionStorage.getItem('USER_ID')),
            'message': $message,
            'time': now.getHours() + ':' + now.getMinutes()
          }]
        })
      }

      console.log(this.$messages);


      // console.log(this.$messages);

      // this.cdref.detectChanges();
      
      this.conversationService.sendMessageToUser(Number(sessionStorage.getItem('USER_ID')), this.$_CONVERSATION_DETAILS['ID'], $message)
        .subscribe(response => {

          console.log(response)
          
        })

      let el = document.getElementById('block-1')
      if (el) el.innerHTML = '<br>'
      event.preventDefault();
    }
  }

  getPeopleConversationData() {

    console.log("USER ID: " + Number(sessionStorage.getItem('USER_ID')));
    

    this.homeService.getListOfConversations(Number(sessionStorage.getItem('USER_ID')))
      .subscribe((response: any) => {
        
        // console.log(JSON.stringify(response));
        console.log(response);
        
        this.$_FRIENDS_LIST = response;

        // let objectURL = 'data:image/jpeg;base64,' + response[0]['Avatar_Path'].image;
        // this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        // console.log(this.thumbnail);
        
      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  $_CONVERSATION_DETAILS: any

  $now: any

  // padTo2Digits(num: number) {
  //   return num.toString().padStart(2, '0');
  // }

  // formatDate(date: Date) {
  //   return (
  //     [
  //       date.getFullYear(),
  //       this.padTo2Digits(date.getMonth() + 1),
  //       this.padTo2Digits(date.getDate()),
  //     ].join('-') +
  //     ' ' +
  //     [
  //       this.padTo2Digits(date.getHours()),
  //       this.padTo2Digits(date.getMinutes()),
  //       this.padTo2Digits(date.getSeconds()),
  //     ].join(':')
  //   );
  // }

  $userId = 0

  cleanTextArea() {
    const div = document.querySelector('.root');
    const paragraph = document.getElementById('block-1');
    if (div && paragraph) {
      div.addEventListener(
        'input',
        (event) => {
          if (event.target) {
            let el = <HTMLInputElement>event.target;
            if (!el.contains(paragraph)) {
              div.insertBefore(paragraph, div.firstChild);
            }
          }
        },
        false
      );
    }
  }

  fillChat(response: any) {
    this.$messages = response
    // console.log(this.$messages.length);
    
    this.$now = this.timeService.formatDate(new Date(Date.now()))
    this.$userId = Number(sessionStorage.getItem('USER_ID'))
  }

  $idComponent: any;

  ngOnDestroy() {
    if (this.$idComponent) {
      clearInterval(this.$idComponent);
    }
    this.$audio = null;

    // if (this.$ringtoneCall) {
    //   clearInterval(this.$ringtoneCall);
    // }

    if(this.callService.$outgoingCallTimeout) {
      clearTimeout(this.callService.$outgoingCallTimeout)
    }
  }

  getConversation($friendId: number) {
    this.$idComponent = setInterval(() => {
      let $userId = Number(sessionStorage.getItem('USER_ID'))
      this.conversationService.getConversationMessages($userId, $friendId)
      .subscribe((response: any) => {
        // console.log(response);

        if (response) {
          if (response.length == 0) {
            document.getElementById('noMessagesContainer')!.style.display = 'flex'
          } else {
            document.getElementById('noMessagesContainer')!.style.display = 'none'
          }
        }
        
        this.$spinner = false
        this.fillChat(response)
        this.updateTextAreaTopScroll()
      })
    }, 500)
  }

  getLastConversation() {
    this.conversationService.getLastOneConversationFriend(Number(sessionStorage.getItem('USER_ID')))
      .subscribe((response: any) => {
        console.log(response);
        if (response != null) {
          this.$_CONVERSATION_DETAILS = response
          this.getConversation(response['ID'])
        }
      })
  }



}
