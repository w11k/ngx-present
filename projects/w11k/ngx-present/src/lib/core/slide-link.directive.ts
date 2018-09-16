import { Directive, ElementRef, Input, OnDestroy, Optional, Type } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { fromEvent, ReplaySubject } from 'rxjs';
import { Slide } from './presentation.types';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

function isMouseEvent(event: any): event is MouseEvent {
  return event instanceof MouseEvent;
}

/**
 * Use in conjunction with routerLink on an anchor tag for real links.
 * Use on any tag for click event handling.
 */
@Directive({
  selector: '[ngxPresentSlideLink]'
})
export class SlideLinkDirective implements OnDestroy {

  private readonly slide$ = new ReplaySubject<Slide>(1);

  constructor(private readonly service: SlideBySlideService,
              private readonly router: Router,
              private readonly element: ElementRef,
              @Optional() private readonly routerLinkDirective: RouterLinkWithHref) {

    if (routerLinkDirective) {
      this.slide$
        .pipe(
          untilComponentDestroyed(this),
        )
        .subscribe(slide => {
          let link: any[];

          if (slide) {
            const mode = `/${this.service.state.currentMode}`;
            link = ([mode, ...slide.coordinates]);
          } else {
            link = [];
          }

          this.routerLinkDirective.routerLink = link;
          // update href on link
          this.routerLinkDirective.ngOnChanges({});
        });
    }

    fromEvent(element.nativeElement, 'click')
      .pipe(
        filter(isMouseEvent),
        filter(event => event.altKey),
        withLatestFrom(this.slide$),
        untilComponentDestroyed(this),
      )
      .subscribe(([event, slide]) => {
        event.preventDefault();

        const link = (['/presenter', ...slide.coordinates]);

        this.router.navigate(link, { queryParamsHandling: 'merge'});
      });
  }

  @Input()
  public set ngxPresentSlideLink(component: Type<any>) {
    this.service.selectNonNil(state => state.slides)
      .bounded(toAngularComponent(this))
      .pipe(
        map(slides => slides.find(slide => slide.component === component)),
        filter(slide => slide !== undefined),
        take(1),
      )
      .subscribe(slide => this.slide$.next(slide));
  }

  ngOnDestroy(): void {}
}
