import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isAdmin = (): boolean => {
    return userService.currentUser.isAdmin;
  };

  if (isAdmin()) return true;

  return false;
};