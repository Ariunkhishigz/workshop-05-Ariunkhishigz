import { JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { online_data } from './data';
import { Item } from './data.types';
import { CardComponent } from './card.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <div class="container">
    <div class="centered">
      <h1>Welcome!</h1>
      <app-card [$item]="$displayed_item()" />
      <mat-paginator
        [length]="100"
        [pageSize]="10"
        [hidePageSize]="false"
        (page)="handlePage($event)"
      >
        >
      </mat-paginator>
    </div>
  </div>`,
  styles: [
    `
      .container {
        /* Center horizontally */
        margin: 0 auto;
        width: 400px;
        height: 100vh;
        /* Setup to center vertically */
        position: relative;
      }
      .centered {
        /* Center vertically */
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }
    `,
  ],
  imports: [JsonPipe, CardComponent, MatPaginatorModule],
})
export class AppComponent {
  readonly #title = inject(Title);
  $data = signal<Item[]>([]);
  $displayed_index = signal(0);
  $displayed_item = computed(() => {
    return this.$data()[this.$displayed_index()];
  });
  constructor() {
    this.$data.set(online_data);
    effect(() => console.log(this.$displayed_item()));
    effect(() => this.#title.setTitle(this.$displayed_item().title));
  }
  handlePage(event: PageEvent) {
    this.$displayed_index.set(event.pageIndex);
  }
}
