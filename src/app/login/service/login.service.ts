import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // baseUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  test(){
    return this.http.post(`${environment.apiHost}/api/test.php`, {});
  }

  getUserLogin(login: string) {
    let params = new HttpParams()
    params = params.set('login', login)
    return this.http.get(`${environment.apiHost}/user_login`, {
      params: params
    })
  }

  // createTemporarUserFolder() {

  //   return this.http.post(`${environment.apiHost}test_create_folder_user.php`, {})
  //           .pipe(map((res: any) => {
  //             console.log("Response: " + res);
  //             return res;
  //           }))
  // }

  switchUserToOnlineMode($userId: number) {
    return this.http.post(`${environment.apiHost}/online_mode`, {userId: $userId})
  }

  testHttpGet() {
    this.http.post<any>(`${environment.apiHost}test_create_folder_user.php`, {}).subscribe(data => {
        console.log("DATA: " + JSON.stringify(data));
    })
  }

  // setUserLogInTime($userId: number) {
  //   this.http.post(`${environment.apiHost}set_user_log_in_time.php`, {_USER_ID: $userId})
  // }
}
