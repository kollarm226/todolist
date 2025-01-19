import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './models/list';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private listsApiUrl = 'http://localhost:5000/api/lists'; // Replace with your actual backend URL
  private tasksApiUrl = 'http://localhost:5000/api/todo'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {
  }

  // Lists-related methods
  getLists(): Observable<any> {
    return this.http.get(`${this.listsApiUrl}`);
  }

  deleteList(id: string): Observable<any> {
    return this.http.delete(`${this.listsApiUrl}/${id}`);
  }

  createList(list: any): Observable<any> {
    return this.http.post(`${this.listsApiUrl}`, list);
  }

  getListsByUser(userId: string): Observable<List[]> {
    return this.http.get<List[]>(`${this.listsApiUrl}/user/${userId}`);
  }

  getListById(id: string): Observable<any> {
    return this.http.get(`${this.listsApiUrl}/${id}`);
  }

  // Tasks-related methods
  getTasksByList(listId: string): Observable<any> {
    return this.http.get(`${this.tasksApiUrl}/all/${listId}`);
  }

  getNotDeletedTasks(listId: string): Observable<any> {
    return this.http.get(`${this.tasksApiUrl}/notdeleted?listId=${listId}`);
  }

  getDeletedTasks(listId: string): Observable<any> {
    return this.http.get(`${this.tasksApiUrl}/deleted?listId=${listId}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.tasksApiUrl}/post`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.tasksApiUrl}/delete/${taskId}`);
  }

  toggleTaskDeleted(taskId: string): Observable<any> {
    return this.http.put(`${this.tasksApiUrl}/changeDeleted/${taskId}`, {});
  }

  toggleTaskDone(taskId: string): Observable<any> {
    return this.http.put(`${this.tasksApiUrl}/done/${taskId}`, {});
  }

  addList(newList: List) {

  }
}
