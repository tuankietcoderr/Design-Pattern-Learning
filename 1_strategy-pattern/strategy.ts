class StrategyContext {
  private strategy: IStrategy;

  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public executeStrategy(a: number, b: number) {
    return this.strategy.execute(a, b);
  }
}

interface IStrategy {
  execute(a: number, b: number): number;
}

class ConcreteStrategyA implements IStrategy {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategyB implements IStrategy {
  execute(a: number, b: number): number {
    return a - b;
  }
}

let result: number;
const context = new StrategyContext(new ConcreteStrategyA());
result = context.executeStrategy(5, 3); // 8
console.log(`A: ${result}`);

context.setStrategy(new ConcreteStrategyB());
result = context.executeStrategy(5, 3); // 2
console.log(`B: ${result}`);
