import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home.component';
import { FriendsComponent } from './home/nav-menu/menu-left-side/friends/friends.component';
import { LoginComponent } from './login/login.component';
import { ActivateAccountComponent } from './registration/activate-account/activate-account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'activate-account', component: ActivateAccountComponent },
  // { path: 'home', loadChildren: () => import("../app/home/module/home.module").then(mod => mod.HomeModule) },
  // { path: 'home', component: HomeComponent, children: [
  //   { path: 'friends', component: FriendsComponent }
  // ] },
  { path: 'registration', loadChildren: () => import("../app/registration/module/registration.module").then(mod => mod.RegistrationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
