> Bài viết được sao chép từ [Singleton Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/singleton-design-pattern-tro-thu-dac-luc-cua-developers-Qbq5QBkJKD8), tác giả: Hoàng Đinh

# 1. Giới thiệu

Singleton là một trong số 5 design patterns thuộc nhóm Creational Design Pattern - nhóm hỗ trợ khởi tạo class. Nó đảm bảo một class chỉ có duy nhất một instance được khởi tạo và nó cung cấp phương thức truy cập đến instance đó từ mọi nơi (global access).

Sử dụng Singleton khi chúng ta muốn:

- Đảm bảo rằng chỉ có một instance của lớp.
- Việc quản lý việc truy cập tốt hơn vì chỉ có một thể hiện duy nhất.
- Có thể quản lý số lượng thể hiện của một lớp trong giới hạn chỉ định.

# 2. Mục đích ra đời

Đôi khi, trong quá trình phân tích thiết kế một hệ thống, chúng ta mong muốn có những đối tượng cần tồn tại duy nhất và có thể truy xuất mọi lúc mọi nơi. Vậy làm thế nào để hiện thực được một đối tượng như thế khi xây dựng mã nguồn? Chúng ta có thể nghĩ tới việc sử dụng một biến toàn cục (global variable : public static final). Tuy nhiên, việc sử dụng biến toàn cục nó phá vỡ quy tắc đóng gói của Lập trình hướng đối tượng.

![](https://images.viblo.asia/c07db494-fd79-486f-844d-c23ab4c8e257.png)

Để giải bài toán trên, người ta hướng đến một giải pháp là sử dụng Singleton pattern.

# 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/singleton/structure-en.png?id=4e4306d3a90f40d74c7a4d2d2506b8ec)

Cách sử dụng

- Đặt constructor là private để client không thể khởi tạo object của class
- Tạo một biến static private là instance của class đó để đảm bảo rằng nó là duy nhất và chỉ được tạo ra trong class đó thôi
- Tạo một public static method trả về instance vừa khởi tạo bên trên, đây là cách duy nhất để các class khác có thể truy cập vào instance của class này

# 4. Ưu & nhược điểm

**Ưu điểm**

- Có thể chắc chắn rằng một lớp chỉ có một instance
- Có khả năng truy cập đến instance từ mọi nơi (global access)
- Đối tượng singleton chỉ được khởi tạo duy nhất một lần khi nó được yêu cầu lần đầu.
- Kiểm soát truy cập đến instance duy nhất
- Giảm namespace

**Nhược điểm**

- Vi phạm Single Responsibility Principle. Mẫu này giải quyết hay vấn đề trên cùng một thời điểm.
- Singleton pattern có thể thể hiện thiết kế kém (bad design), chẳng hạn, khi các thành phần của chương trình biết quá nhiều về nhau.
- Có thể sinh ra khó khăn trong việc unit test client code của Singleton bởi nhiều test frameworks dựa vào kế thừa khi sản sinh mock objects.

# 5. Khi nào thì sử dụng

Singleton được sử dụng khi:

- Có thể chắc chắn rằng một lớp chỉ có một instance
- Có khả năng truy cập đến instance từ mọi nơi (global access)
- Đối tượng singleton chỉ được khởi tạo duy nhất một lần khi nó được yêu cầu lần đầu.
- Vì class dùng Singleton chỉ tồn tại 1 Instance (thể hiện) nên nó thường được dùng cho các trường hợp giải quyết các bài toán cần truy cập vào các ứng dụng như: Shared resource, Logger, Configuration, Caching, Thread pool, …
- Một số design pattern khác cũng sử dụng Singleton để triển khai: Abstract Factory, Builder, Prototype, Facade,…

# 6. Ví dụ minh họa

Xem file [example.ts](./example.ts)

# Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
