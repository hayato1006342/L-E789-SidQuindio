import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  postRequest(route: string, data?:any) {

    let config:any = {
      responseType: "json"
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
}
