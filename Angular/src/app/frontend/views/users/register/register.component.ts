import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormGroup,  FormBuilder,  Validators ,FormControl} from '@angular/forms';
//import { PasswordValidator } from '../../../validator/password.validator';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{

	title = 'SignUp';
	result:any = '';
	response :any="";
	states:any = '';
	counties:any = '';
	roles:any = '';
	cities:any = '';
	
	angForm: FormGroup;
	angPartnerForm : FormGroup;
	first_show = false;first_show_partner = false;
	show = false;showpartner = false;
	stateName = '';
	statename = '';countyName = '';setusertype = '';
	
	submitted = false;submitted4 = false;
	first_submitted = false;third_submitted = false;
  constructor(private _flashMessagesService: FlashMessagesService,private userservice: UserService, private fb: FormBuilder) {
		this.createForm();
		
   }
	
    /* Signup Form validation */ 
   createForm() {
	   
	   this.setusertype =  localStorage.getItem('usertype');
	   
	   this.getSate();
	   this.getRoles('user');
	   /* this.passwordFormGroup = this.fb.group({
		   password:['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])], 
		}); */
		
		
		/* Signup Form field for user validation */ 
		this.angForm = this.fb.group({
			 // name: ['',  Validators.required ],
			  state: ['', Validators.required ],
			  firstName: ['', Validators.required ],
			  lastName: ['', Validators.required ],
			  county: ['', Validators.required ],
			  city: ['', Validators.required ],
			  zip: ['', Validators.required ],
			  phone: ['', Validators.required ],
			  address: ['', Validators.required ],
			  email: new FormControl('', Validators.compose([
			  Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
			  password:['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])] 
		}); 
		
			/* Signup Form field for partner validation */ 
		this.angPartnerForm = this.fb.group({
			 // name: ['',  Validators.required ],
			  state: ['', Validators.required ],
			  firstName: ['', Validators.required ],
			  lastName: ['', Validators.required ],
			  companyName: ['', Validators.required ],
			  county: ['', Validators.required ],
			  services: ['', Validators.required ],
			  zip: ['', Validators.required ],
			  phone: ['', Validators.required ],
			  address: ['', Validators.required ],
			  email: new FormControl('', Validators.compose([
			  Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
			  password:['',  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])] 
		}); 
   }
   
 //  check if user has entered username and email in first step
   check(){
	   
	   this.first_submitted = true;
	   
		if(this.angForm.controls['email'].invalid || this.angForm.controls['password'].invalid){
			this.show = false;
			this.first_show = true;
			return this.angForm.controls;
		}else{
			this.show = true;
			this.first_show = false;
			return this.angForm.controls;
		}
   }
   
    //  check if partner has entered username and email in first step
    checkpartner(){
	   
	   this.third_submitted = true;
	   
		if(this.angPartnerForm.controls['email'].invalid || this.angPartnerForm.controls['password'].invalid){
			this.showpartner = false;
			this.first_show_partner = true;
			return this.angPartnerForm.controls;
		}else{
			this.showpartner = true;
			this.first_show_partner = false;
			return this.angPartnerForm.controls;
		}
   }
   
    //  get all the state from database
   getSate(){
  
	    this.userservice.getStates().subscribe(result => {
		  this.states = result;
		});
	   
   }
	//  get user roles from database
   getRoles(usertype){
  
	    this.userservice.getUserRoles(usertype).subscribe(result => {
			this.roles = result;
			console.log(this.roles[0]._id);
		});
	   
   }
   
   //  get counties on change of states
	getCounties(event){
		this.stateName = event.target.value;
		this.userservice.getCounties(this.stateName).subscribe(result => {
			this.counties = result;
		});
		
	}  
	//  get counties on change of county
	getCities(event){
		this.countyName = event.target.value;
		
		this.statename = this.angForm.value.state;
		 this.userservice.getCities(this.countyName,this.statename).subscribe(result => {
			 console.log(result);
			this.cities = result;
		}); 
	}  
  
   /* *** add user ** */
  emailAlready(email) {
      this.userservice.emailAlready(email).subscribe(result => {
			this.response = result;
      });
  }
  get f() { return this.angForm.controls; }
  get f1() { return this.angPartnerForm.controls; }
   
  onSubmit() {
        this.submitted = true;
	
        // stop here if form is invalid
        if(this.angForm.invalid){
			 return;
        }else{
			var user = this.angForm.value;
			var userRole = this.roles[0]._id;
			this.userservice.addUser(user,userRole).subscribe(result =>
			{
				this.submitted = false;
				this.show = false;
				this.first_show = true;
				this.first_submitted = false;
				
				 if(result.success){
					this._flashMessagesService.show('Thanks for registeration. Please check your email to confirm your account.', { cssClass: 'alert-success',timeout:10000}); 
					
					//this.angForm.reset();
				  }else{
					  this._flashMessagesService.show(result.message, { cssClass: 'alert-danger',timeout:5000});
				  }  
			   
			});
			 
			
		}	
		
    }

	onSubmitPartner() {
        this.submitted4 = true;
	
        // stop here if form is invalid
        if(this.angPartnerForm.invalid){
			 return;
        }else{
			var user = this.angPartnerForm.value;
			console.log(user);
			/*var userRole = this.roles[1]._id;
			
			 this.userservice.addUser(user,userRole).subscribe(result =>
			{
				this.submitted = false;
				this.show = false;
				this.first_show = true;
				this.first_submitted = false;
				
				 if(result.success){
					this._flashMessagesService.show('Thanks for registeration. Please check your email to confirm your account.', { cssClass: 'alert-success',timeout:10000}); 
					
					//this.angForm.reset();
				  }else{
					  this._flashMessagesService.show(result.message, { cssClass: 'alert-danger',timeout:5000});
				  }  
			   
			}); */
			 
			
		}	
		
    }
  
  /* *** Add User ** */
	
	
	ngOnInit() {
		this.first_show = true;
		this.first_show_partner = true;
		
	}
	
}
