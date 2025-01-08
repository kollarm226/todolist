import {Component} from '@angular/core';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {CommonModule, NgForOf} from '@angular/common';
import {Card} from 'primeng/card';

interface Tab { title: string; value: string; content: string[]; }

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    NgForOf,
    Card,
    CommonModule
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {
  tabs: Tab[] = [
    {
      title: 'School',
      content: ['Study Python', 'Study Java', 'Study JavaScript'],
      value: '0'
    },
    {
      title: 'Title 2',
      content: ['Content 2.1', 'Content 2.2', 'Content 2.3'],
      value: '1'
    }
  ];

  trackByTitle(index: number, tab: any) {
    return tab.title;
  }
}
