# Decorator Pattern

> Bài viết được sao chép từ [Decorator Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/decorator-design-pattern-tro-thu-dac-luc-cua-developers-1VgZvQ1OKAw), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Phân loại: Structural pattern
- Bí danh: Wrapper
- Mục đích: Mở rộng tính năng của một object tại run-time, decorator cung cấp một sự thay thế linh hoạt cho subclass để mở rộng tính năng của object
- Tần suất sử dụng: bình thường

## 2. Mục đích ra đời

Hãy tưởng tượng rằng bạn đang làm việc với một thư viện thông báo cho phép các chương trình khác thông báo cho người dùng của họ về các sự kiện quan trọng.

Phiên bản ban đầu của thư viện dựa trên lớp Notifier chỉ có một số trường, một hàm tạo và một phương thức gửi duy nhất. Phương thức này có thể chấp nhận một đối số thông báo từ một ứng dụng khách và gửi thông báo đến một danh sách các email đã được chuyển đến trình thông báo thông qua hàm tạo của nó. Một ứng dụng của bên thứ ba hoạt động như một ứng dụng khách phải được tạo và cấu hình đối tượng trình thông báo một lần và sau đó sử dụng nó mỗi khi có điều gì đó quan trọng xảy ra.

![](https://images.viblo.asia/f38f196d-29bc-49b3-b080-906b56c4b7c8.png)

Một lúc nào đó, bạn nhận ra rằng người dùng thư viện không chỉ muốn nhận thông báo qua email. Nhiều người còn muốn nhận được tin nhắn từ SMS, Facebook, Slack…

![](https://images.viblo.asia/92a307f5-7bbf-4dd8-ae0f-c39d95d2d83b.png)

Bạn đã mở rộng lớp Notifier và đưa các phương thức thông báo bổ sung vào các lớp con mới. Bây giờ ứng dụng khách phải khởi tạo lớp thông báo mong muốn và sử dụng nó cho tất cả các thông báo tiếp theo.

Nhưng sau đó, ai đó đã hỏi bạn một cách hợp lý rằng: “Tại sao bạn không thể sử dụng nhiều loại thông báo cùng một lúc?”

Bạn đã cố gắng giải quyết vấn đề đó bằng cách tạo các lớp con đặc biệt kết hợp nhiều phương thức thông báo trong một lớp. Tuy nhiên, nhanh chóng trở nên rõ ràng rằng cách tiếp cận này sẽ làm source code của bạn trở nên nhiều và phức tạp ở mức không cần thiết, không chỉ ở thư viện mà còn ở người sử dụng

![](https://images.viblo.asia/227e067f-40b8-4005-bb45-a4635addd199.png)

Decorator Pattern có thể giải quyết được vấn đề này bằng cách để phương thức thông báo email bên trong lớp thông báo cơ sở, nhưng chuyển tất cả các phương thức thông báo khác bên trong decorators

![](https://images.viblo.asia/72866cfd-8a62-40e1-860f-1dee14ee1ceb.png)

Client code sẽ cần chứa một đối tượng thông báo cơ bản như một tập hợp các decorator phụ thuộc vào người sử dụng. Các đối tượng decorator sẽ được cấu trúc như một ngăn xếp.

![](https://images.viblo.asia/1ecaca1e-d494-4959-99cd-872a654f68be.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/decorator/structure.png?id=8c95d894aecce5315cc1b12093a7ea0c)

Các thành phần trong mô hình:

- **Component**: là một interface quy định các method chung cần phải có cho tất cả các thành phần tham gia vào mẫu này.
- **Concrete Component**: là lớp hiện thực (implements) các phương thức của Component.
- **Decorator**: là một abstract class dùng để duy trì một tham chiếu của đối tượng Component và đồng thời cài đặt các phương thức của Component interface.
- **Concrete Decorator**: là lớp hiện thực (implements) các phương thức của Decorator, nó cài đặt thêm các tính năng mới cho Component.
- **Client**: đối tượng sử dụng Component với những yêu cầu mở rộng đính kèm.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Bạn có thể mở rộng hành vi của đối tượng mà không cần tạo lớp con mới.
- Bạn có thể thêm hoặc xoá tính năng của một đối tượng trong lúc thực thi.
- Một đối tượng có thể được bao bọc bởi nhiều wrapper cùng một lúc.
- Single Responsibility Principle - Có thể chia nhiều cách thực thi của một phương thức trong một lớp cho nhiều lớp nhỏ hơn.

**Nhược điểm**

- Khó để xóa một wrapper cụ thể khỏi stack.
- Khó để triển khai decorator theo cách mà phương thức của nó không phụ thuộc vào thứ tự trong stack.

## 5. Khi nào thì sử dụng

- Khi muốn thêm tính năng mới cho các đối tượng mà không ảnh hưởng đến các đối tượng này.
- Khi không thể mở rộng một đối tượng bằng cách thừa kế (inheritance). Chẳng hạn, một class sử dụng từ khóa final, muốn mở rộng class này chỉ còn cách duy nhất là sử dụng decorator.
- Trong một số nhiều trường hợp mà việc sử dụng kế thừa sẽ mất nhiều công sức trong việc viết code. cách khác là tránh tightly coupled.

## 6. Ví dụ minh họa

```ts
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
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- **Adapter**: Decorator khác với adapter ở chỗ decorator chỉ thay đổi trách nhiệm của một đối tượng chứ không phải giao diện của nó.
- **Composite**: Decorator có thể xem là một degenerate Composite với chỉ một component. Tuy nhiên, decorator thêm các trách nhiệm bổ sung - nó không dành cho việc tập hợp object.
- [**Strategy**](../1_strategy/README.md): Decorator cho phép bạn thay đổi “da” của một đối tượng, strategy cho phép bạn thay đổi “ruột”.Đây là hai cách thay thế để thay đổi một đối tượng.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
