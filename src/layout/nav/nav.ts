import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/account-service';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.creds = {};
      },
      error: error => alert(error.error),
      complete: () => alert('Login request completed')
    })
  }

  logout() {
    this.accountService.logout();
  }

}
