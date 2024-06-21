interface IFoodBuilder {
  reset(): IFoodBuilder;
  buildName(name: string): IFoodBuilder;
  buildDescription(description: string): IFoodBuilder;
  buildPrice(price: number): IFoodBuilder;
  buildImage(image: string): IFoodBuilder;
  build(): Food;
}

class Food {
  private name: string;
  private description: string;
  private price: number;
  private image: string;

  public setName(name: string) {
    this.name = name;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getPrice() {
    return this.price;
  }

  public getImage() {
    return this.image;
  }

  toString() {
    return `Name: ${this.name}, Description: ${this.description}, Price: ${this.price}, Image: ${this.image}`;
  }
}

class ConcreteFoodBuilder implements IFoodBuilder {
  private food: Food;

  constructor() {
    this.food = new Food();
  }

  public reset(): IFoodBuilder {
    this.food = new Food();
    return this;
  }

  public buildName(name: string): IFoodBuilder {
    this.food.setName(name);
    return this;
  }

  public buildDescription(description: string): IFoodBuilder {
    this.food.setDescription(description);
    return this;
  }

  public buildPrice(price: number): IFoodBuilder {
    this.food.setPrice(price);
    return this;
  }

  public buildImage(image: string): IFoodBuilder {
    this.food.setImage(image);
    return this;
  }

  public build(): Food {
    return this.food;
  }
}

class FoodDirector {
  private builder: IFoodBuilder;

  constructor(builder: IFoodBuilder) {
    this.builder = builder;
  }

  public makePizza(): Food {
    return this.builder
      .reset()
      .buildName("Pizza")
      .buildDescription("Delicious pizza")
      .buildPrice(10)
      .buildImage("pizza.jpg")
      .build();
  }
}

const builder = new ConcreteFoodBuilder();
const director = new FoodDirector(builder);

const pizza = director.makePizza();
console.log(pizza.toString());
