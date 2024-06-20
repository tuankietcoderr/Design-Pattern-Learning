abstract class DataMiner {
  private file: string;
  get File() {
    return this.file;
  }
  set File(value: string) {
    this.file = value;
  }

  private rawData: string;
  get RawData() {
    return this.rawData;
  }
  set RawData(value: string) {
    this.rawData = value;
  }

  openFile(path: string): void {
    console.log(`Opening file ${path}`);
  }

  closeFile(): void {
    console.log(`Closing file ${this.file}`);
  }

  abstract extractData(): void;
  abstract parseData(): void;

  mineData(path: string): void {
    this.openFile(path);
    this.extractData();
    this.parseData();
    this.closeFile();
  }
}

class CsvDataMiner extends DataMiner {
  openFile(path: string): void {
    super.openFile(path);
    console.log(`Opening CSV file ${path}`);
    this.File = "CSV";
  }

  extractData(): void {
    console.log(`Extracting data from CSV file`);
    this.RawData = "CSV data";
  }

  parseData(): void {
    console.log(`Parsing CSV data`);
    console.log(this.RawData);
  }
}

class PdfDataMiner extends DataMiner {
  openFile(path: string): void {
    super.openFile(path);
    console.log(`Opening PDF file ${path}`);
    this.File = "PDF";
  }

  extractData(): void {
    console.log(`Extracting data from PDF file`);
    this.RawData = "PDF data";
  }

  parseData(): void {
    console.log(`Parsing PDF data`);
    console.log(this.RawData);
  }
}

const csvDataMiner = new CsvDataMiner();
const pdfDataMiner = new PdfDataMiner();

csvDataMiner.mineData("data.csv");
pdfDataMiner.mineData("data.pdf");
