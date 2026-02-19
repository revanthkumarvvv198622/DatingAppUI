import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/User';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  protected readonly title = 'Dating App - Angular';
  protected members = signal<User[]>([]);
  protected url = 'https://localhost:5001/api/members/getmembers';

    async ngOnInit() {
      this.members.set(await this.LoadMembers());
      this.setCurrentUser();
    }

    setCurrentUser(){
      const userString = localStorage.getItem('user');
      if(userString){
        const user = JSON.parse(userString);
        this.accountService.currentUser.set(user);
      }
      else
        return;
    }

    async LoadMembers() {
       try{
            return await lastValueFrom(this.httpClient.get<User[]>(this.url));
       }
        catch(error){
          console.log(error);
          throw error;
        }
    }

}
