import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row-directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="onAdd()">
      Add
    </button>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  readonly customClass = input('');
  items = input.required<T[]>();
  add = output();
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });

  onAdd() {
    this.add.emit();
  }
}
