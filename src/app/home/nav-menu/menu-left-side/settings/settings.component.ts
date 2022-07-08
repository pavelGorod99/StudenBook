import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private browserNavigationService: BrowserNavigationService) {
    browserNavigationService.load(router)
  }

  ngOnInit(): void {
  }

}
