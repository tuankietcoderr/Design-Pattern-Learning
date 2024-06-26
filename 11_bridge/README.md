# Bridge Pattern

> Bài viết được sao chép từ [Bridge Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/bridge-design-pattern-tro-thu-dac-luc-cua-developers-gDVK2oG2ZLj), tác giả: Hoàng Đinh

## 1. Giới thiệu

Bridge Pattern là một trong những Pattern thuộc nhóm Structural Pattern.

Ý tưởng của nó là tách tính trừu tượng (abstraction) ra khỏi tính hiện thực (implementation) của nó. Từ đó có thể dễ dàng chỉnh sửa hoặc thay thế mà không làm ảnh hưởng đến những nơi có sử dụng lớp ban đầu. Sử dụng Bridge Patern khi chúng ta muốn:

- Khi bạn muốn tách ràng buộc giữa Abstraction và Implementation, để có thể dễ dàng mở rộng độc lập nhau.
- Cả Abstraction và Implementation của chúng nên được mở rộng bằng subsclass.
- Sử dụng ở những nơi mà những thay đổi được thực hiện trong implement không ảnh hưởng đến phía client.

## 2. Mục đích ra đời

Mình có 3 ví dụ từ đơn giản đến phức tạp để minh họa cho vấn đề khi chưa có Bridge Pattern:

### VD1

Hãy tưởng tượng rằng rằng mình có 1 con game. Nhân vật của game có 2 thuộc tính là hệ tộc và nghề nhiệp, với mỗi hệ tộc và nghề nghiệp sẽ có cơ chế chơi khác nhau về kĩ năng, item và nhiều yếu tố khác. Khi có càng nhiều hệ tộc và nghề nghiệp sẽ dẫn đến số lượng class con quản lý logic cho các trường hợp chọn lựa của người chơi bị tăng lên rất nhiều.

### VD2

Trong một công ty có nhiều loại nhân viên. Mỗi loại nhân viên có một cách tính lương khác nhau. Chương trình quản lý nhân viên của bạn sẽ tính toán lương cho một nhân viên như thế nào họ chuyển từ loại này sang loại khác(hoặc chuyển từ phòng ban này sang phòng ban khác,). Ví dụ: Khi bạn apply vào vị trí developer của một công ty phần mềm, khi bắt đầu làm thì bạn là junior, một bậc cao hơn là senior, và cao hơn nữa là vai trò leader.Mỗi lần “lên cấp” như vậy là một lần thay đổi công thức tính lương.

### VD3

Giả sử bạn có class Shape và 2 subclass là Hình tròn và Hình vuông. Sau đó, do nhu cầu phát sinh, bạn muốn kết hợp thêm màu sắc vào là Đỏ và Xanh. Tuy nhiên thì bạn đã có hai subclass rồi, nên muốn thêm màu sắc thì bạn phải tạo 4 subclass là Hình vuông Xanh, Hình vuông Đỏ, Hình Tròn Xanh, Hình Tròn đỏ…Nếu ta thêm một màu hoặc một hình nữa thì sẽ phải tạo thêm lớp kế thừa.

=> Vấn đề: Việc thêm các loại hình dạng và màu sắc mới vào hệ thống thì sẽ phải tạo thêm nhiều lớp kế thừa.

Vấn đề này xảy ra khi chúng ta cố gắng mở rộng Shape và Color theo hai chiều độc lập, một vấn đề rất phổ biến đối với Kế thừa trong lập trình hướng đối tượng.

![](https://images.viblo.asia/d6289d67-1278-412f-b413-0609fa4a4fe7.png)

Từ đó Bridge Pattern ra đời, nó giúp chuyển đổi từ kế thừa (Inheritance) sang thành phần (Composition).

**Giải pháp**: Trong lớp Shape có một thuộc tính là Color, Color thì có thể thêm các màu kế thừa như Xanh Đỏ Tím Vàng tùy ý. Khi đó muốn Hình Chữ Nhật Đỏ ta chỉ cần Hình Chữ Nhật có thuộc tính Màu là đỏ thôi, tương tự với các hình khác mà không cần phải kế thừa nhiều.

![](https://images.viblo.asia/1261db9a-4774-4ad1-90fc-9b62b5fb71c0.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/bridge/structure-en.png?id=827afa4b40008dc29d26fe0f4d41b9cc)

Các thành phần trong mô hình:

- Abstraction (Shape): định nghĩa giao diện của lớp trừu tượng, quản lý việc tham chiếu đến đối tượng hiện thực cụ thể (Implementation).
- Refined Abstraction (Circle, Square): kế thừa Abstraction.
- Implementation (Color): định nghĩa giao diện cho các lớp hiện thực. Thông thường nó là interface định ra các tác vụ nào đó của Abstraction.
- ConcreteImplementation (Red, Blue): kế thừa Implementation và định nghĩa chi tiết hàm thực thi.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Giảm sự phục thuộc giữa abstraction và implementation (loose coupling): tính kế thừa trong OOP thường gắn chặt abstraction và implementation lúc build chương trình. Bridge Pattern có thể được dùng để cắt đứt sự phụ thuộc này và cho phép chúng ta chọn implementation phù hợp lúc runtime.
- Giảm số lượng những lớp con không cần thiết: một số trường hợp sử dụng tính inheritance sẽ tăng số lượng subclass rất nhiều. Ví dụ: trường hợp chương trình view hình ảnh trên các hệ điều hành khác nhau, ta có 6 loại hình (JPG, PNG, GIF, BMP, JPEG, TIFF) và 3 hệ điều hành (Window, MacOS, Ubuntu). Sử dụng inheritance trong trường hợp này sẽ làm ta thiết kế 18 lớp: JpgWindow, PngWindow, GifWindow, …. Trong khi áp dụng Bridge sẽ giảm số lượng lớp xuống 9 lớp: 6 lớp ứng với từng implement của Image và 3 lớp ứng với từng hệ điều hành, mỗi hệ điều hành sẽ gồm một tham chiếu đến đối tượng Image cụ thể.
- Code sẽ gọn gàn hơn và kích thước ứng dụng sẽ nhỏ hơn: do giảm được số class không cần thiết.
- Dễ bảo trì hơn: các Abstraction và Implementation của nó sẽ dễ dàng thay đổi lúc runtime cũng như khi cần thay đổi thêm bớt trong tương lai.
- Dễ dàng mở rộng về sau: thông thường các ứng dụng lớn thường yêu cầu chúng ta thêm module cho ứng dụng có sẵn nhưng không được sửa đổi framework/ứng dụng có sẵn vì các framework/ứng dụng đó có thể được công ty nâng cấp lên version mới. Bridge Pattern sẽ giúp chúng ta trong trường hợp này.
- Cho phép ẩn các chi tiết implement từ client: do abstraction và implementation hoàn toàn độc lập nên chúng ta có thể thay đổi một thành phần mà không ảnh hưởng đến phía Client. Ví dụ, các lớp của chương trình view ảnh sẽ độc lập với thuật toán vẽ ảnh trong các implementation. Như vậy ta có thể update chương trình xem ảnh khi có một thuật toán vẽ ảnh mới mà không cần phải sửa đổi nhiều.

**Nhược điểm**: Có thể làm tăng độ phức tạp khi áp dụng cho một lớp có tính gắn kết cao

## 5. Khi nào thì sử dụng

Bridge được sử dụng khi:

- Khi muốn tách ràng buộc giữa Abstraction và Implementation, để có thể dễ dàng mở rộng độc lập nhau.
- Khi cả Abstraction và Implementation của chúng nên được mở rộng bằng subclass.
- Thay đổi trong thành phần được bổ sung thêm của một Abstraction mà không ảnh hưởng đối với các Client

## 6. Ví dụ minh họa

```ts
interface IDevice {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class RemoteControl {
  protected device: IDevice;

  constructor(device: IDevice) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

class TV implements IDevice {
  private enabled: boolean = false;
  private volume: number = 50;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class Radio implements IDevice {
  private enabled: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

const tv = new TV();

const remoteControl = new RemoteControl(tv);
remoteControl.togglePower();

console.log(tv.isEnabled());

remoteControl.volumeUp();
remoteControl.volumeUp();
console.log(tv.getVolume());

remoteControl.channelUp();
console.log(tv.getChannel());

const radio = new Radio();
const advancedRemoteControl = new AdvancedRemoteControl(radio);
advancedRemoteControl.togglePower();

console.log(radio.isEnabled());

advancedRemoteControl.mute();
console.log(radio.getVolume());
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Adapter Adapter và Bridge giống nhau là đều sẽ nhờ vào một lớp khác để thực hiện một số xử lý nào đó Khác nhau: Khác về mục đích sử dụng
  - Adapter được dùng để biến đổi một class/ interface sang một dạng khác có thể sử dụng được, giúp các lớp không tương thích hoạt động cùng nhau mà bình thường là không thể.
  - Bridge được sử dụng để tách thành phần trừu tượng (abstraction) và thành phần thực thi (implementation) riêng biệt. Khác nhau về thời điểm ứng dụng
  - Adapter làm cho mọi thứ có thể hoạt động với nhau sau khi chúng đã được thiết kế (đã tồn tại)
  - Bridge nên được thiết kế trước khi phát triển hệ thống để Abstraction và Implementation có thể thực hiện một cách độc lập.
- Abstract Factory: có thể sử dụng cùng với Bridge. Việc ghép nối này rất hữu ích khi một số trừu tượng được xác định bởi Bridge chỉ có thể hoạt động với các triển khai cụ thể. Trong trường hợp này, Abstract Factory có thể đóng gói các quan hệ này và ẩn sự phức tạp khỏi Client.
- Builder: có thể kết hợp với Bridge. Director class có thể giữ vai trò là Abstraction, trong khi các Builder class khác giữ vai trò Implementation

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
