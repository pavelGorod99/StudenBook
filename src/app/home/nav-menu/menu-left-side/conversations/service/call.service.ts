import { Injectable } from '@angular/core';
import { ConversationsService } from './conversations.service';

declare var endCall: any;

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private conversationService: ConversationsService) { }

  // VARIABLES FOR OUTGOING CALL

  $outgoingCallStatusLabel = 'Calling ...'

  $outgoingVideoContainer: any
  $outgoingCallContainer: any

  $checkIfFriendAnsweredInterval:any
  $outgoingCallTimeout:any

  $streamsAreConnectedInterval: any

  $outgoingVideoCaller: any
  $outgoingVideoReceiver: any

  setDivsForOutgoingCalls($property1: string, $property2: string) {

    this.$outgoingVideoContainer = document.getElementById('directVideoCallContainer')

    if (this.$outgoingVideoContainer) {
      this.$outgoingVideoContainer.style.display = $property1
    }

    this.$outgoingCallContainer = document.getElementById('outgoingCallContainer')

    if (this.$outgoingCallContainer) {
      this.$outgoingCallContainer.style.display = $property2
    }

  }

  initOutgoingParameters() {

    this.$friendAnswered = false

    clearInterval(this.$checkIfFriendAnsweredInterval)

    clearTimeout(this.$outgoingCallTimeout)

    this.$turnOnCallerVideo = true

    this.$checkIfFriendEndedCallBoolean = true

    clearInterval(this.$streamsAreConnectedInterval)

    this.$streamsAreConnected = false
  }

  removeOutgingVideoElements() {
    // alert(this.$outgoingVideoCaller)
    // this.$outgoingVideoCaller.remove()
    var lco = document.getElementById('local-container-outgoing')
    if (lco) {
      lco.innerHTML = ''
    }

    var rco = document.getElementById('remote-container-outgoing')
    if (rco) {
      rco.innerHTML = ''
    }
    // this.$outgoingVideoReceiver.remove()
  }

  $userCalling = true

  $friendAnswered = false

  $turnOnCallerVideo = true

  $streamsAreConnected = false

  $checkIfFriendEndedCallBoolean = true

  $callStatulLabel = ' calling you...'

  $hideAllModalsAux = true

  closeVideoStramAndModal(
    
    $callingModal: any, 
    $video1: any, 
    $video2: any, 
    $videoCallContainer: any, 
    $callContainer: any,
    $side: number) {

    $callingModal.hide();

    if ($video1 && $video2) {
      if ($video1.id.includes("local-media-incoming") && $video2.id.includes("remote-media-incoming")) {

        $videoCallContainer.style.display = 'none'
        $callContainer.style.display = 'block'
  
  
        if ($side == 1) { // CALLER
  
          this.initOutgoingParameters()
          this.removeOutgingVideoElements()
  
        } else {
  
          this.initIncomingParameters()
          this.removeIncomingVideoElements()
        }
  
        if (this.$hideAllModalsAux) {
          var modalsForDelete = document.querySelectorAll('.modal-backdrop')
  
          modalsForDelete.forEach(box => {
            box.remove();
          });
  
          this.$hideAllModalsAux = false
        }
        
  
        setTimeout(() => {
          new endCall();
        }, 1000)
  
        clearInterval(this.$checkIdFriendEndedCallInterval)
      }
    }
  }

  $checkIdFriendEndedCallInterval: any
  checkIfFriendEndedCall(

    $callingModal: any, 
    $video1: any, 
    $video2: any, 
    $videoCallContainer: any, 
    $callContainer: any, 
    $currentToken: string,
    $side: number) {

    this.$checkIdFriendEndedCallInterval = setInterval(() => {

      this.conversationService.checkIfFriendEndedCall('ENDCALL', $currentToken)
        .subscribe((response) => {

          console.log("FRIEND ENDED THE CALL");
          console.log(response);
          
          if (response == true) {

          // alert(response)


            this.closeVideoStramAndModal($callingModal, $video1, $video2, $videoCallContainer, $callContainer, $side)

            // if(this.$checkIdFriendEndedCallInterval) {
            //   clearTimeout(this.$checkIdFriendEndedCallInterval)
            // }
          }
        })
    }, 1000)
  }

  // VARIABLES FOR INCOMING CALL

  $incomingVideoCaller: any
  $incomingVideoReceiver: any

  $continueIncomingCallsInterval: any

  $incomingVideoCallContainer: any
  $incomingCallContainer: any

  setDivsForIncomingCall($property1: string, $property2: string) {

    this.$incomingVideoCallContainer = document.getElementById('videoCallContainer')
    if (this.$incomingVideoCallContainer) {
      this.$incomingVideoCallContainer.style.display = $property1
    }

    this.$incomingCallContainer = document.getElementById('incomingCallContainer')
    if (this.$incomingCallContainer) {
      this.$incomingCallContainer.style.display = $property2
    }

  }

  $incomingCallStatulLabel = ' calling you...'

  $checkingForCallsInterval: any

  $streamsAreConnectedInterval2: any

  $streamsAreConnected1 = false

  $checkIfFriendEndedCallBoolean1 = true

  initIncomingParameters() {

    // clearInterval(this.$checkingForCallsInterval)

    this.$userCalling = true

    clearInterval(this.$continueIncomingCallsInterval)

    clearInterval(this.$streamsAreConnectedInterval2)

    this.$streamsAreConnected1 = false

    this.$checkIfFriendEndedCallBoolean1 = true

    clearInterval(this.$continueIncomingCallsInterval);
  }

  removeIncomingVideoElements() {

    var lci = document.getElementById('local-container-incoming')
    if (lci) {
      lci.innerHTML = ''
    }

    var rci = document.getElementById('remote-container-incoming')
    if (rci) {
      rci.innerHTML = ''
    }
  }



  



  
}
