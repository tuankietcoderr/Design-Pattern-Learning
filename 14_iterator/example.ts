class Item {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  public get Name(): string {
    return this.name;
  }
}

interface IAbstractIterator {
  first(): Item;
  next(): Item;
  isDone(): boolean;
  currentItem(): Item;
}

interface IAbstractCollection {
  createIterator(): IAbstractIterator;
}

class Collection implements IAbstractCollection {
  private items: Item[] = [];

  public createIterator(): IAbstractIterator {
    return new Iterator_(this);
  }

  public count(): number {
    return this.items.length;
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public getItem(index: number): Item {
    return this.items[index];
  }
}

class Iterator_ implements IAbstractIterator {
  private collection: Collection;
  private position: number = 0;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  public first(): Item {
    this.position = 0;
    return this.collection.getItem(this.position);
  }

  public next(): Item {
    this.position += 1;
    return this.collection.getItem(this.position);
  }

  public isDone(): boolean {
    return this.position >= this.collection.count();
  }

  public currentItem(): Item {
    return this.collection.getItem(this.position);
  }
}

const collection = new Collection();
collection.addItem(new Item("Item 1"));
collection.addItem(new Item("Item 2"));
collection.addItem(new Item("Item 3"));

const iterator = collection.createIterator();

console.log("Iterating over collection:");

for (let item = iterator.first(); !iterator.isDone(); item = iterator.next()) {
  console.log(item.Name);
}
