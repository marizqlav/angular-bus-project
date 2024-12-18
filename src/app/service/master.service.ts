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

  getScheduleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetBusScheduleById?id=${id}`);
  }

  getBookedSeats(scheduleId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getBookedSeats?shceduleId=${scheduleId}`
    );
  }

  booking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/PostBusBooking`, data);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddNewUser`, user);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllUsers`);
  }

  // getUser(userName: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/getUserData?userName=${userName}`);
  // }

  registerVendor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateVendor`, data);
  }

  createSchedule(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/PostBusSchedule`, data);
  }

  deleteSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/DeleteBusSchedule?id=${scheduleId}`
    );
  }
}
