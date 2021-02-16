import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterBackend } from './model/registerBackend';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  createUser(regist:RegisterBackend){
      return this.http.post(environment.apiBase+"createUser",regist);
  }
}
