import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ORDER_CREATE_URL, ORDER_FOR_USER_URL, ORDER_GET_ALL_URL, ORDER_UPDATE_URL } from '../../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_CREATE_URL, order).pipe(
      tap({
        next: (createdOrder) => {
          if (createdOrder && createdOrder.id) {
            this.toastrService.success('The order is made', 'Success');
          } else {
            this.toastrService.error('Order creation failed', 'Error');
          }
        },
        error: (errorResponse) => this.toastrService.error(errorResponse.error, 'Error when creating an order')
      })
    );
  }

  getOrderForUser(orderId:string): Observable<Order> {
    return this.http.get<Order>(ORDER_FOR_USER_URL + orderId);
  }

  getAllOrdersForUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_GET_ALL_URL + userId);
  }

  updateOrderData(orderId:string, updateDataOfOrder:Order){
    return this.http.put<Order>(ORDER_UPDATE_URL + orderId, updateDataOfOrder)
  }
}
