import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Event } from '../types/Event.type';


@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private http: HttpClient) {}

  createEvent(data: Event): Observable<Event> {
    return this.http.post<Event>(env.apiEventsUrl, data, {
      headers: this.getHeaders(),
    });
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(`${env.apiEventsUrl}/${id}`, {
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
}
