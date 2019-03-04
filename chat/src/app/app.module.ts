//Modules.
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {AlertModule} from 'ngx-bootstrap';
import {NgxLoadingModule} from 'ngx-loading';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
//Services.
import {LoadingService} from './services/loading.service';
import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import {ChatroomService} from './services/chatroom.service';
import {AuthGuard} from './guards/auth.guard';
//Components.
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';

@NgModule({
  declarations: [//Components
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    ChatroomTitleBarComponent,
    ChatComponent,
    ChatroomListComponent,
    ChatMessageComponent,
    ChatInputComponent,
    ChatroomWindowComponent,
  ],
  imports: [//Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    BsDropdownModule.forRoot()
  ],
  providers: [AlertService,LoadingService,
  AuthService,AuthGuard,ChatroomService],//Services
  bootstrap: [AppComponent]
})
export class AppModule {}

