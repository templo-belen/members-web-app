import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrModalModule } from '@clr/angular';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [ClrModalModule, CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  @Input() opened: boolean = false;
  @Input() title: string = 'Confirmación';
  @Input() paragraphs: string[] = ['¿Está seguro de continuar?'];
  
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.opened = false;
    this.openedChange.emit(this.opened);
  }

  onDecline() {
    this.decline.emit();
    this.opened = false;
    this.openedChange.emit(this.opened);
  }
}
