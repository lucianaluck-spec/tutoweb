import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private appService: AppService) {}

  private readonly SECURITY_PATTERN: string = "/security/";
  private readonly AUTHORIZAION_HEADER: string = "Authorization";
  private readonly PHOTO_PATTERN: string = "/www.primefaces.org";

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // não adiciona o header para /authenticate e /renew
    if ((req.url.includes(this.SECURITY_PATTERN)) || (req.url.includes(this.PHOTO_PATTERN))) {
      return next.handle(req);
    }

    this.appService.renewTokenIfNeeded();

    const user = this.appService.getAuthenticatedUser();
    const token = user ? user.token : null;
    if (token) {
      const headers = req.headers.set(this.AUTHORIZAION_HEADER, token);
      const clonedRequest = req.clone({ headers });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
