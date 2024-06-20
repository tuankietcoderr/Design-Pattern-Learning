interface IPizza {
  getPrice(): number;
}

class Margherita implements IPizza {
  private price: number = 6;
  getPrice(): number {
    return this.price;
  }
}

class Mushroom implements IPizza {
  private price: number = 8;
  getPrice(): number {
    return this.price;
  }
}

interface IPizzaFactory {
  createPizza(): IPizza;
}

class MargheritaFactory implements IPizzaFactory {
  createPizza(): IPizza {
    return new Margherita();
  }
}

class MushroomFactory implements IPizzaFactory {
  createPizza(): IPizza {
    return new Mushroom();
  }
}

const margheritaFactory = new MargheritaFactory();
const mushroomFactory = new MushroomFactory();

const margherita = margheritaFactory.createPizza();
const mushroom = mushroomFactory.createPizza();

console.log(margherita.getPrice());
console.log(mushroom.getPrice());
