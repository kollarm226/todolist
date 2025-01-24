import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FloatLabel } from 'primeng/floatlabel';
import { Dialog } from 'primeng/dialog';
import { Todo } from '../models/todo';
import { Message } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lists',
  standalone: true,
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  imports: [
    AccordionModule,
    CommonModule,
    Button,
    FormsModule,
    InputText,
    Menu,
    TableModule,
    ColorPickerModule,
    FloatLabel,
    Dialog,
    Message,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
})
export class ListsComponent implements OnInit {
  name = '';
  color = '';
  UserID = '';
  icon = '';
  visible: boolean = false;
  items: MenuItem[] = [];
  tasks: Todo[] = [];
  selectedTasks!: Todo;
  newTask = '';
  currentListId: string = '';

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {
    this.UserID = this.authService.getUserId() || '';
  }

  selectList(listId: string) {
    this.currentListId = listId;
    this.fetchTasks(listId);
  }

  ngOnInit() {
    this.backendService.getLists(this.UserID).subscribe((menuItems) => {
      this.items = menuItems.map((item) => ({
        label: item.list_name,
        command: () => {
          if (item.id) {
            this.selectList(item.id);
          } else {
            this.tasks = [];
            this.currentListId = '';
          }
        },
      }));
    });
  }

  fetchTasks(listId: string) {
    this.backendService.getTasksByListId(listId).subscribe(
      (tasks) => {
        this.tasks = tasks.filter((task) => !task.isDeleted);
      },
      (error) => {
        if (error.status === 404) {
          this.tasks = [];
        }
      }
    );
  }

  addList() {
    const newList = {
      list_name: this.name,
      color: Number(this.color),
      UserID: this.UserID,
      icon: Number(this.icon),
    };

    this.backendService.addList(newList).subscribe(() => {
      this.items = [
        ...this.items,
        {
          label: newList.list_name,
        },
      ];
      this.visible = false;
      this.resetForm();
    });
  }

  showDialog() {
    this.visible = true;
  }

  resetForm() {
    this.name = '';
    this.color = '';
  }

  onTaskSelect(event: any) {
    const selectedTask = event.data;
    this.updateTaskStatus(selectedTask);
  }

  onTaskUnselect(event: any) {
    const unselectedTask = event.data;
    this.updateTaskStatus(unselectedTask);
  }

  updateTaskStatus(task: Todo) {
    this.backendService.toggleTaskStatus(task.id!).subscribe(
      (updatedTask: Todo) => {
        task.isDone = updatedTask.isDone;
      },
      (error) => {
        console.error('Error updating task status:', error);
        alert('Failed to update task status. Please try again.');
      }
    );
  }

  onHeaderCheckboxToggle(event: any) {
    const isChecked = event.checked;

    const updateTasks = this.tasks.map((task) => {
      if (task.isDone !== isChecked) {
        return this.backendService.toggleTaskStatus(task.id!).toPromise();
      }
      return null;
    });

    Promise.all(updateTasks.filter(Boolean)).then(
      () => {
        this.tasks.forEach((task) => (task.isDone = isChecked));
      },
      (error) => {
        console.error('Error updating all task statuses:', error);
        alert('Failed to update all tasks. Please try again.');
      }
    );
  }

  addTask() {
    if (!this.newTask.trim()) {
      alert('Todo name cannot be empty.');
      return;
    }

    if (!this.currentListId) {
      alert('No list selected. Please select a list first.');
      return;
    }

    const newTask = new Todo({
      ListID: this.currentListId,
      name: this.newTask,
      isDone: false,
      priority: 1,
      isDeleted: false,
    });
    this.backendService.addTodo(newTask).subscribe(
      (createdTask: Todo) => {
        this.tasks.push(new Todo(createdTask));
        this.newTask = '';
      },
      (error) => {
        console.error('Error adding task:', error);
        alert('Failed to add the task. Please try again.');
      }
    );
  }

  deleteTask(taskId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.backendService.deleteTodo(taskId).subscribe(
          () => {
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
          },
          (error) => {
            console.error('Error deleting task:', error);
            alert('Failed to delete the task. Please try again.');
          }
        );
      },
      reject: () => {
        console.log('Task deletion canceled.');
      },
    });
  }
}
