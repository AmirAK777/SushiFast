import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Box } from '../models/Box';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private panierBox: any[] = [];

  public send_data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.panierBox);

  constructor(private http: HttpClient) { }

  public getBoxes(): any {
    return this.http.get<Box[]>(environment.apiBaseUrl);
  }


  public getPanierBox(): any[] {
    return this.panierBox;
  }

  public setPanierBox(panierBox: any[]): void {
    this.panierBox = panierBox;
    this.send_data.next(this.panierBox);
  }

} 