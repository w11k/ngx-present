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
    this.service.selectNonNil(state => state.slides)
      .bounded(toAngularComponent(this))
      .pipe(
        map(slides => slides.find(slide => slide.component === component)),
        filter(slide => slide !== undefined),
        take(1),
      )
      .subscribe(slide => {
        let link: any[];

        if (slide) {
          link = (['/slide', ...slide.coordinates]);
        } else {
          link = [];
        }

        this.link.routerLink = link;
        // update href on link
        this.link.ngOnChanges({});
      });
  }

  ngOnDestroy(): void {}
}
