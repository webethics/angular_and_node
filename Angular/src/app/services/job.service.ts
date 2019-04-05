import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable()
export class JobService {

  constructor(private http: HttpClient) {}
	
	public addJob(basic_info,serviceId): any {
		let token = localStorage.getItem('login_token');
		const uri = environment.apiUrl+'user/createjobTemp';  //API
		let headers = new HttpHeaders();
		
		const obj = {
		  firstname: basic_info.firstname,
		  lastname: basic_info.lastname,
		  phone: basic_info.phone,
		  state :basic_info.state,
		  county :basic_info.county,
		  city :basic_info.city,
		  address :basic_info.address,
		  zipcode :basic_info.zipcode,
		  serviceId:serviceId
		};
		headers = headers.append('token', token); 
		 return this
		  .http
		  .post(uri, obj,{headers:headers}); 
	  }
	
	
	public submitJob(): any {
		let token = localStorage.getItem('login_token');
		let headers = new HttpHeaders();
		const obj = {};
		const uri = environment.apiUrl+'user/createjob';  //API
		headers = headers.append('token', token); 
		return this
			.http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
		
		
	}
	public getAllJobs(): any {
		let token = localStorage.getItem('login_token');
		let headers = new HttpHeaders();
		const obj = {};
		const uri = environment.apiUrl+'user/getjobs';  //API
		headers = headers.append('token', token); 
		return this
			.http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
		
		
	}
	public updateJob(basic_info,step,jobID): any {
		let token = localStorage.getItem('login_token');
		const uri = environment.apiUrl+'user/updatejobTemp';  //API
		let headers = new HttpHeaders();
		
		if(step == 'step1'){
			 const obj = {
					  step:1,
					  firstname: basic_info.job_basic_info.firstname,
					  lastname: basic_info.job_basic_info.lastname,
					  phone: basic_info.job_basic_info.phone,
					  state :basic_info.job_basic_info.state,
					  county :basic_info.job_basic_info.county,
					  city :basic_info.job_basic_info.city,
					  address :basic_info.job_basic_info.address,
					  zipcode :basic_info.job_basic_info.zipcode,
					  serviceId:basic_info.job_basic_info.serviceId
				};
			  headers = headers.append('token', token); 
			  console.log(obj);
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
		
		if(step == 'step2'){
			 const obj = {
					step:2,
					jobTitle:basic_info.job_title,
					jobDescription:basic_info.job_description,
					jobStart:basic_info.job_start_date,
					jobEnd:basic_info.job_end_date
				};
				console.log('11'+obj);
			  headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
			
		if(step == 'step3'){
			const itemrow = [];
			
			$.each(basic_info.itemRows, function(index, value) { 
				var move_data = {
				  movingType: value.moving_from,
				  floor: value.moving_from_floor,
				  address1: value.moving_from_address,
				  state :value.moving_from_state,
				  county :value.moving_from_county,
				  city :value.moving_from_city,
				  zipcode :value.moving_from_zipcode
				}
				itemrow.push(move_data);
			}); 
			
			 const obj = {step:3,moving_from:itemrow};
			
			  headers = headers.append('token', token); 
			  return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
		
		if(step == 'step4'){
			const itemrow = [];
			
			$.each(basic_info.itemRowsTo, function(index, value) { 
				var move_data = {
				  movingType: value.moving_to,
				  floor: value.moving_to_floor,
				  address1: value.moving_to_address,
				  state :value.moving_to_state,
				  county :value.moving_to_county,
				  city :value.moving_to_city,
				  zipcode :value.moving_to_zipcode
				}
				itemrow.push(move_data);
			}); 
			
			 const obj = {step:4,moving_to:itemrow};
			 
			
			  headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
	
		if(step == 'step5'){
			console.log('here');
			const obj = {step:5,appliances:basic_info.appliances,appliances_misc:basic_info.appliances_misc};
			console.log(obj);
			   headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
		if(step == 'step6'){
				
				const obj = {step:6,bedRooms:basic_info.bedRooms,bedrooms_misc:basic_info.bedrooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step7'){
				const obj = {step:7,livingRooms:basic_info.livingRooms,livingRooms_misc:basic_info.livingRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step8'){
				const obj = {step:8,familyRooms:basic_info.familyRooms,familyRooms_misc:basic_info.familyRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step9'){
				const obj = {step:9,diningRooms:basic_info.diningRooms,dininRooms_misc:basic_info.dininRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step10'){
				const obj = {step:10,kitchen:basic_info.kitchen,kitchen_misc:basic_info.kitchen_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step11'){
				const obj = {step:11,basement:basic_info.basement,basement_misc:basic_info.basement_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step12'){
				const obj = {step:12,garage:basic_info.garage,garage_misc:basic_info.garage_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step13'){
				const obj = {step:13,patioYard:basic_info.patioYard,patioYard_misc:basic_info.patioYard_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step14'){
				const obj = {step:14,appliances:basic_info.appliances,appliances_misc:basic_info.misc_info};
				console.log(obj);
			   headers = headers.append('token', token); 
				return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
	
		
	
		
		 
	}
	
	public updateEditedJob(basic_info,step,jobID): any {
		let token = localStorage.getItem('login_token');
		const uri = environment.apiUrl+'user/updatejob/'+jobID;  //API
		let headers = new HttpHeaders();
		
		if(step == 'step1'){
			 const obj = {
					  step:1,
					  firstname: basic_info.job_basic_info.firstname,
					  lastname: basic_info.job_basic_info.lastname,
					  phone: basic_info.job_basic_info.phone,
					  state :basic_info.job_basic_info.state,
					  county :basic_info.job_basic_info.county,
					  city :basic_info.job_basic_info.city,
					  address :basic_info.job_basic_info.address,
					  zipcode :basic_info.job_basic_info.zipcode,
					  serviceId:basic_info.job_basic_info.serviceId
				};
			  headers = headers.append('token', token); 
			  console.log(obj);
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
		
		if(step == 'step2'){
			 const obj = {
					step:2,
					jobTitle:basic_info.job_title,
					jobDescription:basic_info.job_description,
					jobStart:basic_info.job_start_date,
					jobEnd:basic_info.job_end_date
				};
				console.log('11'+obj);
			  headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
			
		if(step == 'step3'){
			const itemrow = [];
			
			$.each(basic_info.itemRows, function(index, value) { 
				var move_data = {
				  movingType: value.moving_from,
				  floor: value.moving_from_floor,
				  address1: value.moving_from_address,
				  state :value.moving_from_state,
				  county :value.moving_from_county,
				  city :value.moving_from_city,
				  zipcode :value.moving_from_zipcode
				}
				itemrow.push(move_data);
			}); 
			
			 const obj = {step:3,moving_from:itemrow};
			
			  headers = headers.append('token', token); 
			  return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
		
		if(step == 'step4'){
			const itemrow = [];
			
			$.each(basic_info.itemRowsTo, function(index, value) { 
				var move_data = {
				  movingType: value.moving_to,
				  floor: value.moving_to_floor,
				  address1: value.moving_to_address,
				  state :value.moving_to_state,
				  county :value.moving_to_county,
				  city :value.moving_to_city,
				  zipcode :value.moving_to_zipcode
				}
				itemrow.push(move_data);
			}); 
			
			 const obj = {step:4,moving_to:itemrow};
			 
			
			  headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers});
		}
	
		if(step == 'step5'){
			
			const obj = {step:5,appliances:basic_info.appliances,appliances_misc:basic_info.appliances_misc};
			console.log(obj);
			   headers = headers.append('token', token); 
			 return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
		if(step == 'step6'){
				
				const obj = {step:6,bedRooms:basic_info.bedRooms,bedrooms_misc:basic_info.bedrooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step7'){
				const obj = {step:7,livingRooms:basic_info.livingRooms,livingRooms_misc:basic_info.livingRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step8'){
				const obj = {step:8,familyRooms:basic_info.familyRooms,familyRooms_misc:basic_info.familyRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step9'){
				const obj = {step:9,diningRooms:basic_info.diningRooms,dininRooms_misc:basic_info.dininRooms_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step10'){
				const obj = {step:10,kitchen:basic_info.kitchen,kitchen_misc:basic_info.kitchen_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step11'){
				const obj = {step:11,basement:basic_info.basement,basement_misc:basic_info.basement_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step12'){
				const obj = {step:12,garage:basic_info.garage,garage_misc:basic_info.garage_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step13'){
				const obj = {step:13,patioYard:basic_info.patioYard,patioYard_misc:basic_info.patioYard_misc};
				console.log(obj);
				   headers = headers.append('token', token); 
				 return this
				  .http
				  .post(uri, obj,{headers:headers}); 
			}
		if(step == 'step14'){
				const obj = {step:14,appliances:basic_info.appliances,appliances_misc:basic_info.misc_info};
				console.log(obj);
			   headers = headers.append('token', token); 
				return this
			  .http
			  .post(uri, obj,{headers:headers}); 
		}
	
		
	
		
		 
	}
	
	
	
	
	// Get state API   
	public getSavedJob(): any {
		let token = localStorage.getItem('login_token');
		let headers = new HttpHeaders();
		headers = headers.append('token', token); 
		
		const uri = environment.apiUrl+'user/getjobTemp'; //API 
		return this
			.http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
	} 
	//http://localhost:3001/api/job/delete/5c9a0c509b7238289d9f8432
	public deleteJob(jobID): any {
		let token = localStorage.getItem('login_token');
		let headers = new HttpHeaders();
		headers = headers.append('token', token); 
		
		const uri = environment.apiUrl+'job/delete/'+jobID; //API 
		return this
			.http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
	} 
	
	// Get job by ID  
	public getEditJob(jobID): any {
		let token = localStorage.getItem('login_token');
		let headers = new HttpHeaders();
		headers = headers.append('token', token); 
		
		const uri = environment.apiUrl+'user/editjobs/'+jobID; //API 
		return this
			.http
            .get(uri,{headers:headers})
            .pipe(map(res => {
              return res;
            }));
	} 
	
	public getAllPlans(): any {
		const uri = environment.apiUrl+'plans'; //API 
		return this
			.http
			.get(uri);
	} 
	public getAppliances(): any {
		const uri = environment.apiUrl+'appliaces'; //API 
		return this
			.http
			.get(uri);
	} 
	public getBasement(): any {
		const uri = environment.apiUrl+'basement'; //API 
		return this
			.http
			.get(uri);
	} 
	public getBedrooms(): any {
		const uri = environment.apiUrl+'bedrooms'; //API 
		return this
			.http
			.get(uri);
	} 
	public getDiningrooms(): any {
		const uri = environment.apiUrl+'diningrooms'; //API 
		return this
			.http
			.get(uri);
	} 
	public getFamilyrooms(): any {
		const uri = environment.apiUrl+'familyrooms'; //API 
		return this
			.http
			.get(uri);
	} 
	
	public getServices(): any {
		const uri = environment.apiUrl+'services'; //API 
		return this
			.http
			.get(uri);
	} 
	public getGarages(): any {
		const uri = environment.apiUrl+'garages'; //API 
		return this
			.http
			.get(uri);
	} 
	public getKitchen(): any {
		const uri = environment.apiUrl+'kitchen'; //API 
		return this
			.http
			.get(uri);
	} 
	public getLivingrooms(): any {
		const uri = environment.apiUrl+'livingrooms'; //API 
		return this
			.http
			.get(uri);
	} 
	public getPatioyard(): any {
		const uri = environment.apiUrl+'patioyard'; //API 
		return this
			.http
			.get(uri);
	} 

	
	
   
}


