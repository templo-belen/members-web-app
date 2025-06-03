import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar" [style.width.px]="size" [style.height.px]="size">
      <span class="avatar-text">{{ initials }}</span>
    </div>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() name: string = '';
  @Input() size: number = 36;

  get initials(): string {
    return this.name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
