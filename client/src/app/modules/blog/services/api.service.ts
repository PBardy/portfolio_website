import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericAPIResponse } from '../../../../../../shared/interfaces/responses.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string, params?: HttpParams) {
    const path = `${environment.apiUrl}/${url}`;
    return this.http.get<APIResponse<T>>(path, { params });
  }

  public put<T>(url: string, data: any) {
    const path = `${environment.apiUrl}/${url}`;
    return this.http.put<APIResponse<T>>(path, data);
  }

  public post<T>(url: string, data: any) {
    const path = `${environment.apiUrl}/${url}`;
    return this.http.post<APIResponse<T>>(path, data);
  }

  public delete<T>(url: string, data?: any) {
    const path = `${environment.apiUrl}/${url}`;
    return this.http.delete<APIResponse<T>>(path, data);
  }
}

type APIResponse<T> = GenericAPIResponse<T>;
