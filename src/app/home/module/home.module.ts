import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsComponent } from '../nav-menu/menu-left-side/conversations/conversations.component';
import { MessengerComponent } from '../messenger/messenger.component';
import { HomeService } from '../service/home.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileAvatarComponent } from '../nav-menu/profile-avatar/profile-avatar.component';
import { WhatIsNewComponent } from '../section-container/what-is-new/what-is-new.component';
import { StoryContainerComponent } from '../section-container/story-container/story-container.component';
import { TapeContainerComponent } from '../section-container/tape-container/tape-container.component';
import { MenuRightSideComponent } from '../aside/menu-right-side/menu-right-side.component';
import { NavMenuComponent } from '../nav-menu/components/nav-menu.component';
import { FooterComponent } from '../footer/footer.component';
import { SectionContainerComponent } from '../section-container/components/section-container.component';
import { MenuLeftSideComponent } from '../nav-menu/menu-left-side/components/menu-left-side.component';
import { AsideComponent } from '../aside/components/aside.component';
import { FriendsComponent } from '../nav-menu/menu-left-side/friends/friends.component';
import { NewsComponent } from '../nav-menu/menu-left-side/news/news.component';
import { GroupsComponent } from '../nav-menu/menu-left-side/groups/groups.component';
import { PhotosComponent } from '../nav-menu/menu-left-side/photos/photos.component';
import { SettingsComponent } from '../nav-menu/menu-left-side/settings/settings.component';
import { SearchResultComponent } from '../header/search-result/search-result.component';
import { SearchingResultsComponent } from '../section-container/searching-results/searching-results.component';
import { HomeRoutingModule } from './home.module-routing';
import { HeaderComponent } from '../header/components/header.component';
import { DragScrollModule } from 'custom_module/ngx-drag-scroll/src/public-api';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'

import {MatIconModule} from '@angular/material/icon'
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchResultComponent,
    NavMenuComponent,
    SectionContainerComponent,
    SearchingResultsComponent,
    AsideComponent,
    FooterComponent,
    ProfileAvatarComponent,
    MenuLeftSideComponent,
    WhatIsNewComponent,
    StoryContainerComponent,
    TapeContainerComponent,
    MenuRightSideComponent,
    NewsComponent,
    ConversationsComponent,
    FriendsComponent,
    GroupsComponent,
    PhotosComponent,
    SettingsComponent,
    MessengerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    DragScrollModule,
    FontAwesomeModule,
    MatIconModule,
    TextFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
    // RouterModule.forChild(homeRoutes),
    // RouterModule.forChild([{path: '', component: HomeComponent}]),
    // RouterModule.forRoot(homeRoutes)
  ],
  // exports: [RouterModule]
  // providers: [MessengerComponent]
})
export class HomeModule { }
