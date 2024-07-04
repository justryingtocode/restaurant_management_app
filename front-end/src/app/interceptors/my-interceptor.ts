import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  // List of URLs where token is not required
  readonly publicUrls: string[] = [
    'login',
    'verify',
  ];

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL matches any public URL
    const isPublicUrl = this.publicUrls.some(url => request.url.includes(url));

    // Proceed without token if it's a public URL
    if (isPublicUrl) {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Public API Request Error:', error);
          return throwError(() => error);
        })
      );
    }

    // Get token from localStorage
    const storageToken = localStorage.getItem('token');

    // Redirect to login if token is missing
    if (!storageToken) {
      this.router.navigate(['/login']);
      return throwError("No token found in local storage");
    }

    // Clone the request and add token to headers
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${storageToken}`
      }
    });

    // Proceed with the modified request
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Request Error:', error);
        return throwError(() => error);
      })
    );
  }
}
