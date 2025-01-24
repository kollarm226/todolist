import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from './models/list';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private listsApiUrl = 'https://taskhive-azgacehfbeapb9hn.westeurope-01.azurewebsites.net/api/lists';
  private tasksApiUrl = 'https://taskhive-azgacehfbeapb9hn.westeurope-01.azurewebsites.net/api/todo';

  constructor(private http: HttpClient) {}

  // Metoda na pridanie noveho zoznamu
  addList(newList: List): Observable<any> {
    return this.http.post(`${this.listsApiUrl}`, newList, {
      responseType: 'text',
    });
  }

  // Metoda na ziskanie zoznamov pouzivatela
  getLists(userId: string): Observable<List[]> {
    const url = `${this.listsApiUrl}?userId=${userId}`;
    return this.http.get<List[]>(url);
  }

  // Metoda na ziskanie uloh podľa ID zoznamu
  getTasksByListId(listId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.tasksApiUrl}/notdeleted?listId=${listId}`);
  }

  // Metoda na pridanie novej ulohy
  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.tasksApiUrl}/post`, newTodo);
  }

  // prepnutie stavu ulohy (done)
  toggleTaskStatus(taskId: string): Observable<Todo> {
    const url = `${this.tasksApiUrl}/done/${taskId}`;
    return this.http.put<Todo>(url, {});
  }

  // Metoda na vymazanie ulohy
  deleteTodo(id: string): Observable<Todo> {
    const url = `${this.tasksApiUrl}/delete/${id}`;
    return this.http.delete<Todo>(url);
  }
}
