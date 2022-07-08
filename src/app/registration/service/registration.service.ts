import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  params = new HttpParams()

  constructor(private http: HttpClient) { }

  // getCityList($idCountry: number, $path: string) {
  //   this.params = this.params.set('idCountry', $idCountry)
  //   return this.http.get(`${environment.apiHost}/` + $path, {params: this.params})
  // }

  // getUniversityList($idCity: number) {
  //   this.params = this.params.set('idCity', $idCity)
  //   return this.http.get(`${environment.apiHost}/get_university_list`, {params: this.params})
  // }

  // getFacultyList($idCity: number) {
  //   this.params = this.params.set('idCity', $idCity)
  //   return this.http.get(`${environment.apiHost}/get_university_list`, {params: this.params})
  // }

  test(){
    return this.http.get(`${environment.apiHost}/test`, {});
  }

  helloPut() {
    return this.http.put(`${environment.apiHost}/test1`, {})
  }

  helloPost() {
    return this.http.post(`${environment.apiHost}/test2`, {})
  }

  getListData($parameters: any[], $path: string) {
    for(let i = 0; i < $parameters.length; i++) {
      this.params = this.params.set($parameters[i]['name'], $parameters[i]['value'])
    }
    // this.params = this.params.set($paramName, $paramValue)
    return this.http.get(`${environment.apiHost}/` + $path, {params: this.params})
  }

  getList($query: string) {
    return this.http.post(`${environment.apiHost}get_list.php`, {_QUERY : $query})
              .pipe(map((res: any) => {

                console.log("response: " + res);

                return res;
              }))
  }

  getCountryList() {

    return this.http.get(`${environment.apiHost}/get_country_list`)

    // return this.http.post(`${environment.apiHost}get_country_list.php`, {})
    //         .pipe(map((res: any) => {

    //           console.log("response: " + res);

    //           return res;
    //         }))
  }

  checkIfUserExists($email: string) {
    this.params.set('email', $email)
    return this.http.get(`${environment.apiHost}/check_if_user_exists`, {params: this.params})
  }

  getUserID($query: string) {

    return this.http.post(`${environment.apiHost}getUserID.php`, {_QUERY: $query})
      .pipe(map((res: any) => {

        console.log("response: " + JSON.stringify(res));
        return res
      }))
  }

  getUserIDByEmail($email: string) {
    this.params = this.params.set('email', $email)
    return this.http.get(`${environment.apiHost}/get_user_id_by_email`, {params: this.params})
  }

  createObject($objectDetails: any, $path: string) {
    return this.http.post(`${environment.apiHost}/` + $path, {objectDetails: $objectDetails})
  }

  insertData($query: string) {
    
    return this.http.post(`${environment.apiHost}insert_into_db.php`, {_QUERY: $query}).pipe(
      map((res: any) => {
        console.log("response: " + res);
        return res
      }),
      catchError(this.handleError)
    )
  }

  uploadUserPhoto($userPhotoObject: any) {
    return this.http.post(`${environment.apiHost}/upload_user_avatar`, $userPhotoObject)
  }

  sendMailForActivationAccount($userEmail: string, $userName: string, $userFolder: string, $userAvatarPhoto: string) {
    return this.http.post(`${environment.apiHost}/send_mail_for_activation_account`, {
      userEmail: $userEmail, 
      userName: $userName,
      userFolder: $userFolder,
      userAvatarPhoto: $userAvatarPhoto
    })
    // return this.http.post(`${environment.apiHost}send_mail_for_activate_account.php`, {_EMAIL: $_EMAIL, _NAME: $_NAME})
  }

  createUserFolder($userFolder: string) {
    return this.http.post(`${environment.apiHost}/create_user_folder`, {userFolder: $userFolder})
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later. ' + JSON.stringify(error.error));
  }

}
