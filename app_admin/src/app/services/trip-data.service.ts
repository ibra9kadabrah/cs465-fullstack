import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/api/trips';

  public getTrips(): Observable<Trip[]> {
    let url: string = 'http://localhost:3000/api/trips';
    return this.http.get<Trip[]>(url);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, trip);
  }
  
  public updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/trips/${tripCode}`);
  }

}