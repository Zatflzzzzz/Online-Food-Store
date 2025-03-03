import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-user-page-edit',
  templateUrl: './user-page-edit.component.html',
  styleUrls: ['./user-page-edit.component.css']
})
export class UserPageEditComponent implements OnInit {
  editForm!: FormGroup;
  isSubmitted = false;
  userId!: string;
  user!: User;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private activatedRoute: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;

      this.editForm = this.formBuilder.group({
        name: [this.user.name, [Validators.required, Validators.minLength(5)]],
        email: [this.user.email, [Validators.required, Validators.email]],
        address: [this.user.address, [Validators.required, Validators.minLength(5)]],
      });
    });
  }

  get fc() {
    return this.editForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.editForm.invalid) return;

    const formValue = this.editForm.value;

    const updatedUser: User = {
      ...this.user,
      name: formValue.name,
      email: formValue.email,
      address: formValue.address,
    };

    this.userService.updateUserData(this.userId, updatedUser).subscribe(() => {
      window.history.back();
    });
  }

  goBack() {
    window.history.back();
  }
}
