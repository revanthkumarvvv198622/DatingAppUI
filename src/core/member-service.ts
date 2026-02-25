import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Member, Photo } from '../types/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl + 'members/getmembers');
  }

  getMember(id: string){
    return this.httpClient.get<Member>(this.baseUrl + 'members/getmember/'+id);
  }

  getMemberPhotos(id: string){
    return this.httpClient.get<Photo[]>(this.baseUrl + 'members/getphotos/'+id);
  }
}
