import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	localToken = '';
  constructor(private router: Router) { }

  ngOnInit() {
	  
    this.router.events.subscribe((evt) => {
		 if(localStorage.getItem('login_token')){
			return true;
		  }else{
			
		  }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      window.scrollTo(0, 0);
    });
  }
 
}
