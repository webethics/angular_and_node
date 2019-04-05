import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  //  Add User  
  public addUser(user,userRole): any {
	 
    const uri = environment.apiUrl+'user/add';  //API
    const obj = {
      firstname: user.firstName,
      lastname: user.lastName,
      phone: user.phone,
	  email :user.email,
	  state :user.state,
	  county :user.county,
	  city :user.city,
	  password :user.password,
	  address :user.address,
	  zipcode :user.zip,
	  userRole :userRole
    };
	
     return this
      .http
      .post(uri, obj); 
  }
   
    // Call Email Already exist API   
   public emailAlready(email): any {
    const uri = environment.apiUrl+'user/user_email'; //API 
    const obj = {
	  email :email
    };
	
    return this
      .http
      .post(uri, obj);
  } 
  
   
  
  // Get state API   
   public getStates(): any {
    const uri = environment.apiUrl+'user/states'; //API 
    /* const obj = {
	  email :email
    }; */
    return this
      .http
      .get(uri);
   } 
   
    //  Call User role API   
   public getUserRoles(usertype): any {
    const uri = environment.apiUrl+'user/roles/'+usertype; //API 
	
    return this
      .http
      .get(uri);
   } 
  
  //  Call Login API   
  login_user(email,password): Observable<any> {

    const uri = environment.apiUrl+'user/userlogin';
    const obj = {
	  email :email,
	  password :password,
    };
    return this
      .http
      .post(uri, obj);
  }
 
 //  Get Current logged in user data
  public getUsers(): any {
	let token = localStorage.getItem('login_token');
	let headers = new HttpHeaders();
    headers = headers.append('token', token); 
    const uri = environment.apiUrl+'user';
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
 public updateUser(user, id,image: File): any {
    const uri = environment.apiUrl+'user/update/' + id;
	
	const formData = new FormData();

	
	formData.append('firstname',  user.firstName);
	formData.append('lastname',  user.lastName);
	formData.append('phone',  user.phone);
	formData.append('state',  user.state);
	formData.append('county',  user.county);
	formData.append('city',  user.city);
	formData.append('address',  user.address);
	formData.append('zipcode',  user.zip);
	if(image !== undefined){
		formData.append('profile_pic',  image);
	}
	


    console.log(formData);
    return this
      .http
      .post(uri, formData); 
  }
  
  public updateUserWithoutFIle(user, id): any {
    const uri = environment.apiUrl+'user/update/' + id;
	
	const formData = new FormData();

	
	formData.append('firstname',  user.firstName);
	formData.append('lastname',  user.lastName);
	formData.append('phone',  user.phone);
	formData.append('state',  user.state);
	formData.append('county',  user.county);
	formData.append('city',  user.city);
	formData.append('address',  user.address);
	formData.append('zipcode',  user.zip);
	console.log(formData);
    return this
      .http
      .post(uri, formData); 
  }
 
  // Call verify user account API  
  public getUserVerified(id): any {
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
    const uri = environment.apiUrl+'user/resetpassword/'+id;
     return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
   }
   
  // Reset passwrd 
  public resetPassword(password,id): any {
    const uri = environment.apiUrl+'user/updatepassword/'+id;
    const obj = {
      password: password
    };
    return this
      .http
      .post(uri, obj);
  }
   public updatePassword(password): any {
	let token = localStorage.getItem('login_token');
	let headers = new HttpHeaders();
    headers = headers.append('token', token); 
	
    const uri = environment.apiUrl+'user/changepassword/';
    const obj = {
      password: password
    };
    return this
      .http
      .post(uri, obj,{headers:headers});
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
	 
	public getCounties(state): any {
		const uri = environment.apiUrl+'user/counties'; //API 
		const obj = {
		  state :state
		};
		
		return this
		  .http
		  .post(uri, obj);
	 }
	 public getCities(county,state): any {
		const uri = environment.apiUrl+'user/cities'; //API 
		const obj = {
		  state :state,
		  county :county
		};
		
		return this
		  .http
		  .post(uri, obj);
	 }
	 
}


