import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  bearertoken: string;
  constructor(private authenticationService: AuthenticationService,
    private routerService: RouterService) {
    this.bearertoken = this.authenticationService.getBearerToken();
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.routerService.routeToLogin();
  }

}
