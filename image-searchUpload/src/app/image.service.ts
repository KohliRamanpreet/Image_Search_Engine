import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private API_URL:string=environment.API_URL;
private query:String;
  private perPage: string = "&per_page=10";
  constructor(private _http: HttpClient){ }
  getImage(query){
    return this._http.get(this.API_URL+"&q=" + query + this.perPage)
    .pipe(map(res => res));
  }

}
