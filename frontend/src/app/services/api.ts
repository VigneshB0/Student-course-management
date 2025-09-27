import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:4000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions() {
    const authHeaders = this.authService.getAuthHeaders();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // Add authorization header if token exists
    if (authHeaders.Authorization) {
      headers.set('Authorization', authHeaders.Authorization);
    }
    
    return { headers };
  }

  // STUDENT CRUD
  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/students`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createStudent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/students`, JSON.stringify(data), this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  updateStudent(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/students/${id}`, JSON.stringify(data), this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteStudent(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/students/${id}`, this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  // COURSE CRUD
  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/courses`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createCourse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/courses`, JSON.stringify(data), this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCourse(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/courses/${id}`, JSON.stringify(data), this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/courses/${id}`, this.getHttpOptions())
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}