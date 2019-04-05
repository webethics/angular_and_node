import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../frontend/_front_nav';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd,Event } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-frontheader',
  templateUrl: './frontend-layout.component.html',
  styleUrls: [ './frontend-layout.component.css' ]
  
})
export class FrontendLayoutComponent implements OnInit {
  public navItems = navItems;
  //public sidebarMinimized = true; 
  private changes: MutationObserver;
  public element: HTMLElement;
  user_id = '';
  userdetail:any = '';
  logged_in = false;
  
  constructor(private router: Router,private activatedRoute : ActivatedRoute,private userservice: UserService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
		
     // this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
	
			
			this.router.events.subscribe(path  => {
				this.getLoggedInUser();
			});
			
	}
	ngOnInit() {
		if(!this.isLoggedIn()){
			//console.log(this.router.url);
			this.router.navigate([this.router.url]);
		}
		
	}	
	logout(){
		localStorage.clear();
		this.router.navigate(['login']);
	} 
  ngOnDestroy(): void {
    this.changes.disconnect();
	
  }
	getLoggedInUser(){
		let token = localStorage.getItem('login_token');
		if(token){
			this.userservice.getUsers().subscribe(result => {
				console.log(result)
				this.userdetail = result[0];
			});
		}
	}
	isLoggedIn() {
	   let token = localStorage.getItem('login_token');
		if(token){
			return true ;
		}else{
			return false ;
		}
		
	}
	setuserpartner(usertype){
		localStorage.setItem('usertype',usertype);
	}
	 
}
