import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // URL base da API Laravel
  private apiUrl = 'https://34.39.165.230/api';

  constructor(private http: HttpClient) {}

  
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/devices`);
  }

  
  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(
      `${this.apiUrl}/devices`,
      device
    );
  }

  
  toggleUse(id: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/devices/${id}/use`,
      {}
    );
  }
}
