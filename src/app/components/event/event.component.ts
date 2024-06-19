import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  @Input('title') title!: string;
  @Input('description') description!: string;
  @Input('date') date!: string;
  @Input('place') place!: string;
  @Input('state') state!: string;
  @Input('image') image!: string;
  isUser: boolean = true;
}
