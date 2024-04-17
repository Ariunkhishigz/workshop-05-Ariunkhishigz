import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Item } from './data.types';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, SlicePipe],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>{{
          $item().title.length > 25
            ? ($item().title | slice : 0 : 25) + '...'
            : $item().title
        }}</mat-card-title>
      </mat-card-header>
      <img
        mat-card-image
        [src]="$item().thumbnailUrl"
        [title]="$item().title"
      />
      <mat-card-content>
        <p>
          {{ $item().title }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `.card{max-width: 400px}`,
})
export class CardComponent {
  $item = input.required<Item>();
}
