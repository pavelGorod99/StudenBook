import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private resultData = new BehaviorSubject([]);
  data = this.resultData.asObservable();

  private lastResultData = new BehaviorSubject([])
  lastData = this.lastResultData.asObservable()

  private showResultContainer = new BehaviorSubject(false)
  schowResults = this.showResultContainer.asObservable()

  private noDataFound = new BehaviorSubject(false)
  noData = this.noDataFound.asObservable()

  $_SEARCH_FINISHED = false

  $_CURRENT_TEXT = ''

  $_SHOW_FROM = 0

  $_SHOW_TO = 14

  constructor() { 

    if(sessionStorage.getItem('LAST_SEARCH_RESULT'))
      this.getLastData(JSON.parse(String(sessionStorage.getItem('LAST_SEARCH_RESULT'))))
    
    if (sessionStorage.getItem('SEARCH_FINISHED'))
      this.$_SEARCH_FINISHED = JSON.parse(String(sessionStorage.getItem('SEARCH_FINISHED')))
  }

  getData(data: any) {
    this.resultData.next(data)
  }

  getLastData(data: any) {
    this.lastResultData.next(data)
    sessionStorage.setItem('LAST_SEARCH_RESULT', JSON.stringify(data))
  }

  resultsContainer($_SHOW: boolean): void {
    this.showResultContainer.next($_SHOW)
  }

  _noDataFound($_SHOW: boolean) {
    this.noDataFound.next($_SHOW)
  }
}
