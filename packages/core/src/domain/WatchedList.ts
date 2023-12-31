export abstract class WatchedList<T> {
  public currentItems: T[];
  private initialItems: T[];
  private newItems: T[];
  private removedItems: T[];

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems ?? [];
    this.initialItems = initialItems ?? [];
    this.newItems = [];
    this.removedItems = [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return this.currentItems;
  }

  public getNewItems(): T[] {
    return this.newItems;
  }

  public getRemovedItems(): T[] {
    return this.removedItems;
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    );
  }

  private isNewItem(item: T): boolean {
    return (
      this.newItems.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removedItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    );
  }

  private removeFromNew(item: T): void {
    this.newItems = this.newItems.filter((v) => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(v, item)
    );
  }

  private removeFromRemoved(item: T): void {
    this.removedItems = this.removedItems.filter(
      (v) => !this.compareItems(v, item)
    );
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initialItems.filter((v: T) => this.compareItems(v, item)).length !==
      0
    );
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.newItems.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  public remove(item: T): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removedItems.push(item);
    }
  }
}
