export abstract class MockRepository<T> {
  protected _items: T[];

  constructor() {
    this._items = [];
  }

  public addItem(t: T): void {
    let found = false;
    for (let item of this._items) {
      if (this.compareItems(item, t)) {
        found = true;
      }
    }

    if (!found) {
      this._items.push(t);
    }
  }

  public removeItem(t: T): void {
    this._items = this._items.filter((item) => !this.compareItems(item, t));
  }

  abstract compareItems(a: T, b: T): boolean;
}
