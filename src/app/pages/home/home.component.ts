import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EventComponent } from '../../components/event/event.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';

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

  events = [
    {
      title: 'Frontin Sampa',
      place: 'São Paulo',
      date: '19/10/2024',
      description: 'Maior evento de Frontend do Brasil!',
    },
    {
      title: 'Campus Party',
      place: 'São Paulo',
      date: '26/07/2024',
      description: 'Maior evento de de Tecnologia do Brasil!',
    },
    {
      title: 'Campus Party',
      place: 'São Paulo',
      date: '26/07/2024',
      description: 'Maior evento de de Tecnologia do Brasil!',
    },
  ];

  constructor(private router: Router, private filterService: FilterService) {
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

  submit() {
    this.isModalOpen.set(false);
    console.log(this.filterForm.value.from);
    console.log(this.filterForm.value.to);
    console.log(this.filterForm.value.locale);
  }

  addEvent() {
    this.router.navigate(['/registra-evento']);
  }
}
