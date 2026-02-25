import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/account-service';
import { email } from '@angular/forms/signals';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit{
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);
  protected creds: any = {};
  private router = inject(Router);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectedTheme(theme: string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if(elem) elem.blur();
  }

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
