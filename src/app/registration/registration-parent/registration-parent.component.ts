import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-parent',
  templateUrl: './registration-parent.component.html',
  styleUrls: ['./registration-parent.component.css']
})
export class RegistrationParentComponent implements OnInit {

  step = 1

  constructor() { }

  ngOnInit(): void {
  }

  handleStep1CompleteEvent(event: any) {
    this.step = 2
  }

  handleStep2CompleteEvent(event: any) {
    this.step = 3
  }

  handleStep3CompleteEvent(event: any) {
    console.log("Finish registration");
  }
}
