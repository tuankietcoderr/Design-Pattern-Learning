interface IGraphic {
  move(x: number, y: number): void;
  draw(): void;
}

class Dot implements IGraphic {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(`Drawing dot at (${this.x}, ${this.y})`);
  }
}

class Circle implements IGraphic {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(
      `Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius}`
    );
  }
}

class CompoundGraphic implements IGraphic {
  private children: IGraphic[] = [];

  move(x: number, y: number): void {
    this.children.forEach((child) => child.move(x, y));
  }

  draw(): void {
    this.children.forEach((child) => child.draw());
  }

  add(child: IGraphic): void {
    this.children.push(child);
  }

  remove(child: IGraphic): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren(): IGraphic[] {
    return this.children;
  }
}

class ImageEditor {
  all: CompoundGraphic;
  constructor() {
    this.all = new CompoundGraphic();
  }

  load(): void {
    const dot1 = new Dot(1, 2);
    const dot2 = new Dot(3, 4);
    const circle = new Circle(5, 6, 7);

    this.all.add(dot1);
    this.all.add(dot2);
    this.all.add(circle);
  }

  groupSelected(components: IGraphic[]): void {
    const group = new CompoundGraphic();
    components.forEach((component) => {
      group.add(component);
      this.all.remove(component);
    });
    this.all.add(group);
    this.all.draw();
  }
}

const editor = new ImageEditor();
editor.load();

const selected = editor.all.getChildren().slice(0, 2);
editor.groupSelected(selected);

const all = editor.all;
all.draw();
