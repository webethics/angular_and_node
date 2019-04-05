import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators ,FormControl} from '@angular/forms';
//import { PasswordValidator } from '../../../validator/password.validator';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: '',
  template: '<h1></h1>'
})
export class VerifyComponent implements OnInit{
	verifycode ='';
  constructor(private _flashMessagesService: FlashMessagesService,private userservice: UserService,private router: Router,  private fb: FormBuilder,private route: ActivatedRoute) {
		
		
   }
	
	ngOnInit() {
		this.verifycode = this.route.snapshot.paramMap.get('verifycode');
		this.userservice.getUserVerified(this.verifycode).subscribe(result => {
			console.log(result);
			if(result.success){
				this._flashMessagesService.show('Account Has been Verified successfully. Thanks!', { cssClass: 'alert-success',timeout:2000});
				this.router.navigate(['/login']);
			}else{
				this._flashMessagesService.show('Wrong Code or invalid account.', { cssClass: 'alert-danger',timeout:2000});
			}	
			
		});
		  
    }
   
	
		
	
	
}
