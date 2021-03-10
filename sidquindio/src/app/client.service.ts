import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getRequest(route: string, token?:string) {

    let config:any = {
      responseType: "json"
    }
    if (token){
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    console.log(config);

    return this.http.get(route, config);
  }

  postRequest(route: string, data?:any, token?:string) {
    let config:any = {
      responseType: "json"
    }

    if (token){
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["header"] = header;
    }

    return this.http.post(route, data, config);
  }

  getRequestAll(route: string) {
    let config:any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;
    return this.http.get(route, config);
  }

  getRequestId (route: string, id: number) {
    let config:any = {
      responseType: "json"
    }
    const params =  new HttpParams().set('id', `${id}`);
    config["params"] = params;
  
    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;
    return  this.http.get(route, config);
  }
}
