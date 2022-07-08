import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private router: Router, private browserNavigationService: BrowserNavigationService) {
    browserNavigationService.load(router)
  }

  ngOnInit(): void {
  }

}
