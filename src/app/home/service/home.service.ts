import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // baseUrl = 'http://localhost/StudenBook/api';

  constructor(private http: HttpClient) { }

  getListOfConversations(ID: Number) {
    return this.http.post(`${environment.apiHost}/api/get_conversation_list.php`, {_USER_ID: ID})
  }

  getUserInfo(ID: Number) {
    return this.http.post(`${environment.apiHost}/api/get_user_info.php`, {_USER_ID: ID})
  }

  getUserIncomingCallInfo(ID: Number) {
    return this.http.post(`${environment.apiHost}/api/get_user_income_call_info.php`, {_userId: ID})
  }

  

  // sendMessageToUser($userId: number, $_FRIEND_ID: number, $_MESSAGE: string) {
  //   return this.http.post(`${environment.apiHost}send_message_to_friend.php`, {_USER_ID: $userId, _FRIEND_ID: $_FRIEND_ID, _MESSAGE: $_MESSAGE})
  // }

  getAllMessages($userId: number, $_FRIEND_ID: number) {
    return this.http.post(`${environment.apiHost}get_all_messages.php`, {_USER_ID: $userId, _FRIEND_ID: $_FRIEND_ID})
  }

  search($inputParameters: string[], $userId: number, $showFrom: number, $showTo: number) {
    // let params = new HttpParams()
    // params = params.set('userId', $userId)
    // params = params.set('inputParameters', $inputParameters)
    // params = params.set('userId', $userId)
    // params = params.set('userId', $userId)
    return this.http.post(`${environment.apiHost}/search_people`, {inputParameters: $inputParameters, userId: $userId, showFrom: $showFrom, showTo: $showTo})
  }

  sendFriendhipRequest($userFrom: number, $userTo: number) {
    return this.http.post(`${environment.apiHost}/friendship_request`, {userFrom: $userFrom, userTo: $userTo})
  }

  cancelFriendshipRequest($userFrom: number, $userTo: number) {
    let params = new HttpParams()
    params = params.set('userFrom', $userFrom)
    params = params.set('userTo', $userTo)
    return this.http.delete(`${environment.apiHost}/cancel_friendship_request`, {params: params})
  }

  getNotifications($userId: number) {
    let params = new HttpParams()
    params = params.set('userId', $userId)
    return this.http.get(`${environment.apiHost}/get_notifications`, {params: params})
  }

  acceptFriendshipRequest($_ID_USER: number, $_ID_USER_TO: number, $_ACCEPT: boolean) {
    return this.http.put(`${environment.apiHost}/api/accept_friendship_request.php`, {_ID_USER: $_ID_USER, _ID_USER_TO: $_ID_USER_TO, _ACCEPT: $_ACCEPT})
  }

  getListOfFriends($_ID_USER: number) {
    return this.http.post(`${environment.apiHost}/api/gel_list_of_friends.php`, {_ID_USER: $_ID_USER})
  }

  setUserLogOutStatus($userId: number) {
    return this.http.put(`${environment.apiHost}/api/set_user_log_out_status.php`, {_USER_ID: $userId})
  }
}
