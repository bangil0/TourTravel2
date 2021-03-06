import { ConfigProvider } from './config';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
//import { MyApp } from '../app/app.component';

export class User {
    companyid: string;
    username: string;
    password: string;

    constructor(companyid: string, username: string, password: string) {
        this.companyid = companyid;
        this.username = username;
        this.password = password;
    }
}


@Injectable()
export class AuthService {
    isLoggedin: boolean;
    AuthToken;
    currentUser: User;

    constructor(public http: Http, public conf:ConfigProvider) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    public storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);

    }

    public storeToken(akun) {
        window.localStorage.setItem('akun', akun);
    }

    public loadToken() {
        let akun = JSON.parse(window.localStorage.getItem('akun'))
        return akun;
    }

    public useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    public loadUserCredentials() {
        var token = window.localStorage.getItem('raja');
        this.useCredentials(token);
    }

    public destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
        localStorage.removeItem('akun');
        localStorage.removeItem('raja');
    }



    public login(user) {
        let login = {
            "CompanyCode": user.companyid,
            "Username": user.username,
            "Password": user.password
        };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new Promise(resolve => {
            this.http.post(this.conf.baseUrl+'/Account/Login', login, { headers: headers }).map(res => res
            ).subscribe(res => {
                if (res.status < 200 || res.status >= 300) {
                    resolve(false);
                } else {
                    resolve(res.json());
                    let data2 = res.json();
                    this.storeToken(JSON.stringify(data2));
                    let tokens = data2["access_token"];
                    this.storeUserCredentials(tokens);
                }
            }, (error => {
                resolve(false);
            })

                );
        });
    }

    public register(reg) {
        var json =
            {
                "Name": reg.company_name,
                "CompanyBusiness": "TravelAgent",
                "User": {
                    "Username": reg.username,
                    "Password": reg.password,
                    "ConfirmPassword": reg.con_password,
                    "Role": "Customer",
                    "Firstname": reg.first_name,
                    "Lastname": reg.last_name,
                    "Address": "someplace no 2",
                    "Telephone": "0251889412",
                    "Email": reg.email
                }
            };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');


        var myresult = new Promise(resolve => {
            this.http.post(this.conf.baseUrl+'/Account/RegisterCompany', json, { headers: headers })
                .map(res => res)
                .subscribe(data => {
                    if (data.status < 200 || data.status >= 300) {
                        var testResult = data.json();
                        console.log(testResult.Message);
                        resolve(false);
                        //return res.json();
                    } else {
                        resolve(true);
                        //this.storeUserCredentials(data.json().token);
                        //return res.json();
                    }
                }, (error => {
                    console.log(error);
                    resolve(false);

                }));
        });

        return myresult;
    }

    public getUserInfo() {
        var headers = new Headers();
        this.loadUserCredentials();
        headers.append('Authorization', 'Bearer ' + this.AuthToken);
        var myresult = new Promise(resolve => {
            this.http.get(this.conf.baseUrl+'/Account/UserInfo', { headers: headers })
                .map(res => res)
                .subscribe(data => {
                    if (data.status < 200 || data.status >= 300) {
                        var testResult = data.json();
                        console.log(testResult.Message);
                        resolve(false);
                        //return res.json();
                    } else {
                        resolve(data.json());
                        var result = data.json();
                        this.currentUser = new User(result["CompanyID"], result["Username"], result["Password"]);
                    }
                }, (error => {
                    console.log(error);
                    resolve(false);

                }));
        });

        return myresult;
    }

    public userInfo(): User {
        //       this.my.setUser(this.currentUser.username);
        return this.currentUser;
    }

    public logout() {
        this.destroyUserCredentials();
    }
}