interface IPrinter {
  print(): void;
}

class LegacyPrinter {
  printDocument(): void {
    console.log("Legacy Printer: Printing");
  }
}

class PrinterAdapter implements IPrinter {
  private legacyPrinter: LegacyPrinter;

  constructor(legacyPrinter: LegacyPrinter) {
    this.legacyPrinter = legacyPrinter;
  }

  print(): void {
    this.legacyPrinter.printDocument();
  }
}

const printAdapter = new PrinterAdapter(new LegacyPrinter());

printAdapter.print();
