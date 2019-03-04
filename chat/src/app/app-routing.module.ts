import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {NavbarComponent} from './pages/navbar/navbar.component';
import { ChatComponent } from './pages/chat/chat.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
{path: '',pathMatch: 'full', redirectTo:'/login'},
{path: 'login', component: LoginComponent},
//{path: "chat",component: ChatComponent},
{path: 'sign-up',component: SignUpComponent},
{path: 'navbar',component:NavbarComponent},
{ path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
