class Context_ {
  private acModel: string = "";
  private isAircraft: boolean = false;

  constructor(acModel: string) {
    this.acModel = acModel;
  }

  public getModel(): string {
    return this.acModel;
  }

  public getLength(): number {
    return this.acModel.length;
  }

  public getLastChar(): string {
    return this.acModel[this.getLength() - 1];
  }

  public getFirstChar(): string {
    return this.acModel[0];
  }

  public setIsAircraft(isAircraft: boolean): void {
    this.isAircraft = isAircraft;
  }

  public getIsAircraft(): boolean {
    return this.isAircraft;
  }
}

interface Expression {
  interpretContext(context: Context_): void;
}

class CheckExpression implements Expression {
  public interpretContext(context: Context_): void {
    const acModel = context.getModel();
    if (acModel.startsWith("A") || acModel.startsWith("B")) {
      if (acModel.length === 4 || acModel.length === 5) {
        context.setIsAircraft(true);
        console.log(`The model ${acModel} is an aircraft.`);
      } else {
        context.setIsAircraft(false);
        console.log(`The model ${acModel} is not an aircraft.`);
      }
    } else {
      context.setIsAircraft(false);
      console.log(`The model ${acModel} is not an aircraft.`);
    }
  }
}

class BrandExpression implements Expression {
  public interpretContext(context: Context_): void {
    const acModel = context.getModel();
    if (acModel.startsWith("B")) {
      console.log(`The model ${acModel} is a Boeing.`);
    } else if (acModel.startsWith("A")) {
      console.log(`The model ${acModel} is an Airbus.`);
    } else {
      console.log(`The model ${acModel} is not a Boeing or Airbus.`);
    }
  }
}

class ModelExpression implements Expression {
  public interpretContext(context: Context_): void {
    if (context.getIsAircraft()) {
      console.log(`The model ${context.getModel()} is an aircraft.`);
    } else {
      console.log(`The model ${context.getModel()} is not an aircraft.`);
    }
  }
}

class TypeExpression implements Expression {
  public interpretContext(context: Context_): void {
    if (context.getIsAircraft()) {
      const acModel = context.getModel();
      if (context.getLength() === 5 && context.getLastChar() === "F") {
        console.log("Aircraft type is Cargo/Freighter");
      } else {
        console.log("Aircraft type is Passenger Transportation");
      }
    } else {
      console.log(`The model ${context.getModel()} is not an aircraft.`);
    }
  }
}

const listAirCrafts = [
  "A320",
  "A380F",
  "B737",
  "B747",
  "B777",
  "B787F",
  "TheCode",
];

const listExpressions: Expression[] = [
  new CheckExpression(),
  new BrandExpression(),
  new ModelExpression(),
  new TypeExpression(),
];

listAirCrafts.forEach((acModel) => {
  const context = new Context_(acModel);
  console.log(`\nChecking model ${context.getModel()}:`);
  listExpressions.forEach((expression) => {
    expression.interpretContext(context);
  });
});
