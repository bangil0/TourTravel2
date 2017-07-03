import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {AuthService} from '../providers/auth-token-service'
import {IteneraryService} from '../providers/itenerary-service'
import 'rxjs/add/operator/map';

/*
  Generated class for the AttractionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AttractionService {
  types;
  constructor(public http: Http,public auth:AuthService, public ite:IteneraryService ) {
    console.log('Hello AttractionService Provider');
  }


  delStorFilAttrac(){
            localStorage.removeItem('tyAttrac');
  }

    public setTypes(ty) {
        window.localStorage.setItem('tyAttrac', ty);
        this.types = ty;
    }
  searchListAttraction() {
        var headers = new Headers();
        let des = this.ite.getDestination();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AttractionObjects/ByCity?cityid=' +des; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }


 listAttractionDaily(des) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AttractionObjects/ByCity?cityid=' +des; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }

    listAttractionDailyFilter(des) {
        var headers = new Headers();
        let token = this.auth.AuthToken;
        let ty = window.localStorage.getItem('tyAttrac');
        if (ty == null) { ty = '' }
        console.log(token);
        headers.append('Authorization', 'Bearer ' +token);
        var url = 'http://cloud.basajans.com:8868/tripplannerdev/api/AttractionObjects/ByCityWithFilter?cityid='+des+'&attractionTypeId='+ty; 
        var response = this.http.get(url, {headers : headers}).map(res => res.json());        
        return response;
    }



}
