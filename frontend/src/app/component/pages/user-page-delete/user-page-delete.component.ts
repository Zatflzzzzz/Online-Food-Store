import { Component } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page-delete',
  templateUrl: './user-page-delete.component.html',
  styleUrl: './user-page-delete.component.css'
})
export class UserPageDeleteComponent {
  user!:User;
  userId: string = "";

  constructor(private userService:UserService, private activatedRoute:ActivatedRoute,private router: Router){
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.userService.getUserById(this.userId).subscribe((user)=>{
      this.user = user
    })
  }

  deleteUserSubmit(){
    if(!this.user) return;

    this.userService.deleteUser(this.userId).subscribe(()=>{
      window.history.back();
    })
  }

  goBack() {
    window.history.back();
  }
}
