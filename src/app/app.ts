import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private httpClient = inject(HttpClient);
  protected readonly title = 'Dating App - Angular';
  protected members = signal<any>([]);
  protected url = 'https://localhost:5001/api/members/getmembers';

    async ngOnInit() {
      this.members.set(await this.LoadMembers());
    }

    async LoadMembers() {
       try{
            return await lastValueFrom(this.httpClient.get(this.url));
       }
        catch(error){
          console.log(error);
          throw error;
        }
    }

}
