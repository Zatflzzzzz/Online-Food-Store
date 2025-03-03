import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  currentUser!:User;
  userId!:string;

  constructor(private userService:UserService, private router:Router,private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.currentUser = user;
    });
  }

  goToCart_page(){
    this.router.navigateByUrl("cart-page")
  }

  goToTopUp_page(){
    this.router.navigateByUrl("topUp")
  }
}
