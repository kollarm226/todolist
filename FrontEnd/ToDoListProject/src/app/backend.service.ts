import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './models/list';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private listsApiUrl = 'http://localhost:5186/api/lists';
  private tasksApiUrl = 'http://localhost:5186/api/todo';

  constructor(private http: HttpClient) {
  }


  addList(newList: List): Observable<any> {
    return this.http.post(`${this.listsApiUrl}`, newList, {
      responseType: 'text',
    });
  }
}
