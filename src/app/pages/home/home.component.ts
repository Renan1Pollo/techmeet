import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EventComponent } from '../../components/event/event.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';
import { EventService } from '../../services/event.service';
import { Event } from '../../types/Event.type';

interface FilterForm {
  locale: FormControl;
  from: FormControl;
  to: FormControl;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EventComponent,
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  filterForm!: FormGroup<FilterForm>;
  isModalOpen = signal(false);
  states: { label: string; value: string }[] = [];
  events!: Event[];

  constructor(private service: EventService, private router: Router, private filterService: FilterService) {
    this.filterForm = new FormGroup({
      locale: new FormControl(''),
      from: new FormControl(null),
      to: new FormControl(null),
    });

    this.loadLocalesFilter();
  }

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }

  loadLocalesFilter() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          label: value.nome,
          value: value.sigla,
        }));
      },
    });
  }

  ngOnInit(): void {
    this.getEventData();
  }

  getEventData(): void {
    this.events = [];
    this.service.getData().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  submit() {
    this.isModalOpen.set(false);
  }

  addEvent() {
    this.router.navigate(['/registra-evento']);
  }
}
