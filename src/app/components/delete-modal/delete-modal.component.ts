import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
    elementName = input.required<string | undefined>()
    onDelete = output<void>()

    confirmDelete(): void{
        this.onDelete.emit();
    }
}
