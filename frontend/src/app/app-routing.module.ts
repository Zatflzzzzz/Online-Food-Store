import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { RegisterPageComponent } from './component/pages/register-page/register-page.component';
import {CheckoutPageComponent} from "./component/pages/checkout-page/checkout-page.component"
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './component/pages/payment-page/payment-page.component';
import { AdminAddFoodToListComponent } from './component/pages/admin/admin-add-food-to-list/admin-add-food-to-list.component';
import { AdminChangeFoodListComponent } from './component/pages/admin/admin-change-food-list/admin-change-food-list.component';
import { AdminChangeUserListComponent } from './component/pages/admin/admin-change-user-list/admin-change-user-list.component';
import { AdminGiveAdminRulesComponent } from './component/pages/admin/admin-give-admin-rules/admin-give-admin-rules.component';
import { UserPageEditComponent } from './component/pages/user-page-edit/user-page-edit.component';
import { FoodDeletePageComponent } from './component/pages/food-delete-page/food-delete-page.component';
import { FoodEditPageComponent } from './component/pages/food-edit-page/food-edit-page.component';
import { UserPageDeleteComponent } from './component/pages/user-page-delete/user-page-delete.component';
import { ProfilePageComponent } from './component/pages/profile-page/profile-page.component';
import { OrderListComponent } from './component/pages/order-list/order-list.component';
import { roleGuard } from './auth/guards/role.guard';
import { TopUpPageComponent } from './component/pages/top-up-page/top-up-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search_food/:searchTerm', component:HomeComponent},
  {path:'search_admin_user/:searchTerm', component:AdminChangeUserListComponent, canActivate:[authGuard, roleGuard]},
  {path:'search_admin_food/:searchTerm', component:AdminChangeFoodListComponent, canActivate:[authGuard, roleGuard]},
  {path:'tag_admin/:tag', component:AdminChangeFoodListComponent, canActivate:[authGuard, roleGuard]},
  {path:'order_list/:id', component:OrderListComponent, canActivate:[authGuard]},
  {path:'tag/:tag', component:HomeComponent},
  {path:'profile/:id', component:ProfilePageComponent, canActivate:[authGuard]},
  {path:'food/:id', component:FoodPageComponent},
  {path:'cart-page', component:CartPageComponent, canActivate:[authGuard]},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'checkout', component:CheckoutPageComponent, canActivate:[authGuard]},
  {path:'payment/:orderId', component:PaymentPageComponent, canActivate:[authGuard]},
  {path:'admin/changeFoodList', component:AdminChangeFoodListComponent, canActivate:[authGuard, roleGuard]},
  {path:'admin/changeUserList', component:AdminChangeUserListComponent, canActivate:[authGuard, roleGuard]},
  {path:'changeUserData/:id', component:UserPageEditComponent, canActivate:[authGuard]},
  {path:'admin/addFoodList', component:AdminAddFoodToListComponent, canActivate:[authGuard, roleGuard]},
  {path:'admin/giveAdminRules', component:AdminGiveAdminRulesComponent, canActivate:[authGuard, roleGuard]},
  {path:'admin/editFoodData/:id', component:FoodEditPageComponent, canActivate:[authGuard, roleGuard]},
  {path:'admin/deleteFoodData/:id', component:FoodDeletePageComponent, canActivate:[authGuard, roleGuard]},
  {path:'deleteUserData/:id', component:UserPageDeleteComponent, canActivate:[authGuard, roleGuard]},
  {path:'topUp', component:TopUpPageComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
