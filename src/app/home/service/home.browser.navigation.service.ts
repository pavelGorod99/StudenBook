import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { SectionContainerServiceService } from "../section-container/service/section-container-service.service";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class BrowserNavigationService {

    constructor(private sectionContainerService: SectionContainerServiceService) {}

    load(router: Router) {

        router.events.pipe(
            filter((event: NavigationEvent) => {
              return (event instanceof NavigationStart)
            })
        ).subscribe((event) => {
            if(event instanceof NavigationStart) {
        
                if (event.navigationTrigger == 'popstate') {
        
                    switch (event.url) {
                    case '/home': this.sectionContainerService.displayItem('section')
                        break
                    case '/home/news': this.sectionContainerService.displayItem('news')
                        break
                    case '/home/conversations': this.sectionContainerService.displayItem('conversations')
                        break
                    case '/home/friends': this.sectionContainerService.displayItem('friends')
                        break
                    case '/home/groups': this.sectionContainerService.displayItem('groups')
                        break
                    case '/home/photos': this.sectionContainerService.displayItem('photos')
                        break
                    case '/home/settings': this.sectionContainerService.displayItem('settings')
                        break
                    }
                }
            }
        })
    }
}