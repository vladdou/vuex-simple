import { Action, Module, Mutation } from 'vuex';

import { StoreBuilder } from './store-builder';

export class ModuleBuilder<State = any, RootState = any> {
  private _storeBuilder!: StoreBuilder<RootState>;
  private _module: Module<State, RootState>;
  private _namespace: string;

  constructor(
    storeBuilder: StoreBuilder<RootState>,
    namespace: string,
    state: State
  ) {
    this._storeBuilder = storeBuilder;
    this._namespace = namespace;
    this._module = {
      actions: {},
      mutations: {},
      namespaced: true,
      state
    };
  }

  public addAction(name: string, action: Action<State, RootState>) {
    if (this._module.actions) {
      this._module.actions[name] = action;
    }
  }
  public addMutation(name: string, mutation: Mutation<State>) {
    if (this._module.mutations) {
      this._module.mutations[name] = mutation;
    }
  }

  public commit(name: string, payload: any) {
    if (this._storeBuilder && this._storeBuilder.store) {
      this._storeBuilder.store.commit(this.namespace + '/' + name, payload);
    } else {
      throw new Error('Could not commit: no store created');
    }
  }

  public dispatch(name: string, payload: any) {
    if (this._storeBuilder && this._storeBuilder.store) {
      this._storeBuilder.store.dispatch(this.namespace + '/' + name, payload);
    } else {
      throw new Error('Could not dispatch: no store created');
    }
  }

  public get module() {
    return this._module;
  }

  public get namespace() {
    return this._namespace;
  }
}