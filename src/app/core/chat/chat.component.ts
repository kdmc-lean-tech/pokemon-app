import { Component, OnInit } from '@angular/core';
import { UserRtService } from '../../services/user-rt.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private userRtService: UserRtService) { }

  ngOnInit(): void {
  }

  public searchUsers($event) {
    this.userRtService.getUsers($event);
  }
}
