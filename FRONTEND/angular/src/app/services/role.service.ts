import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_ms_security}/roles`);
  }

  view(id: string): Observable<Role> {
    return this.http.get<Role>(`${environment.url_ms_security}/roles/${id}`);
  }

  create(theRole: Role): Observable<Role> {
    return this.http.post<Role>(
      `${environment.url_ms_security}/roles`,
      theRole
    );
  }

  update(theRole: Role): Observable<Role> {
    return this.http.put<Role>(
      `${environment.url_ms_security}/roles/${theRole._id}`,
      theRole
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_security}/roles/${id}`);
  }
}
