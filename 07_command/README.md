# Command Pattern

> Bài viết được sao chép từ [Command Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/command-design-pattern-tro-thu-dac-luc-cua-developers-4dbZNBqkZYM), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Command (hay còn gọi là Action, Transaction) là một mẫu thiết kế thuộc nhóm hành vi (Behavioral Pattern).
- Command pattern là một pattern cho phép bạn chuyển đổi một request thành một object độc lập chứa tất cả thông tin về request. Việc chuyển đổi này cho phép bạn tham số hoá các methods với các yêu cầu khác nhau như log, queue (undo/redo), transtraction.
- Khái niệm Command Object giống như một class trung gian được tạo ra để lưu trữ các câu lệnh và trạng thái của object tại một thời điểm nào đó.
- Command dịch ra nghĩa là ra lệnh. Commander nghĩa là chỉ huy, người này không làm mà chỉ ra lệnh cho người khác làm. Như vậy, phải có người nhận lệnh và thi hành lệnh. Người ra lệnh cần cung cấp một class đóng gói những mệnh lệnh. Người nhận mệnh lệnh cần phân biệt những interface nào để thực hiện đúng mệnh lệnh.
- Tần suất sử dụng: khá cao

## 2. Mục đích ra đời

![](https://images.viblo.asia/fb74f510-f6fb-456b-9973-686b5bd202d3.png)
![](https://images.viblo.asia/810ae80b-70cf-4f9a-bc29-ac7055db2adf.png)

Trong thiết kế hướng đối tượng – OOP, đôi khi chúng ta cần gửi các requests cho các Objects mà không biết bất cứ điều gì về hoạt động được yêu cầu hoặc người nhận yêu cầu. Chẳng hạn chúng có một ứng dụng văn bản, khi click lên button undo/ redo, save, … yêu cầu sẽ được chuyển đến hệ thống xử lý, chúng ta sẽ không thể biết được object nào sẽ nhận xử lý, cách nó thực hiện như thế nào. Command Pattern là một pattern được thiết kế cho những ứng dụng như vậy, giúp chúng ta:

- Tránh các hard-wired(kết nối cứng). Việc triển khai hard-wired vào 1 lớp là không linh hoạt.
- Không nên để lớp đối tượng phụ thuộc cụ thể vào một yêu cầu nào đó
- Cần đưa ra yêu cầu cho đối tượng mà không cần biết bất cứ gì về hoạt động được yêu cầu cũng như cụ thể nơi nhận yêu cầu.

![](https://images.viblo.asia/24df6d69-fb26-45a4-b15d-6aea0eb5e5ac.png)
![](https://images.viblo.asia/704b0d85-e456-41b6-8d68-91648f49efc4.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/command/structure.png?id=1cd7833638f4c43630f4a84017d31195)

Các thành phần trong mô hình:

- Command : là một interface hoặc abstract class, chứa một phương thức trừu tượng thực thi (execute) một hành động (operation). Request sẽ được đóng gói dưới dạng Command.
- ConcreteCommand : là các implementation của Command. Định nghĩa một sự gắn kết giữa một đối tượng Receiver và một hành động. Thực thi execute() bằng việc gọi operation đang hoãn trên Receiver.
- Client: tiếp nhận request từ phía người dùng, đóng gói request thành ConcreteCommand thích hợp và thiết lập receiver của nó.
- Invoker: tiếp nhận ConcreteCommand từ Client và gọi execute() của ConcreteCommand để thực thi request.
- Receiver : đây là thành phần thực sự xử lý business logic cho case request. Trong phương thức execute() của ConcreteCommand chúng ta sẽ gọi method thích hợp trong Receiver.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Đảm bảo nguyên tắc Single Responsibility
- Đảm bảo nguyên tắc Open/Closed
- Có thể thực hiện hoàn tác
- Giảm kết nối phụ thuộc giữa Invoker và Receiver
- Cho phép đóng gói yêu cầu thành đối tượng, dễ dàng chuyển dữ liệu giữa các thành phần hệ thống

**Nhược điểm**: Khiến code trở nên phức tạp hơn, sinh ra các lớp mới gây phức tạp cho mã nguồn.

## 5. Khi nào thì sử dụng

Dưới đây chúng ta có thể liệt kê một số trường hợp mà khi gặp sẽ phải cân nhắc sử dụng Command pattern:

- Khi cần tham số hóa các đối tượng theo một hành động thực hiện (biến action thành parameter)
- Khi cần tạo và thực thi các yêu cầu vào các thời điểm khác nhau (delay action)
- Khi cần hỗ trợ tính năng undo, log, callback hoặc transaction
- Phối hợp nhiều Command với nhau theo thứ tự

![](https://images.viblo.asia/74f20679-c6b1-4397-bf9e-1edf88c81ea4.png)

## 6. Ví dụ minh họa

```ts
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
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

Các Patterns như Chain of Responsibility, Command, Mediator, Observer: giải quyết nhiều cách khác nhau để kết nối người gửi và người nhận yêu cầu.

- Chain of Responsibility: nhận yêu cầu của người gửi, và gửi yêu cầu đó (request) dọc theo một chuỗi những người nhận tiềm năng (processor) cho đến khi một trong số chúng xử lý nó. (1 - 0..n)
- Command : thiết lập các kết nối đơn hướng giữa người nhận với người gửi với một phân lớp (1-1)
- Mediator : loại bỏ các kết nối trực tiếp giữa người gửi và người nhận, buộc chúng phải liên lạc gián tiếp thông qua một đối tượng Mediator (n-n)
- Observer : định nghĩa một interface tách biệt cho phép nhiều người nhận đăng ký và hủy đăng ký nhận yêu cầu tại thời điểm runtime (1-n)

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
