import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsondataService {
  
  constructor(private _http: Http){}
  jsonData(aUrl){
    return this._http.get(aUrl).map((response: Response) => response.json());
  }
}
