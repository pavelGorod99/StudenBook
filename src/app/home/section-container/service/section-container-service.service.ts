import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionContainerServiceService {

  private display_section_container = new BehaviorSubject(true)
  current_section_container = this.display_section_container.asObservable()

  private display_news = new BehaviorSubject(false)
  news = this.display_news.asObservable()

  private display_conversations = new BehaviorSubject(false)
  conversations = this.display_conversations.asObservable()

  private display_friends = new BehaviorSubject(false)
  friends = this.display_friends.asObservable()

  private display_groups = new BehaviorSubject(false)
  groups = this.display_groups.asObservable()

  private display_photos = new BehaviorSubject(false)
  photos = this.display_photos.asObservable()

  private display_settings = new BehaviorSubject(false)
  settings = this.display_settings.asObservable()

  private display_searching_results = new BehaviorSubject(false)
  searching_results = this.display_searching_results.asObservable()

  constructor() {}

  displaySectionContainer(DISPLAY: boolean) {
    this.display_section_container.next(DISPLAY)
  }

  displayItem(OPTION: string) {

    this.display_section_container.next(false)
    this.display_news.next(false)
    this.display_conversations.next(false)
    this.display_friends.next(false)
    this.display_groups.next(false)
    this.display_photos.next(false)
    this.display_settings.next(false)
    this.display_searching_results.next(false)

    switch(OPTION) {
      case 'section': this.display_section_container.next(true)
        break;
      case 'news': this.display_news.next(true)
        break;
      case 'conversations': this.display_conversations.next(true)
        break;
      case 'friends': this.display_friends.next(true)
        break;
      case 'groups': this.display_groups.next(true)
        break;
      case 'photos': this.display_photos.next(true)
        break;
      case 'settings': this.display_settings.next(true)
        break;
      case 'searching_results': this.display_searching_results.next(true)
        break;
    }

    sessionStorage.setItem('CURRENT_PATH', OPTION)
  }
}
