import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-change-user-list',
  templateUrl: './admin-change-user-list.component.html',
  styleUrl: './admin-change-user-list.component.css'
})
export class AdminChangeUserListComponent{
  users: User[] = [];
  defaultUserImage: string = './assets/default-user.jpg'; 

  constructor(private userService: UserService, private router: Router,activatedRoute:ActivatedRoute){
    let userObservable: Observable<User[]>;

    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
        userObservable = this.userService.getAllUsersBySearchTerm(params.searchTerm)
      else{
        userObservable = this.userService.getAll()
      }

      userObservable.subscribe((usersList) => {
        this.users = usersList;
      })
  })}

  onEditUser(userId:string){
    this.router.navigateByUrl(`changeUserData/${userId}`);
  }

  onDeleteUser(userId:string){
    if(userId == this.userService.currentUser.id)
      return
    this.router.navigateByUrl(`deleteUserData/${userId}`);
  }
}
