# Memento Pattern

> Bài viết được sao chép từ [Memento Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/memento-design-pattern-tro-thu-dac-luc-cua-developers-gGJ59BzrKX2), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Phân loại: Behavior Pattern
- Mục đích: Memento cho phép người lưu trữ và hồi phục các phiên bản cũ của 1 object mà không can thiệp vào nội dung của object đó.

## 2. Mục đích ra đời

Tưởng tượng bạn đang tạo 1 text editor. Bao gồm các chức năng như chỉnh sửa text, format text, thêm ảnh, v.v..

Để phát triển thêm app, bạn quyết định cho phép người dùng undo và redo bất kỳ thao tác nào thực hiện trên tệp văn bản. Bằng cách trước khi thực hiện bất kì thao tác nào, app sẽ lưu state tất cả object vào trong một storage (take snapshot, lưu vào history). Sau đó, khi user cần undo 1 thao tác, app lấy state đã được lưu trước đó trong storage và dùng nó để restore state của tất cả object.

![](https://images.viblo.asia/42c96b7c-6c54-4692-96b9-48aab9518745.png)

Nhưng cái khó ở đây là, làm thế nào để thật sự take snapshot? Bạn sẽ phải cần duyệt qua tất cả field của object để lưu nó vào storage. Tuy nhiên, việc đó là không khả thi vì thực tế hầu hết các objects thường giấu phần lớn data trong các trường private.

![](https://images.viblo.asia/45769a82-a2b0-466c-ad2c-fb040a27f0b8.png)

Có vẻ như chỉ để take snapshot, ta đã đưa app vào một tình thế rất gian nan: ta public tất cả các private fields của editor object khiến nó trở nên mong manh và tạo ra 1 class chuyên để copy editor object luôn phải thay đổi mỗi khi editor object thay đổi. Vậy còn cách nào khác để triển khai undo redo không?

Memento pattern giao việc tạo ra snapshot cho chính chủ nhân của state đó (originator object). Chính object đó sẽ dễ dàng tạo ra snapshot vì nó có toàn quyền truy cập state của nó.

Memento gợi ý ta nên lưu state được copy từ object vào một object gọi là memento. Content của memento object không được truy cập từ các object khác ngoại trừ originator object. Các object khác phải giao tiếp với memento thông qua interface bị giới hạn chỉ cho phép lấy metadata của snapshot (metadata - những data về data chứ không phải là data: ngày tạo, tên action, v.v.)..

![](https://images.viblo.asia/5dff9554-358a-406b-b2ae-e0bef6fdc668.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/memento/structure1.png?id=4b4a42363a005b617d4df06689787385)

Các thành phần trong mô hình:

- Originator: Là class sản xuất ra snapshots từ các state của chính nó, đồng thời restore state từ snapshots khi cần.
- Memento: Là object lưu giá trị, được xem như là một snapshot của Originator. Trong thực tiễn nó là immutable class (class không thay đổi được) và truyền data vào 1 lần duy nhất khi construct.
- Caretaker: Giữ câu trả lời cho các câu hỏi "khi nào" và "vì sao" cho những thời điểm capture lại state của Originator và lúc restore lại state. Caretaker lưu trữ 1 stack các mementos. Khi Originator cần đi lùi về history, Caretaker lấy memento trên cùng của stack và truyền vào restore method của Originator.

Với cách triển khai này, Memento được lồng bên trong Originator. Giúp Originator truy cập private fields và methods của memento. Còn Caretaker bị giới hạn việc truy cập memento, cho phép nó lưu các mementos thành 1 stack nhưng không đụng gì đến các state.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Bảo bảo nguyên tắc đóng gói: sử dụng trực tiếp trạng thái của đối tượng có thể làm lộ thông tin chi tiết bên trong đối tượng và vi phạm nguyên tắc đóng gói.
- Đơn giản code của Originator bằng cách để Memento lưu giữ trạng thái của Originator và Caretaker quản lý lịch sử thay đổi của Originator.
- Một số vấn đề cần xem xét khi sử dụng Memento Pattern:
  - Khi có một số lượng lớn Memento được tạo ra có thể gặp vấn đề về bộ nhớ, performance của ứng dụng.
  - Khó đảm bảo trạng thái bên trong của Memento không bị thay đổi.

**Nhược điểm**:

- App tiêu thụ nhiều RAM và xử lý nếu clients tạo mementos quá thường xuyên.
- Caretakers phải theo dõi vòng đời của originator để có thể hủy các mementos không dùng nữa.
- Hầu hết các ngôn ngữ hiện đại, hay cụ thể hơn là dynamic programming languages, ví dụ như PHP, Python và Javascript, không thể đảm bảo state bên trong memento được giữ không ai đụng tới.

## 5. Khi nào thì sử dụng

- Các ứng dụng cần chức năng cần Undo/Redo: lưu trạng thái của một đối tượng bên ngoài và có thể restore/rollback sau này.
- Thích hợp với các ứng dụng cần quản lý transaction.

## 6. Ví dụ minh họa

```ts
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  public doSomething(): void {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length }, () =>
      charSet.charAt(Math.floor(Math.random() * charSet.length))
    ).join("");
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substring(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Caretaker {
  private mementos: Memento[] = [];

  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();
    console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);

setTimeout(() => {
  caretaker.backup();
  originator.doSomething();
}, 1000);

setTimeout(() => {
  caretaker.backup();
  originator.doSomething();
}, 2000);

setTimeout(() => {
  caretaker.backup();
  originator.doSomething();
}, 3000);

setTimeout(() => {
  console.log("");
  caretaker.showHistory();

  console.log("\nClient: Now, let's rollback!\n");
  caretaker.undo();

  console.log("\nClient: Once more!\n");
  caretaker.undo();
}, 4000);
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Có thể sử dụng Command và Memento cùng nhau khi thực hiện “hoàn tác”. Trong trường hợp này, các lệnh chịu trách nhiệm thực hiện các hoạt động khác nhau trên một đối tượng đích, trong khi các Memento lưu trạng thái của đối tượng đó ngay trước khi lệnh được thực thi.
- Có thể sử dụng Memento cùng với Iterator để nắm bắt trạng thái lặp lại hiện tại và khôi phục nó nếu cần.
- Đôi khi Prototype có thể là một giải pháp thay thế đơn giản hơn cho Memento. Điều này hoạt động nếu đối tượng, trạng thái mà bạn muốn lưu trữ trong lịch sử, khá đơn giản và không có liên kết đến tài nguyên bên ngoài hoặc các liên kết dễ thiết lập lại.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
