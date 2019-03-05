import { Commands, Facade, TyduxStore } from '@w11k/tydux';
import { Injectable } from '@angular/core';
import { Coordinates } from '@w11k/ngx-present';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class HelpState {
  [key: string]: {
    open: boolean
  }
}

export class HelpMutator extends Commands<HelpState> {
  setOpen(id: string, open: boolean) {
    this.state = {
      ...this.state,
      [id]: {
        ...this.state[id],
        open: open
      }
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class HelpService extends Facade<HelpState, HelpMutator> {

  private registry = new Map<string, number>();
  private readonly separator = '.';

  constructor(tydux: TyduxStore) {
    super(tydux, 'MoreDetails', new HelpMutator(), new HelpState());
  }

  register(slideCoordinates: Coordinates): Coordinates {
    const oldCounter = this.registry.get(slideCoordinates.join(this.separator));

    let newCounter = 0;
    if (oldCounter !== undefined) {
      newCounter = oldCounter + 1;
    }

    this.registry.set(slideCoordinates.join(this.separator), newCounter);

    return [...slideCoordinates, newCounter];
  }

  deregister(detailsCoordinates: Coordinates) {
    const slideCoordinates = detailsCoordinates.slice(0, -1);

    this.registry.delete(slideCoordinates.join(this.separator));
  }

  open(slideCoordinates: Coordinates) {
    this.commands.setOpen(slideCoordinates.join(this.separator), true);
  }

  close(slideCoordinates: Coordinates) {
    this.commands.setOpen(slideCoordinates.join(this.separator), false);
  }

  isOpen(detailsCoordinates: Coordinates): Observable<boolean> {
    return super
      .select(state => state[detailsCoordinates.join(this.separator)])
      .pipe(map(subState => {
        if (subState !== undefined) {
          return subState.open;
        } else {
          return false;
        }
      }));
  }
}
