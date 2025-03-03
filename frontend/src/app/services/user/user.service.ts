import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/User';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { ADMIN_DELETE_USER_URL, ADMIN_EDIT_USER_DATA, USER_BY_ID_URL, USER_BY_SEARCH_URL, USER_GET_ALL_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable = new Observable<User>;
  
  constructor(private http: HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject;
   }

  public get currentUser():User{
    return this.userSubject.value;
  }

  public set currentUser(user: User) {
    this.userSubject.next(user);
  }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(USER_GET_ALL_URL);
  }

  getUserById(userId:string):Observable<User>{
    return this.http.get<User>(USER_BY_ID_URL + userId).pipe(tap({
      next:()=>{},
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Error')
        }
    }));
  }

  getAllUsersBySearchTerm(searchTerm: string){
    return this.http.get<User[]>(USER_BY_SEARCH_URL + searchTerm);
  }

  login(userLogin:IUserLogin){
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome ${user.name}!`,"Login Successfull")
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
    )
  }

  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome ${user.name}`,'Register Successful')
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,'Register Failed')
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  updateUserData(userId:string,updateData:User){
    return this.http.put<User>(ADMIN_EDIT_USER_DATA + userId, updateData).pipe(tap({
      next:()=>{
        this.toastrService.success(`You have successfully changed the data for the user`);
      },  
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, "Error with update")
      }
    }))
  }
  
  deleteUser(userId:string){
    return this.http.delete<User>(ADMIN_DELETE_USER_URL + userId).pipe(tap({
      next:()=>{
        this.toastrService.success('You have successfully delete user')
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'Error with deletion')
      }
    }))
  }

  setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    
    return new User();
  }
}
