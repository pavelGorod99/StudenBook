import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { GroupedObservable } from 'rxjs';
import { HomeComponent } from '../components/home.component';
import { ConversationsComponent } from '../nav-menu/menu-left-side/conversations/conversations.component';
import { FriendsComponent } from '../nav-menu/menu-left-side/friends/friends.component';
import { NewsComponent } from '../nav-menu/menu-left-side/news/news.component';
import { PhotosComponent } from '../nav-menu/menu-left-side/photos/photos.component';
import { SettingsComponent } from '../nav-menu/menu-left-side/settings/settings.component';
import { SearchingResultsComponent } from '../section-container/searching-results/searching-results.component';


const  routes:  Routes  = [
    {
        path:  'home',
        component:  HomeComponent,
        children: [
            {
                path: 'news',
                component: NewsComponent
            },
            {
                path: 'conversations',
                component: ConversationsComponent
            },
            {
                path: 'friends',
                component: FriendsComponent 
            },
            {
                path: 'groups',
                component: GroupedObservable
            },
            {
                path: 'photos',
                component: PhotosComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'searching-results',
                component: SearchingResultsComponent
            }
        ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  HomeRoutingModule { }