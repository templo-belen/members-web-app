import {ClrCheckboxModule, ClrDatagridFilterInterface, ClrIconModule} from '@clr/angular';
import {Component, ElementRef, EventEmitter, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberListItem} from '../../../core/models/member.model';

@Component({
  selector: 'app-check-icon-filter',
  template: `
    <clr-toggle-wrapper>
      <input #toggleRef type="checkbox" clrToggle [name]="'filter-' + field" (change)="onToggleChange($event)" />
      <label>{{ label }}</label>
    </clr-toggle-wrapper>
    <div style="text-align: center">
      <button type="button" class="btn btn-sm btn-link" (click)="reset()">Limpiar</button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ClrIconModule, ClrCheckboxModule],
  host: {
  '[class.check-icon-filter]': 'true',
  },
})
export class CheckIconFilter implements ClrDatagridFilterInterface<MemberListItem> {
  @Input() field!: keyof MemberListItem;
  @Input() label = 'Filtrar';
  @ViewChild('toggleRef') toggleRef!: ElementRef<HTMLInputElement>;

  changes = new EventEmitter<unknown>(false);
  selected: boolean | null = null;

  accepts(item: MemberListItem): boolean {
    if (this.selected === null)
      return true;
    return item[this.field] === this.selected;
  }

  isActive(): boolean {
    return this.selected !== null;
  }

  onToggleChange(event: Event) {
    this.selected = (event.target as HTMLInputElement).checked;
    this.changes.emit();
  }

  reset() {
    this.selected = null;
    if (this.toggleRef) {
      this.toggleRef.nativeElement.checked = false;
    }
    this.changes.emit();
  }

}
