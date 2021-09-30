import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }
  
  public getProduct(){
    return this.http.get("http://acitest3.westus.azurecontainer.io/getsharedCollection");
  }
}
