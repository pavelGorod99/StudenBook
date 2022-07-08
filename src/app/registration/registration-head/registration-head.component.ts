import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-head',
  templateUrl: './registration-head.component.html',
  styleUrls: ['./registration-head.component.css']
})
export class RegistrationHeadComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
