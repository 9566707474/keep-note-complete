import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  
  constructor(private routeService: RouterService, private authService: AuthenticationService) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      let bearertoken = this.authService.getBearerToken();
      if (bearertoken && bearertoken.length > 0) {
        resolve(true);
      } else {
        reject(false);
        this.routeService.routeToLogin();
      }
    });
  }
}
