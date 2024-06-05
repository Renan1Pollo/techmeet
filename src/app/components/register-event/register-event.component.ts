import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { UF } from '../../types/UF.type';

interface EventForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  image: FormControl<string | null>;
  state: FormControl<string | null>;
  date: FormControl<Date | null>;
}

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-event.component.html',
  styleUrl: './register-event.component.scss',
})
export class RegisterEventComponent implements OnInit {
  eventForm!: FormGroup;
  states: { id: number; label: string; value: string }[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.eventForm = new FormGroup<EventForm>({
      name: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, [Validators.required]),
      state: new FormControl<string | null>(null, [Validators.required]),
      image: new FormControl<string | null>(null, [Validators.required]),
      date: new FormControl<Date | null>(null, [Validators.required]),
    });

    this.loadLocalesFilter();
  }

  loadLocalesFilter() {
    this.filterService.loadLocales().subscribe({
      next: (body: UF[]) => {
        this.states = body.map((value) => ({
          id: value.id,
          label: value.nome,
          value: value.sigla,
        }));
      },
    });
  }

  submit() {
    console.log(this.eventForm)
  }
}
