import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from '../types/Event.type';


@Injectable({
  providedIn: 'root',
})
export class EventService {

  sendEmail(email: string) {
    return this.http.post<any>(env.apiSendEmailUrl, {
      toEmail: email,
      subject: "Presença Confirmada!",
      body: "Presença confirmada com sucesso"
    }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  constructor(private http: HttpClient) {}

  createEvent(data: Event): Observable<Event> {
    return this.http.post<Event>(env.apiEventsUrl, data, {
      headers: this.getHeaders(),
    });
  }

  deleteEvent(name: string): Observable<Event> {
    return this.http.delete<Event>(`${env.apiEventsUrl}/${name}`, {
      headers: this.getHeaders(),
    });
  }

  getData(): Observable<Event[]> {
    return this.http.get<Event[]>(env.apiEventsUrl);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headersConfig = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return new HttpHeaders(headersConfig);
  }

  public getRole() {
    return localStorage.getItem('role');
  }
}
