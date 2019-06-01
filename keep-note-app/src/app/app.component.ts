import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authServices: AuthenticationService,
    private routerService: RouterService) {

  }
  ngOnInit(): void {
    // let token = this.authServices.getBearerToken();
    // if (!token) {
    //   this.routerService.routeToLogin();
    // }else{
    //   this.routerService.routeToDashboard();
    // }
  }
  title = 'keep-note-app';
}
