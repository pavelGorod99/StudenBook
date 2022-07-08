import { Component, OnInit } from '@angular/core';
import { SectionContainerServiceService } from '../service/section-container-service.service';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.css']
})
export class SectionContainerComponent implements OnInit {

  displaySectionContainer: boolean = true

  displayNews: boolean = true

  displayConversations: boolean = false

  displayFriends: boolean = false

  displayGroups: boolean = false

  displayPhotos: boolean = false

  displaySettings: boolean = false

  displaySearchingResults: boolean = false

  constructor(private sectionContainerService: SectionContainerServiceService) { 

    // console.log("CUR ITEM: " + sessionStorage.getItem('CURRENT_PATH'));
    // console.log(this.displaySearchingResults);
    
    if (sessionStorage.getItem('CURRENT_PATH') != null) 
      this.sectionContainerService.displayItem(String(sessionStorage.getItem('CURRENT_PATH')))

    this.sectionContainerService.current_section_container.subscribe(sectionContainer => {
      this.displaySectionContainer = sectionContainer
    })
    this.sectionContainerService.news.subscribe(news => {
      this.displayNews = news
    })
    this.sectionContainerService.conversations.subscribe(conversations => {
      this.displayConversations = conversations
    })
    this.sectionContainerService.friends.subscribe(friends => {
      this.displayFriends = friends
    })
    this.sectionContainerService.groups.subscribe(groups => {
      this.displayGroups = groups
    })
    this.sectionContainerService.photos.subscribe(photos => {
      this.displayPhotos = photos
    })
    this.sectionContainerService.settings.subscribe(settings => {
      this.displaySettings = settings
    })
    this.sectionContainerService.searching_results.subscribe(searching_results =>  {
      this.displaySearchingResults = searching_results
    })
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('CURRENT_PATH') != null) 
      this.sectionContainerService.displayItem(String(sessionStorage.getItem('CURRENT_PATH')))

    this.sectionContainerService.current_section_container.subscribe(sectionContainer => {
      this.displaySectionContainer = sectionContainer
    })
    this.sectionContainerService.news.subscribe(news => {
      this.displayNews = news
    })
    this.sectionContainerService.conversations.subscribe(conversations => {
      this.displayConversations = conversations
    })
    this.sectionContainerService.friends.subscribe(friends => {
      this.displayFriends = friends
    })
    this.sectionContainerService.groups.subscribe(groups => {
      this.displayGroups = groups
    })
    this.sectionContainerService.photos.subscribe(photos => {
      this.displayPhotos = photos
    })
    this.sectionContainerService.settings.subscribe(settings => {
      this.displaySettings = settings
    })
    this.sectionContainerService.searching_results.subscribe(searching_results => {
      this.displaySearchingResults = searching_results
    })
  }

}
