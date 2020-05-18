import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { AuthServices } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageList: any[];
  selectedUser: number = 5; //Will get this after user clicks on a user from sidelist
  currentUser: number = JSON.parse(localStorage.getItem('currentUser'))['user_id'];

  currentUserDetails: any;
  selectedUserDetails: any;

  constructor(
    private _chat: ChatService,
    private _user: AuthServices
  ) {
  }

  ngOnInit() {
    this.getCurrentUserDetails();
    this._chat.getMessages(this.selectedUser).
      subscribe(data => {
        console.log(data);
        this.messageList = [...data];
        //Get List of messages. Store it and display it in chat body.
        this._chat.connect(); //Send the userId of the other user here as argument
      })
  }

  getUsers() { } //For Side bar users.

  onSendMessage(message: string) {
    this._chat.sendMessage(message);
  }

  getCurrentUserDetails() {
    this._user.get_user_details(this.currentUser)
      .subscribe(
        data => {
          this.currentUserDetails = { ...data }
          this.getSelectedUserDetails();
        }
      )
  }

  getSelectedUserDetails() {
    this._user.get_user_details(this.selectedUser)
      .subscribe(
        data => this.selectedUserDetails = { ...data }
      )
  }

}
