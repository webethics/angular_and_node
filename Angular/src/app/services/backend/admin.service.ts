import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {}

  //  Add User  
/*  public addUser(name,email,phone,password): any {
    const uri = environment.apiUrl+'user/add';  //API
    const obj = {
      name: name,
      phone: phone,
	  email :email,
	  password :password
    };
    return this
      .http
      .post(uri, obj);
  }
   */
    // Call Email Already exist API   
 /*  public emailAlready(email): any {
    const uri = environment.apiUrl+'user/user_email'; //API 
    const obj = {
	  email :email
    };
    return this
      .http
      .post(uri, obj);
  } */
  
  //  Call Login API   
  login_user(email,password): Observable<any> {

    const uri = environment.apiUrl+'admin/login';
    const obj = {
	  email :email,
	  password :password,
    };
    return this
      .http
      .post(uri, obj);
  }
 
 //  Get Current logged in user data
  public getUsers(user): Observable<any> {
	let token = localStorage.getItem('admin_token');
	let headers = new HttpHeaders();
    headers = headers.append('token', token); 
	if(user=='user')
    var uri = environment.apiUrl+'admin/users';

    if(user=='partner')
    var uri = environment.apiUrl+'admin/partners';

    return this
            .http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
  }

 // Get user data and return to Edit conponent
  public editUser(id): any {
    const uri = environment.apiUrl+'user/edit/' + id;
    return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
 // Call user profile update API 
 public updateUser(id,status): any {
	 
	let token = localStorage.getItem('admin_token');
	let headers = new HttpHeaders({
	 'Content-Type': 'application/json',
     'token': token 
	});
    let options = { headers: headers };
    const uri = environment.apiUrl+'admin/updatestatus/' + id;
    const obj = {
      status: status
    };
    return this
      .http
      .post(uri, obj,options);
  }
 
  // Call verify user account API  
  public verify_code(id): any {
    const uri = environment.apiUrl+'user/verify/' + id;
    return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
  
   public forgot_password(email): any {
    const uri = environment.apiUrl+'user/forgotpassword';
    const obj = {
      email: email
    };
    return this
      .http
      .post(uri, obj);
  
  }
  // Request node to check password code 
   public password_code(id): any {
    const uri = environment.apiUrl+'user/check_passcode/'+id;
     return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
   }
   
  // Reset passwrd 
  public resetPassword(password,id): any {
    const uri = environment.apiUrl+'user/resetpassword/'+id;;
    const obj = {
      password: password
    };
    return this
      .http
      .post(uri, obj);
  }
  
  public deleteUser(id): any {
    const uri = environment.apiUrl+'user/delete/' + id;
        return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
     } 
	 
	 
}


