import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { EventComponent } from "../event/event.component";

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    imports: [EventComponent]
})
export class ModalComponent {
  @Input() isModalOpen!: WritableSignal<boolean>;
  @Output() closeModal = new EventEmitter();

  close(){
    this.closeModal.emit();
  }
}
