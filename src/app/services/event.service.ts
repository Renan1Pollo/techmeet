import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Event } from '../types/Event.type';


@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  postData(data: Event): Observable<Event> {
    return this.http.post<Event>(env.apiEventsUrl, data);
  }

  getData(): Observable<Event[]> {
    return this.http.get<Event[]>(env.apiEventsUrl);
  }
}
