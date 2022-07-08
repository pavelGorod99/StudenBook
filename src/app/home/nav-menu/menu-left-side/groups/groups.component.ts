import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private router: Router, private browserNavigationService: BrowserNavigationService) {
    browserNavigationService.load(router)
  }

  ngOnInit(): void {
  }

}
