//Services
import {ChatroomService} from './../../../../services/chatroom.service';
//Packages
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {
  //Defines a service variable to get it from html.
  constructor(public chatroomService: ChatroomService) { }

  ngOnInit() {
  }

}
