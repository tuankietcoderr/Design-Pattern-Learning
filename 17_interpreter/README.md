# Interpreter Pattern

> Bài viết được sao chép từ [Interpreter Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/interpreter-design-pattern-tro-thu-dac-luc-cua-developers-djeZ1d43KWz), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Interpreter là một mẫu thiết kế thuộc nhóm hành vi (Behavioral Pattern).
- Interpreter Pattern giúp người lập trình có thể “xây dựng” những đối tượng “động” bằng cách đọc mô tả về đối tượng rồi sau đó “xây dựng” đối tượng đúng theo mô tả đó.
- Ví dụ, viết một chương trình cho phép người dùng nhập vào dòng lệnh (command) theo một cấu trúc xác định do ta quy định sẵn, chương trình sẽ nhận dạng Command dựa vào cấu trúc của nó và trả về kết quả phù hợp

## 2. Kiến trúc

![](https://images.viblo.asia/149851fe-2892-4859-a772-f141d5543523.png)

Các thành phần trong mô hình:

- AbstractionExpression: Khai báo một giao diện cho việc thực hiện một thao tác.
- TerminalExpression: Cài đặt một thao tác thông dịch liên kết với những ký pháp đầu cuối, đóng vai trò một thể nghiệm được yêu cầu cho mọi ký pháp đầu cuối trong câu.
- NonterminalExpression: Có thể chứa TerminalExpression bên trong và cũng có thể chứa một NonterminalExpression khác. Nó đóng vai trò như là “ngữ pháp” của ngôn ngữ đặc tả.
- Context: Là đối tượng thông tin để thực hiện thông dịch. Đối tượng này là toàn cục đối với quá trình thông dịch (dùng chung giữa các node).

## 3. Ưu & nhược điểm

**Ưu điểm**

- Giảm sự phục thuộc giữa abstraction và implementation (loose coupling).
- Giảm số lượng những lớp con không cần thiết.
- Code sẽ gọn gàn hơn và kích thước ứng dụng sẽ nhỏ hơn.
- Dễ bảo trì hơn.
- Dễ dàng mở rộng về sau.
- Cho phép ẩn các chi tiết implement từ client.

**Nhược điểm**

- Ngôn ngữ đặc tả được xây dựng đòi hỏi phải có cấu trúc ngữ pháp đơn giản.
- Hiệu suất không đảm bảo

## 4. Khi nào thì sử dụng

Sử dụng Interpreter Patern khi chúng ta muốn:

- Bộ ngữ pháp đơn giản. Pattern này cần xác định ít nhất một lớp cho mỗi quy tắc trong ngữ pháp. Do đó ngữ pháp có chứa nhiều quy tắc có thể khó quản lý và bảo trì.
- Không quan tâm nhiều về hiệu suất. Do bộ ngữ pháp được phân tích trong cấu trúc phân cấp (cây) nên hiệu suất không được đảm bảo.
- Interpreter Pattern thường được sử dụng trong trình biên dịch (compiler), định nghĩa các bộ ngữ pháp, rule, trình phân tích SQL, XML, …

## 5. Ví dụ minh họa

```ts
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
```

Xem file [example.ts](./example.ts)

## 6. Design Pattern liên quan

- Cây cú pháp trừu tượng là một thể nghiệm trong mẫu Composite.
- Interpreter thường sử dụng một Iterator để duyệt cấu trúc.
- Visitor có thể được sử dụng để duy trì hành vi trên mỗi nút trong cây cú pháp trừu tượng của lớp.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
