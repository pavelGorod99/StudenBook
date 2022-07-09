import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionContainerServiceService } from 'src/app/home/section-container/service/section-container-service.service';

@Component({
  selector: 'app-menu-left-side',
  templateUrl: './menu-left-side.component.html',
  styleUrls: ['./menu-left-side.component.css']
})
export class MenuLeftSideComponent implements OnInit {

  displaySectionContainer: boolean = true

  constructor(private sectionContainerService: SectionContainerServiceService, private router: Router) { }

  ngOnInit(): void {
    this.sectionContainerService.current_section_container.subscribe(sectionContainer => {
      this.displaySectionContainer = sectionContainer
    })
  }

  showItem(OPTION: string) {
    let i = document.getElementById('search_bar')! as (HTMLInputElement)
    i.value = ''
    this.router.navigate(['/home/' + OPTION])
    this.sectionContainerService.displayItem(OPTION)
    sessionStorage.setItem('CURRENT_PATH', OPTION)
  }
}
