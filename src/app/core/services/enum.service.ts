import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from '../state/actions/enum.action';
import {selectEnumMap, selectEnumMapError} from '../state/selector/enum.selector';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  private _store = inject(Store);

  public dispatchEnumMap(names: string[]) {
    this._store.dispatch(map({ names }));
  }

  public fetchEnumMap() {
    return this._store.select(selectEnumMap);
  }

  public fetchEnumMapError() {
    return this._store.select(selectEnumMapError);
  }

}
