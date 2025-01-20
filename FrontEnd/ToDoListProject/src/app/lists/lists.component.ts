import {Component} from '@angular/core';
import {Accordion, AccordionContent, AccordionHeader, AccordionModule, AccordionPanel} from 'primeng/accordion';
import {CommonModule, NgForOf} from '@angular/common';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {PickList} from 'primeng/picklist';
import {PrimeTemplate} from 'primeng/api';
import {FloatLabel} from 'primeng/floatlabel';
import {Task} from '../models/task';
import {BackendService} from '../backend.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionModule,
    NgForOf,
    Card,
    CommonModule,
    Button,
    Dialog,
    FormsModule,
    InputText,
    PickList,
    PrimeTemplate,
    FloatLabel,
    AccordionContent
  ],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {

  name = '';
  color = '';
  UserID = '';
  icon = '';

  constructor(private backendService: BackendService, private authService: AuthService) {
    this.UserID = this.authService.getUserId() || '';
    console.log(this.UserID);
  }

  tabs = [
    {
      title: 'School',
      content: ['Study Python', 'Study Java', 'Study JavaScript'],
      value: '0'
    },
    {
      title: 'Title 2',
      content: ['Content 2.1', 'Content 2.2', 'Content 2.3'],
      value: '1'
    },

    {
      title: 'Title 2',
      content: ['Content 2.1', 'Content 2.2', 'Content 2.3'],
      value: '2'
    },

    {
      title: 'Title 2',
      content: ['Content 2.1', 'Content 2.2', 'Content 2.3'],
      value: '3'
    }
  ];

  trackByTitle(index: number, tab: any) {
    return tab.title;
  }

  uncompletedTasks: Task[] = [
    {
      id: '1', name: 'Study Python',
      ListID: '',
      isDone: false,
      priority: 0,
      isDeleted: false
    },
    {
      id: '1', name: 'Study Java',
      ListID: '',
      isDone: false,
      priority: 0,
      isDeleted: false
    },
    {
      id: '1', name: 'Study JavaScript',
      ListID: '',
      isDone: false,
      priority: 0,
      isDeleted: false
    }
  ];

  completedTasks: Task[] = [
    {
      id: '1', name: 'Completed Task 1',
      ListID: '',
      isDone: false,
      priority: 0,
      isDeleted: false
    },
    {
      id: '1', name: 'Completed Task 2',
      ListID: '',
      isDone: false,
      priority: 0,
      isDeleted: false
    }
  ];

  visible: boolean = false;
  value3: string | undefined;

  showDialog() {
    this.visible = true;
  }

  onMoveToTarget(event: any) {
    console.log('Moved to Completed Tasks:', event.items);
  }

  onMoveToSource(event: any) {
    console.log('Moved to Uncompleted Tasks:', event.items);
  }

  addTask() {
    // function to add task to uncompleted task list
    console.log("task added")
  }

  addList() {
    const newList = {
      list_name: this.name,
      color: Number(this.color),
      UserID: this.UserID,
      icon: Number(this.icon),
    };

    console.log('Payload:', newList);

    this.backendService.addList(newList).subscribe(
      (response) => {
        console.log('List created successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error creating list:', error);
      }
    );

    this.visible = false;
  }

  resetForm() {
    this.name = '';
    this.color = '';

  }
}


