interface ICrab {
  getPrice(): number;
  getName(): string;
}
interface IOctobus {
  getPrice(): number;
  getName(): string;
}

interface SeaFoodFactory {
  createCrab(): ICrab;
  createOctobus(): IOctobus;
}

class Crab implements ICrab {
  private price: number = 10;
  private name: string = "Crab";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class CookedCrab implements ICrab {
  private price: number = 12;
  private name: string = "Cooked Crab";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class RawCrab implements ICrab {
  private price: number = 8;
  private name: string = "Raw Crab";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class Octobus implements IOctobus {
  private price: number = 15;
  private name: string = "Octobus";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class CookedOctobus implements IOctobus {
  private price: number = 20;
  private name: string = "Cooked Octobus";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class RawOctobus implements IOctobus {
  private price: number = 10;
  private name: string = "Raw Octobus";

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

class CookedSeaFoodFactory implements SeaFoodFactory {
  createCrab(): ICrab {
    return new CookedCrab();
  }
  createOctobus(): IOctobus {
    return new CookedOctobus();
  }
}

class RawSeaFoodFactory implements SeaFoodFactory {
  createCrab(): ICrab {
    return new RawCrab();
  }
  createOctobus(): IOctobus {
    return new RawOctobus();
  }
}

class Client {
  private crab: ICrab;
  private octobus: IOctobus;

  constructor(factory: SeaFoodFactory) {
    this.crab = factory.createCrab();
    this.octobus = factory.createOctobus();
  }

  getCrabPrice(): number {
    return this.crab.getPrice();
  }

  getOctobusPrice(): number {
    return this.octobus.getPrice();
  }

  getCrabName(): string {
    return this.crab.getName();
  }

  getOctobusName(): string {
    return this.octobus.getName();
  }
}

const cookedFactory = new CookedSeaFoodFactory();
const rawFactory = new RawSeaFoodFactory();

const cookedClient = new Client(cookedFactory);

console.log(cookedClient.getCrabName(), cookedClient.getCrabPrice());

const rawClient = new Client(rawFactory);

console.log(rawClient.getCrabName(), rawClient.getCrabPrice());
