import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  params = new HttpParams()

  constructor(private http: HttpClient) { }

  sendMessageToUser($userId: number, $friendId: number, $message: string) {
    return this.http.post(`${environment.apiHost}/send_message_to_user`, {
      userId: $userId, 
      friendId: $friendId, 
      message: $message
    })
  }

  searchConversation($input: string[]) {
    for (let i = 0; i < $input.length; i++) {
      this.params = this.params.set('inputParameters' + i, $input[i])
    }
    return this.http.get(`${environment.apiHost}/search_conversation`, {
      params: this.params
    })
  }

  getLastOneConversationFriend($userId: number) {
    this.params = this.params.set('userId', $userId)
    return this.http.get(`${environment.apiHost}/get_last_message`, {
      params: this.params
    })
  }

  getConversationMessages($userId: number, $friendId: number) {
    this.params = this.params.set('userId', $userId)
    this.params = this.params.set('friendId', $friendId)
    return this.http.get(`${environment.apiHost}/get_conversation_messages`, {
      params: this.params
    })
  }

  getLogInTime($userId: number) {
    this.params = this.params.set('userId', $userId)
    return this.http.get(`${environment.apiHost}/user_log_in_time`, {
      params: this.params
    })
  }

  sendCallRequest($userId: number, $friendId: number, $token: string) {
    return this.http.post(`${environment.apiHost}/send_call_request`, {
      userId: $userId, 
      friendId: $friendId, 
      token: $token
    })
  }

  updateStatusCall($userId: number, $friendId:number, $token: string, $status: string) {
    return this.http.post(`${environment.apiHost}/update_call_status`, {
      userId: $userId, 
      friendId: $friendId, 
      token: $token, 
      status: $status
    });
  }

  checkForCalls($userId: number) {
    this.params = this.params.set('userId', $userId)
    return this.http.get(`${environment.apiHost}/check_for_calls`, {
      params: this.params
    });
  }

  checkIfFriendStatus($userId: number, $friendId: number, $token: string, $status: string) {
    this.params = this.params.set('userId', $userId)
    this.params = this.params.set('friendId', $friendId)
    this.params = this.params.set('token', $token)

    let $route = ''

    if ($status == 'ANSWERED') {
      $route = '/check_if_friend_answered'
    } else if ($status == 'ENDCALL') {
      $route = '/check_if_friend_hangup'
    }

    return this.http.get(`${environment.apiHost}` + $route, {
      params: this.params
    });
  }

  checkIfFriendEndedCall($status: string, $token: string) {
    this.params = this.params.set('token', $token)
    this.params = this.params.set('status', $status)
    return this.http.get(`${environment.apiHost}/check_if_friend_who_called_finished_call`, {
      params: this.params
    });
  }
}
