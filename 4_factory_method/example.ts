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

enum PizzaType {
  Margherita,
  Mushroom,
}

class PizzaFactory {
  private pizza: IPizza | null = null;

  public createPizza(pizzaType: PizzaType): IPizza {
    switch (pizzaType) {
      case PizzaType.Margherita:
        this.pizza = new Margherita();
        break;
      case PizzaType.Mushroom:
        this.pizza = new Mushroom();
        break;
    }
    return this.pizza;
  }
}

const pizzaFactory = new PizzaFactory();

const margherita = pizzaFactory.createPizza(PizzaType.Margherita);
const mushroom = pizzaFactory.createPizza(PizzaType.Mushroom);

console.log(margherita.getPrice());
console.log(mushroom.getPrice());
