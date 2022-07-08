import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserNavigationService } from 'src/app/home/service/home.browser.navigation.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private router: Router, private browserNavigationService: BrowserNavigationService) {
    browserNavigationService.load(router)
  }

  ngOnInit(): void {
  }

}
