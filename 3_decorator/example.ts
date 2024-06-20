import {
  createWriteStream,
  readFile,
  readFileSync,
  readdirSync,
  writeFile,
  writeFileSync,
} from "fs";
import { resolve } from "path";

interface IDataSource {
  writeData(data: string): void;
  readData(): string;
}

class FileDataSource implements IDataSource {
  private filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }

  writeData(data: string): void {
    writeFileSync(this.filename, data);
  }

  readData(): string {
    let _data = readFileSync(this.filename, "utf-8");
    return _data;
  }
}

class DataSourceDecorator implements IDataSource {
  protected wrappee: IDataSource;

  constructor(source: IDataSource) {
    this.wrappee = source;
  }

  writeData(data: string): void {
    this.wrappee.writeData(data);
  }

  readData(): string {
    return this.wrappee.readData();
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    super.writeData(this.encrypt(data));
  }

  readData(): string {
    return this.decrypt(super.readData());
  }

  private encrypt(data: string): string {
    return btoa(data);
  }

  public decrypt(data: string): string {
    return atob(data);
  }
}

// other decorators go here

const source = new FileDataSource(resolve(__dirname, "output.txt"));
source.writeData("Hello World");
console.log("Read data from file:", source.readData());

const encrypted = new EncryptionDecorator(source);
encrypted.writeData("Hello World");
console.log("Read data from encrypted:", encrypted.readData());
