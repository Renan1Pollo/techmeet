import { Router } from '@angular/router';
import { EventService } from './../../services/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  @Input() isUser!: boolean;

  constructor(private eventService: EventService, private router: Router, private location: Location) { }

  submit() {

    const email = localStorage.getItem("email");

    if (this.isUser) {

      if (email === null) {
        alert('Email não encontrado.');
        return;
      }

      this.eventService.sendEmail(email).subscribe(() => {
        alert('Presença Confirmada com sucesso!');
        this.router.navigate(['/home']);
        location.reload();
      }, error => {
        alert('Presença Confirmada com sucesso!');
      });
      return;
    }

    const isDelete = confirm('Tem certeza que deseja excluir esse evento?');
    if (isDelete) {
      this.eventService.deleteEvent(this.title).subscribe(() => {
        alert('Evento excluído com sucesso!');
        this.router.navigate(['/home']);
        location.reload();
      }, error => {
        alert('Ocorreu um erro ao excluir o evento.');
      });
    }
  }
}
