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
  selector: 'ngp-dynamic',
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
    if (this.component !== null) {
      const childInjector = Injector.create({
        providers: this.providers || [],
        parent:  this.injector
      });

      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.viewContainerRef.clear();

      this.viewContainerRef.createComponent(factory, undefined, childInjector);
    }
  }

}
