# Chain of Responsibility Pattern

> Bài viết được sao chép từ [Chain of Responsibility Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/chain-of-responsibility-design-pattern-tro-thu-dac-luc-cua-developers-yMnKMBNDZ7P), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Chain of Responsibility là một mẫu thiết kế thuộc nhóm hành vi (Behavioral Pattern).
- Mục đích: cho phép một đối tượng gửi một yêu cầu nhưng không biết đối tượng nào sẽ nhận và xử lý nó. Điều này được thực hiện bằng cách kết nối các đối tượng nhận yêu cầu thành một chuỗi (chain) và gửi yêu cầu theo chuỗi đó cho đến khi có một đối tượng xử lý nó.
- Chain of Responsibility Pattern hoạt động như một danh sách liên kết (Linked list) với việc đệ quy duyệt qua các phần tử (recursive traversal).

![](https://images.viblo.asia/a60c6ef1-5b57-4819-933f-eaae7e4aac42.png)

- Khắc phục việc ghép cặp giữa bộ gửi và bộ nhận thông điệp; các đối tượng nhận thông điệp được kết nối thành một chuỗi và thông điệp được chuyển dọc theo chuỗi này đến khi gặp được đối tượng xử lý nó.
- Tách rời nơi gửi yêu cầu khỏi nơi xử lý yêu cầu
- Cho nhiều object cố xử lý yêu cầu một cách tuần tự. Nếu 1 object không xử lý được yêu cầu, object sau sẽ xử lý.

## 2. Mục đích ra đời

Giả sử bạn làm việc với một hệ thống đặt hàng online. Bạn muốn hạn chế quyền truy cập vào hệ thống, chỉ cho user đã đăng nhập tạo các đơn đặt hàng. Mặt khác những user có quyền admin sẽ được toàn quyền truy cập vào các đơn đặt hàng.

![](https://images.viblo.asia/3adf5542-1cb3-4f82-8a43-344ebe0dacf4.png)

Sau 1 hồi lên kế hoạch, bạn nhận ra những giai đoạn kiểm tra (như kiểm tra user đã đăng nhập, user có quyền admin) cần phải thực hiện tuần tự. Ví dụ nếu việc kiểm tra user đăng nhập bị thất bại thì chúng ta ko có lí do gì để kiểm tra tiếp tục các điều kiện khác.

Một hồi sau mình thêm chức năng cache để skip nếu yêu cầu giống nhau, kiểm tra Password có đúng format hay không... Mỗi khi thêm 1 chức năng hàm kiểm tra ngày càng phức tạp, cho đến khi 1 ngày bạn refactor code.

![](https://images.viblo.asia/a7aac3d6-1c9a-478c-9005-99a2511c9efc.png)

Chuyển từng hành vi thành những đối tượng cụ thể gọi là handlers. Mỗi kiểm tra sẽ extract thành 1 hàm duy nhất. Yêu cầu sẽ được truyền dọc theo các hàm này. Tất cả tạo nên 1 chuỗi liên kết, cho đến khi yêu cầu được xử lý, đến hết mắt xích cuối.

![](https://images.viblo.asia/991ac94c-8208-4058-a223-81b8b7c75c4c.png)

Một ví dụ khác trong lập trình windows forms. Các control trên một form chứa đựng nhau tạo ra một chuỗi object. Giả sử bạn click vào một nút bấm, sự kiện “click” sẽ chạy ngược chuỗi object từ Button tới Window (cấp cao nhất) để tìm đến đúng control có khả năng xử lý nó.

![](https://images.viblo.asia/88f3ba25-83a6-4e7d-9fe2-5b332df4ccec.png)

Mẫu này gắn liền với nhiều hệ thống xử lý yêu cầu. Ví dụ tổng đài hay bất kì quy trình làm việc nào cũng sẽ đi theo tư tưởng của Chain of Responsibility. Có lỗi thì sẽ chọn đưa cho người có liên quan tiếp theo hoặc chấm dứt yêu cầu tại điểm đó.

![](https://images.viblo.asia/355a0c30-da59-4664-b6f4-493ec7dd77c1.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/structure.png)

Các thành phần trong mô hình:

- Client: tạo ra các yêu cầu và yêu cầu đó sẽ được gửi đến các đối tượng tiếp nhận.
- ConcreteHandler: xử lý yêu cầu. Có thể truy cập đối tượng successor (thuộc class Handler). Nếu đối tượng ConcreateHandler không thể xử lý được yêu cầu, nó sẽ gởi lời yêu cầu cho successor của nó.
- Handler: định nghĩa 1 interface để xử lý các yêu cầu. Gán giá trị cho đối tượng successor (không bắt buộc).
- BaseHandler: lớp trừu tượng không bắt buộc. Có thể cài đặt các hàm chung cho Chain of Responsibility ở đây.

Collaborations

- Client gọi hàm handle của Handler đầu Chain , truyền vào nội dung yêu cầu / tham số yêu cầu.
- Handler đầu tiên xác định yêu cầu có xử lý được không. Nếu không xử lý được, handler gọi handler tiếp theo (nếu có).

## 4. Ưu & nhược điểm

**Ưu điểm**

- Giảm kết nối (loose coupling): Thay vì một đối tượng có khả năng xử lý yêu cầu chứa tham chiếu đến tất cả các đối tượng khác, nó chỉ cần một tham chiếu đến đối tượng tiếp theo. Tránh sự liên kết trực tiếp giữa đối tượng gửi yêu cầu (sender) và các đối tượng nhận yêu cầu (receivers).
- Tăng tính linh hoạt : đảm bảo Open/Closed Principle
- Phân chia trách nhiệm cho các đối tượng: đảm bảo Single Responsibility Principle
- Có khả năng thay đổi dây chuyền (chain) trong thời gian chạy.

**Nhược điểm**: Một số yêu cầu có thể không được xử lý: Trường hợp tất cả Handler đều không xử lý

## 5. Khi nào thì sử dụng

Dưới đây chúng ta có thể liệt kê một số trường hợp mà khi gặp sẽ phải cân nhắc sử dụng Chain of Responsibility pattern:

- Có nhiều hơn một đối tượng có khả thực xử lý một yêu cầu trong khi đối tượng cụ thể nào xử lý yêu cầu đó lại phụ thuộc vào ngữ cảnh sử dụng.
- Muốn gửi yêu cầu đến một trong số vài đối tượng nhưng không xác định đối tượng cụ thể nào sẽ xử lý yêu cầu đó.
- Khi cần phải thực thi các trình xử lý theo một thứ tự nhất định..
- Khi một tập hợp các đối tượng xử lý có thể thay đổi động: tập hợp các đối tượng có khả năng xử lý yêu cầu có thể không biết trước, có thể thêm bớt hay thay đổi thứ tự sau này.

## 6. Ví dụ minh họa

```ts
interface Handler<Request = string, Result = string> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

  handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log("Chain: Monkey > Squirrel > Dog\n");
clientCode(monkey);
console.log("");

console.log("Subchain: Squirrel > Dog\n");
clientCode(squirrel);
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Chain of Responsibility thường được sử dụng kết hợp với Composite. Trong trường hợp này, khi một thành phần lá nhận được một yêu cầu, nó có thể chuyển nó qua chuỗi của tất cả các thành phần cha xuống gốc của cây đối tượng.
- Các trình xử lý trong Chain of Responsibility có thể được thực hiện dưới dạng Command. Trong trường hợp này, ta có thể thực thi nhiều thao tác khác nhau trên cùng một đối tượng ngữ cảnh, được thể hiện bằng một yêu cầu.
- Chain of Responsibility và Decorator có cấu trúc lớp rất giống nhau. Cả hai mẫu đều dựa vào thành phần đệ quy để truyền việc thực thi qua một loạt các đối tượng. Tuy nhiên, có một số khác biệt quan trọng. Các trình xử lý Chain of Responsibility có thể thực hiện các hoạt động tùy ý độc lập với nhau. Chúng cũng có thể ngừng chuyển yêu cầu vào bất kỳ lúc nào. Mặt khác, các trình Decorator khác nhau có thể mở rộng hành vi của đối tượng trong khi vẫn giữ cho nó nhất quán với giao diện cơ sở. Ngoài ra, Decorator không được phép phá vỡ quy trình của yêu cầu.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
