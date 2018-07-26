import { Mutator, Store } from '@w11k/tydux';
import { Injectable } from '@angular/core';

export class OverviewState {
  readonly defaultZoom = 6;
  readonly minZoom = 2;
  readonly maxZoom = 12;
  zoom = this.defaultZoom;
  lineBreakOnFirstLevel = true;
}


export class OverviewMutator extends Mutator<OverviewState> {

  constructor() {
    super();
  }

  zoomIn() {
    if (this.state.zoom >= this.state.minZoom) {
      this.state = {
        ...this.state,
        zoom: this.state.zoom - 1
      };
    }
  }

  resetZoom() {
    this.state = {
      ...this.state,
      zoom: this.state.defaultZoom
    };
  }

  zoomOut() {
    if (this.state.zoom <= this.state.maxZoom) {
      this.state = {
        ...this.state,
        zoom: this.state.zoom + 1
      };
    }
  }

  toggleLineBreakOnFirstLevel() {
    this.state.lineBreakOnFirstLevel = !this.state.lineBreakOnFirstLevel;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OverviewService extends Store<OverviewMutator, OverviewState> {

  constructor() {
    super('TenThousandFoot', new OverviewMutator(), new OverviewState());
  }

  zoomIn() {
    this.mutate.zoomIn();
  }

  resetZoom() {
    this.mutate.resetZoom();
  }

  zoomOut() {
    this.mutate.zoomOut();
  }

  toggleLineBreakOnFirstLevel() {
    this.mutate.toggleLineBreakOnFirstLevel();
  }
}
