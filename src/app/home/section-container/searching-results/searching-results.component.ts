import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../../components/home.component';
import { HeaderComponent } from '../../header/components/header.component';
import { SearchResultService } from '../../header/search-result-service/search-result.service';
import { SearchTextService } from '../../header/search-result-service/search-text.service';
import { HomeService } from '../../service/home.service';
import ShortUniqueId from 'short-unique-id';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-searching-results',
  templateUrl: './searching-results.component.html',
  styleUrls: ['./searching-results.component.css']
})
export class SearchingResultsComponent implements OnInit, AfterViewInit {

  baseUrl = environment.apiHost

  $_STOP_REFRESH_LIST = false

  $_RESULTS_FOUND_LABEL = 'Results found'

  constructor(private dataResult: SearchResultService, private homeService: HomeService, private route: ActivatedRoute, private searchText: SearchTextService) {
    
    if (this.dataResult.$_SEARCH_FINISHED)
      this.dataResult.lastData.subscribe(data=> {
        console.log(data);

        this.setResultData(data)
      })
  }

  setResultData(data: any) {

    const uid = new ShortUniqueId({ length: 16 }); 

    if (data.length != 0) {
      this.$_LIST = data
      this.$_LIST.forEach((element: any) => {
        element['spec_num'] = uid()
      });
      console.log(this.$_LIST);
      
      this.$_RESULTS_FOUND_LABEL = 'RESULTS FOUND'
    } else {
        this.$_RESULTS_FOUND_LABEL = 'NO RESULTS FOUND'
        this.$_LIST = []
    }
  }

  $_LIST: any

  ngOnInit() {
    
  }

  getResultData() {

    this.searchText.$_SEARCH_TEXT = String(this.route.snapshot.queryParamMap.get("q"))

    let $_RESULT = this.searchText.filterSearchText(this.searchText.$_SEARCH_TEXT)

    console.log("RES L " + $_RESULT);
    

    if ($_RESULT.length > 0) {

      this.homeService.search($_RESULT, Number(sessionStorage.getItem('USER_ID')), this.dataResult.$_SHOW_FROM, this.dataResult.$_SHOW_TO)
        .subscribe((data) => {
          console.log(data);

          this.setResultData(data)
        })
    }
  }

  ngAfterViewInit(): void {
      setTimeout(() => {

        console.log("AFTER VIEV INIT");
        
        this.getResultData()
      }, 0)
  }

  $_DISABLE_ADD_F_BTN = false

  $_DARKORANGE = "blanchedalmond"

  openMessenger() {
    console.log("OPEN MESSENGER");
  }

  cancelFriendshipRequest($_USER: any) {
    console.log("CANCEL REQUEST");

    console.log($_USER['ID']);
    
    this.homeService.cancelFriendshipRequest(Number(sessionStorage.getItem('USER_ID')), $_USER['ID'])
      .subscribe(result => {
        console.log("REQUESR WAS CANCELED");
        console.log(result)
        this.getResultData();
      }, (err) => {
        console.log(JSON.stringify(err));
      })
  }

  addToFriends($_USER: any) {

    console.log($_USER['ID']);
    console.log(sessionStorage.getItem('USER_ID'));
    
    this.homeService.sendFriendhipRequest(Number(sessionStorage.getItem('USER_ID')), $_USER['ID'])
      .subscribe(result => {
        console.log("SUCCESSFULL");
        console.log(JSON.stringify(result));
        this.getResultData();
      }, (err) => {
        console.log(JSON.stringify(err));
      });

    // this.$_DISABLE_ADD_F_BTN = true
    // this.$_DU_USER_ID = $_USER['ID']
    var button = <HTMLInputElement> document.getElementById('add_to_friends_btn' + $_USER['spec_num']);
    // button.disabled = true
    // button.style.backgroundColor = 'darkorange'
    
    // this.$_DARKORANGE = "darkorange"
  }

  $_DU_USER_ID = -999

  disableButton() {
    return true;
  }
}
