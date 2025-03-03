import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-give-admin-rules',
  templateUrl: './admin-give-admin-rules.component.html',
  styleUrl: './admin-give-admin-rules.component.css'
})
export class AdminGiveAdminRulesComponent implements OnInit {
  user!:User;
  userList!:User[];
  defaultUserImage: string = './assets/default-user.jpg'; 
  

  constructor(private userService:UserService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.updateUserList()
  }

  changeRole(userId:string){
    if(userId == this.userService.currentUser.id)
      return
    
    this.userService.getUserById(userId).subscribe((userData) => {
      this.user = userData;
      this.user.isAdmin = !this.user.isAdmin;
  
      this.userService.updateUserData(userId, this.user).subscribe(() => {
        this.updateUserList();
      });
    });
  }

  updateUserList(){
    this.userService.getAll().subscribe((userList)=>{
      this.userList = userList;
    })
  }
}
