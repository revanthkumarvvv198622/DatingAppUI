import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../account-service';
import { ToastService } from '../toast-service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if (accountService.currentUserLogged()) {
    return true;
  } else {
    toast.error('You must be logged in to access this page.');
    return false;
  }
};
