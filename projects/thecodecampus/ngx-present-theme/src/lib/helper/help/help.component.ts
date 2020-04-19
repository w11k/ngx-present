import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ActivatedSlide, Coordinates } from '@w11k/ngx-present';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { HelpService } from './help.service';

@Component({
  selector: 'tcc-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: [
    trigger('blockChildAnimation', [
      transition(':enter', [])
    ]),
    trigger('help', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20%)' }),
        animate('555ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('555ms ease-in-out', style({ opacity: 0, transform: 'translateX(50%)' }))]),
    ]),
  ],
})
export class TccHelpComponent extends OnDestroyMixin {

  isOpen = false;

  private id$: Observable<Coordinates>;

  constructor(private readonly service: HelpService,
              private readonly activatedSlide: ActivatedSlide) {
    super();

    this.id$ = this.activatedSlide.slide
      .pipe(
        map(x => this.service.register(x.coordinates)),
        take(1),
        untilComponentDestroyed(this),
        shareReplay(1)
      );

    this.id$
      .pipe(
        switchMap(id => this.service.isOpen(id)),
        untilComponentDestroyed(this),
      )
      .subscribe(x => this.isOpen = x);
  }

  open() {
    this.id$
      .pipe(take(1))
      .subscribe(id => this.service.open(id));
  }

  close() {
    this.id$
      .pipe(take(1))
      .subscribe(id => this.service.close(id));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.id$
      .pipe(take(1))
      .subscribe(id => this.service.deregister(id));
  }
}
