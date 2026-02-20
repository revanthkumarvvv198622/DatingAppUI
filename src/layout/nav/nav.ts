import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/account-service';
import { email } from '@angular/forms/signals';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);
  protected creds: any = {};
  private router = inject(Router);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        this.creds = {};
        this.toastService.success('Login successful');
      },
      error: error => this.toastService.error('Invalid username or password')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
