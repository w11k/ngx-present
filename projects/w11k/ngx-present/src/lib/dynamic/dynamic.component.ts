import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  StaticProvider,
  Type,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'ngx-present-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnChanges {

  @Input() component: Type<any>;
  @Input() providers: StaticProvider[];

  constructor(public viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) { }

  ngOnChanges(changes: SimpleChanges) {
    // destroy existing component instance on all changes
    // on component changes and also on providers changes
    this.viewContainerRef.clear();

    if (this.component !== null) {
      const childInjector = Injector.create({
        providers: this.providers || [],
        parent:  this.injector
      });

      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.viewContainerRef.createComponent(factory, undefined, childInjector);
    }
  }

}
