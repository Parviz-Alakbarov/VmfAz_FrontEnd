import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  add(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }
  
  setToken(token:string){
    return localStorage.setItem('token',token);
  }

  setRefreshToken(refreshToken:string){
    return localStorage.setItem('refreshToken',refreshToken);
  }

  getToken():string{
    return localStorage.getItem('token');
  }

  getRefreshToken():string{
    return localStorage.getItem('refreshToken');
  }
}
