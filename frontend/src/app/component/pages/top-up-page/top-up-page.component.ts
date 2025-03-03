import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/models/User';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-top-up-page',
  templateUrl: './top-up-page.component.html',
  styleUrls: ['./top-up-page.component.css']
})
export class TopUpPageComponent {
  currentUser!: User;
  topUpAmount: number = 0;
  message: string = '';
  

  constructor(private userService: UserService) {
    this.userService.userObservable.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  onTopUp() {
    if (this.topUpAmount > 0) {
      this.currentUser.balance += this.topUpAmount;
      
      this.userService.updateUserData(this.currentUser.id, this.currentUser).subscribe((user)=>{
        window.history.back();
      })
    }

    return;
  }
}