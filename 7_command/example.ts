interface ICommand {
  execute(): void;
}

class SimpleCommand implements ICommand {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

class ComplexCommand implements ICommand {
  private receiver: Receiver;
  private a: string;
  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object"
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

class Invoker {
  private onStart: ICommand;
  private onFinish: ICommand;
  private onCanceled: ICommand;

  setOnStart(command: ICommand): void {
    this.onStart = command;
  }

  setOnFinish(command: ICommand): void {
    this.onFinish = command;
  }

  setOnCanceled(command: ICommand): void {
    this.onCanceled = command;
  }

  doSomethingImportant(): void {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  doCancel(): void {
    console.log("Invoker: Does anybody want something done before I cancel?");
    if (this.isCommand(this.onCanceled)) {
      this.onCanceled.execute();
    }
  }

  private isCommand(object: ICommand): object is ICommand {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker();

invoker.setOnStart(new SimpleCommand("Say Hi!"));

const receiver = new Receiver();

invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.setOnCanceled(new SimpleCommand("Say Bye!"));

invoker.doSomethingImportant();
invoker.doCancel();
