import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation-head',
  templateUrl: './activation-head.component.html',
  styleUrls: ['./activation-head.component.css']
})
export class ActivationHeadComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
