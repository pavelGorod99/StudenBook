import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchResultService } from '../search-result-service/search-result.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  // resultData = new Array()
  // resultData = new Array()

  $_SEARCH_LIST = new Array()

  $_showSearchResultContainer = false

  $_no_data_found = false

  $_API_HOST = environment.apiHost

  constructor(private searchResultService: SearchResultService) {
    this.searchResultService.noData.subscribe(noResults => {
      // console.log("RES: " + noResults);
      if (noResults) {
        this.$_no_data_found = true
        this.$_showSearchResultContainer = false
      }
      else {

        searchResultService.data.subscribe(data => {
          // console.log("Data result: " + data.length);
    
          if (data.length == 0)
            this.$_no_data_found = true
          else {
            this.$_no_data_found = false
            this.$_SEARCH_LIST = data
            searchResultService.schowResults.subscribe(showContainer => this.$_showSearchResultContainer = showContainer)
          }
        })
      }
    })
  }



  ngOnInit(): void {

    this.searchResultService.noData.subscribe(noResults => {
      // console.log("RES: " + noResults);

      if (noResults){
        this.$_showSearchResultContainer = false
        // this.$_no_data_found = true
      }
      else {
        this.searchResultService.data.subscribe(data => {
          // console.log("Data result: " + data.length);
    
          // console.log((<HTMLInputElement>document.getElementById('search_bar')).value);

          if (data.length == 0 && (<HTMLInputElement>document.getElementById('search_bar')).value != '') {
            // console.log("this line 1");
            
            this.$_showSearchResultContainer = true
            this.$_no_data_found = true
          }
          else {
            console.log(data);
            this.$_no_data_found = false
            this.$_SEARCH_LIST = data
            this.searchResultService.schowResults.subscribe(showContainer => this.$_showSearchResultContainer = showContainer)
          }
        })
      }
    })
  }

  closeSearchResultContainer() {
    this.$_showSearchResultContainer = false;
    (<HTMLInputElement>document.getElementById('search_bar')).value = ''
  }

}
