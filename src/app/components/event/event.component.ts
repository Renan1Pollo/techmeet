import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  @Input('title') title!: string;
  @Input('description') description!: string;
  @Input('date') date!: string;
  @Input('place') place!: string;
  @Input('state') state!: string;
  @Input('image') image!: string;
  isUser: boolean = true;

  ngOnInit() {
    const role = localStorage.getItem('role');

    if (role != null) {
      this.isUser = role.toUpperCase() === '"USER"';
    }
  }
}
