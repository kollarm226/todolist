import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './models/list';
import {Todo} from './models/todo';

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

  getLists(userId: string): Observable<List[]> {
    const url = `${this.listsApiUrl}?userId=${userId}`;
    return this.http.get<List[]>(url);
  }

  getTasksByListId(listId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.tasksApiUrl}/all/${listId}`);
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.tasksApiUrl}/post`, newTodo);
  }


  toggleTaskStatus(taskId: string): Observable<Todo> {
    const url = `${this.tasksApiUrl}/done/${taskId}`;
    return this.http.put<Todo>(url, {});
  }














}
