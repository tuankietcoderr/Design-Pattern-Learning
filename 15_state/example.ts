class Context {
  private state: State;
  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }
  public request2(): void {
    this.state.handle2();
  }
}

abstract class State {
  protected context: Context;

  public setContext(context: Context): void {
    this.context = context;
  }

  public abstract handle1(): void;
  public abstract handle2(): void;
}

class ConcreteStateA extends State {
  override handle1(): void {
    console.log("ConcreteStateA is handling the request 1.");
    console.log("ConcreteStateA is changing the state to ConcreteStateB.");
    this.context.transitionTo(new ConcreteStateB());
  }
  override handle2(): void {
    console.log("ConcreteStateA is handling the request 2");
  }
}

class ConcreteStateB extends State {
  override handle1(): void {
    console.log("ConcreteStateB is handling the request 1.");
  }
  override handle2(): void {
    console.log("ConcreteStateB is handling the request 2.");
    console.log("ConcreteStateB is changing the state to ConcreteStateA.");
    this.context.transitionTo(new ConcreteStateA());
  }
}

const _context = new Context(new ConcreteStateA());
_context.request1();
_context.request2();
