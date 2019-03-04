//Classes
import { Message } from 'src/app/classes/message';
//Packages
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})

export class ChatMessageComponent implements OnInit {
  //Define variable message to get it from html.
  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

}
