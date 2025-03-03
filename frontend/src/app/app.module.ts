import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/partials/header/header.component';
import {HomeComponent} from "./component/pages/home/home.component";
import { StarRatingComponent } from './component/pages/star-rating/star-rating.component';
import {SearchComponent} from './component/partials/search/search.component';
import { TagsComponent } from './component/partials/tags/tags.component';
import { FoodPageComponent } from './component/pages/food-page/food-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { TitleComponent } from './component/partials/title/title.component';
import { NotFoundComponent } from './component/partials/not-found/not-found.component'
import { provideHttpClient, HttpClient, withInterceptorsFromDi  } from '@angular/common/http';
import { LoginPageComponent } from './component/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './component/partials/input-container/input-container.component';
import { InputValidationComponent } from './component/partials/input-validation/input-validation.component';
import { TextInputComponent } from './component/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './component/partials/default-button/default-button.component';
import { RegisterPageComponent } from './component/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './component/pages/checkout-page/checkout-page.component';
import { OrderItemsComponent } from './component/partials/order-items/order-items.component';
import { MapComponent } from './component/partials/map/map.component';
import { UserService } from './services/user/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './component/pages/payment-page/payment-page.component';
import { EmailConfirmButtonComponent } from './component/partials/email-confirm-button/email-confirm-button.component';
import { AdminChangeFoodListComponent } from './component/pages/admin/admin-change-food-list/admin-change-food-list.component';
import { AdminChangeUserListComponent } from './component/pages/admin/admin-change-user-list/admin-change-user-list.component';
import { AdminAddFoodToListComponent } from './component/pages/admin/admin-add-food-to-list/admin-add-food-to-list.component';
import { AdminGiveAdminRulesComponent } from './component/pages/admin/admin-give-admin-rules/admin-give-admin-rules.component';
import { UserPageEditComponent } from './component/pages/user-page-edit/user-page-edit.component';
import { UserPageDeleteComponent } from './component/pages/user-page-delete/user-page-delete.component';
import { FoodEditPageComponent } from './component/pages/food-edit-page/food-edit-page.component';
import { FoodDeletePageComponent } from './component/pages/food-delete-page/food-delete-page.component';
import { ProfilePageComponent } from './component/pages/profile-page/profile-page.component';
import { OrderListComponent } from './component/pages/order-list/order-list.component';
import { TopUpPageComponent } from './component/pages/top-up-page/top-up-page.component';

const routes: Routes = [
  { path: 'food', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    OrderItemsComponent,
    MapComponent,
    PaymentPageComponent,
    EmailConfirmButtonComponent,
    AdminChangeFoodListComponent,
    AdminChangeUserListComponent,
    AdminAddFoodToListComponent,
    AdminGiveAdminRulesComponent,
    UserPageEditComponent,
    UserPageDeleteComponent,
    FoodEditPageComponent,
    FoodDeletePageComponent,
    ProfilePageComponent,
    OrderListComponent,
    TopUpPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), 
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
    BrowserAnimationsModule,
    FormsModule 
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}, provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
