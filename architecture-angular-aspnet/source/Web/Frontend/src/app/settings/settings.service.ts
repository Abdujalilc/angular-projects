import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from './settings';

@Injectable({ providedIn: 'root' })
export class AppSettingsService {

  data: Settings = {};

  constructor(private http: HttpClient) {}

  load(defaults?: Settings): Promise<Settings> {
    return new Promise<Settings>(resolve => {
      this.http.get('app.config.json').subscribe( response => {
          console.log('using server-side configuration');
          this.data = Object.assign({}, defaults || {}, response || {});
          resolve(this.data);
        },
        () => {
          console.log('using default configuration');
          this.data = Object.assign({}, defaults || {});
          resolve(this.data);
        }
      );
    });
  }
}