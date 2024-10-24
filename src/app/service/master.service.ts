import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl = '/api/BusBooking';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetBusLocations`);
  }
  searchBus(from: number, to: number, travelDate: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`
    );
  }
}