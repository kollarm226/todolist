import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PickList } from 'primeng/picklist';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TableModule,
    PickList,
    CommonModule,
    Button,
    Dialog,
    InputText,
    FormsModule,
    ColorPicker
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  color: string | undefined;
  uncompletedTasks: Task[] = [
    { id: 1, name: 'Study Python' },
    { id: 2, name: 'Study Java' },
    { id: 3, name: 'Study JavaScript' }
  ];

  completedTasks: Task[] = [
    { id: 4, name: 'Completed Task 1' },
    { id: 5, name: 'Completed Task 2' }
  ];

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  onMoveToTarget(event: any) {
    console.log('Moved to Completed Tasks:', event.items);
  }

  onMoveToSource(event: any) {
    console.log('Moved to Uncompleted Tasks:', event.items);
  }
  addTask(){
    // function to add task to uncompleted task list
    console.log("task added")
  }
}
