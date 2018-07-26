import { Directive, Input, OnDestroy, Type } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SlideBySlideService } from '../slide-by-slide/slide-by-slide.service';
import { toAngularComponent } from '@w11k/tydux/dist/angular-integration';
import { filter, map, take } from 'rxjs/operators';

/**
 * Use in conjunction with routerLink on an anchor tag
 */
@Directive({
  selector: '[ngxPresentSlideLink]'
})
export class SlideLinkDirective implements OnDestroy {

  constructor(private readonly service: SlideBySlideService,
              private readonly link: RouterLinkWithHref) {
  }

  @Input()
  public set ngxPresentSlideLink(component: Type<any>) {
    this.service.select(state => state.slides)
      .bounded(toAngularComponent(this))
      .pipe(
        filter(slides => slides != null),
        map(slides => slides.find(slide => slide.component === component)),
        filter(slide => slide !== undefined),
        map(slide => (['/slide', ...slide.coordinates])),
        take(1)
      )
      .subscribe(link => {
        this.link.routerLink = link;
        this.link.ngOnChanges({});
      });
  }

  ngOnDestroy(): void {}
}
