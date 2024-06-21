# Flyweight Pattern

> Bài viết được sao chép từ [Flyweight Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/flyweight-design-pattern-tro-thu-dac-luc-cua-developers-maGK7B4b5j2), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Flyweight là một mẫu thiết kế thuộc nhóm Structural Pattern – những mẫu thiết kế giúp dễ dàng thiết kế bằng cách xác định một cách hiện thực hóa mối quan hệ giữa các thực thể.
- Mẫu thiết kế Flyweight là một mẫu thiết kế cấu trúc cho phép bạn lắp nhiều đối tượng hơn vào dung lượng RAM có sẵn bằng cách chia sẻ, phân phối các phần trạng thái chung - riêng giữa nhiều đối tượng thay vì giữ tất cả dữ liệu trong mỗi đối tượng.
- Khi nhiều đối tượng (objects) phải được xử lý mà chương trình không thể chịu nổi một lượng dữ liệu khổng lồ, thì cần dùng flyweight.
- Nó là một trong những mẫu thiết kế của Gang of Four.
- Tần suất sử dụng: Thấp

## 2. Mục đích ra đời

Chẳng hạn bạn tạo ra một game FPS open world người chơi sẽ di chuyển quanh bản đồ và bắn nhau. Thêm vào rất nhiều hiệu ứng kỹ xảo, cháy nổ, ánh sáng. Số lượng lớn đạn, tên lửa và mảnh bom từ các vụ nổ sẽ trải dài khắp thế giới trong game và mang lại trải nghiệm thú vị cho người chơi.

Sau khi hoàn thành game và gửi nó cho bạn bè của bạn để chơi thử. Mặc dù trò chơi đang chạy hoàn hảo trên máy của bạn, nhưng trên các máy khác không thể chơi được lâu. Trò chơi liên tục gặp sự cố sau vài phút chơi. Sau vài giờ tìm hiểu các bản debug log, bạn phát hiện ra rằng trò chơi bị lỗi do không đủ dung lượng RAM. Hóa ra là thiết bị khác kém hơn nhiều so với máy tính của bạn và đó là lý do tại sao vấn đề lại xuất hiện rất nhanh trên các máy khác.

Chẳng hạn như một viên đạn, một tên lửa hoặc một mảnh đạn được thể hiện bằng một đối tượng riêng biệt chứa nhiều dữ liệu. Tại một số thời điểm, khi rất nhiều đối tượng xảy ra trên màn hình của người chơi lên đến đỉnh điểm, các đối tượng mới được tạo ra không còn đủ với bộ nhớ RAM còn lại, do đó chương trình bị lỗi.

![](https://images.viblo.asia/d344bd63-97a9-4f6f-a172-3e7b7f562ae6.png)

Dễ đoán ra được, lý do là vì mỗi class Particle chứa quá nhiều thông tin: vị trí, tọa độ, vector, tốc độ, màu sắc, sprite. Trong khi đó, có những loại thông tin luôn thay đổi theo từng unit và những loại thông tin thường giống nhau giữa các loại unit. Nếu không biết về flyweight pattern, một người sẽ đành bó tay chịu đựng, và dự định sẽ nâng system requirement của ứng dụng - quả là một nước đi không khôn ngoan.

Khi kiểm tra kỹ hơn Class Particle, bạn có thể nhận thấy rằng các biến color và sprite tiêu tốn nhiều bộ nhớ hơn các trường khác. Điều tồi tệ hơn là hai biến này lưu trữ dữ liệu gần như giống hệt nhau trên tất cả các particle. Ví dụ, tất cả các viên đạn có cùng màu và sprite.

Như tọa độ, vectơ chuyển động và tốc độ, là những biến duy nhất của mỗi particle. Giá trị của các biến này thay đổi theo thời gian. Dữ liệu này đại diện cho context luôn thay đổi trong đó có sự xuất hiện của particle đó, trong khi màu sắc và sprite không đổi.

![](https://images.viblo.asia/d1ce8030-622a-4df2-b712-c37fba1d5ef1.png)

Dữ liệu không đổi này của một đối tượng thường được gọi là trạng thái intrinsic. Nó tồn tại bên trong đối tượng; các đối tượng khác chỉ có thể đọc nó, không thay đổi nó. Phần còn lại của trạng thái của đối tượng, thường bị thay đổi “từ bên ngoài” bởi các đối tượng khác, được gọi là trạng thái extrinsic.

![](https://images.viblo.asia/4d9121e8-3e6c-478b-beb9-f1cee8a0f82c.png)

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/flyweight/structure.png)

Các thành phần trong mô hình:

- Mô hình Flyweight chỉ đơn thuần là một sự tối ưu hóa cho hệ thống. Trước khi áp dụng nó, hãy đảm bảo rằng chương trình có vấn đề tiêu thụ RAM liên quan đến việc có một số lượng lớn các đối tượng tương tự trong bộ nhớ cùng một lúc.
- Class Flyweight chứa phần trạng thái ban đầu của đối tượng có thể được chia sẻ giữa nhiều đối tượng. Cùng một đối tượng flyweight có thể được sử dụng trong nhiều context khác nhau. Trạng thái được lưu trữ bên trong một flyweight được gọi là “intrinsic”. Trạng thái được truyền cho các phương thức của flyweight được gọi là “extrinsic”.
- Class Context chứa trạng thái extrinsic. Khi một context được ghép nối với một trong các đối tượng flyweight, nó đại diện cho trạng thái đầy đủ của đối tượng ban đầu.
- Thông thường, hành vi của đối tượng ban đầu vẫn thuộc lớp Flyweight.Trường hợp này, bất cứ khi nào gọi một phương thức của flyweight cũng phải chuyển các giá trị thích hợp của extrinsic state vào các tham số của phương thức. Mặt khác, hành vi có thể được chuyển sang lớp Context, lớp này sẽ sử dụng flyweight được liên kết đơn thuần như một đối tượng dữ liệu
- Client ( Các class sử dụng Flyweight ) tính toán hoặc lưu trữ trạng thái extrinsic của Flyweights. Từ góc độ client, Flyweight là một đối tượng mẫu có thể được cấu hình trong thời gian chạy bằng cách chuyển một số dữ liệu theo ngữ cảnh vào các tham số của các phương thức của nó.
- Flyweight Factory quản lý một nhóm các flyweight hiện có. Các client sẽ không tạo ra flyweights trực tiếp. Thay vào đó, họ gọi factory, chuyển cho nó intrinsic state mong muốn của flyweight. factory xem xét các flyweight được tạo trước đó và trả về một cái hiện có phù hợp với tiêu chí tìm kiếm hoặc tạo một cái mới nếu không tìm thấy gì.

![](https://images.viblo.asia/46340148-6cba-446c-aa60-fecdb9105eec.png)

Trong ví dụ này, Flyweight Pattern giúp giảm mức sử dụng bộ nhớ khi cần hiển thị hàng triệu đối tượng dạng cây trên canvas.

Lúc này, mỗi Tree object chỉ còn trường vị trí và trường type, bao gồm các TreeType object. Từ đó, những cây có type giống nhau sẽ cùng sử dụng chung object TreeType giúp giải quyết vấn đề về bộ nhớ. Ngoài ra, ứng dụng còn có thêm TreeFactory để dễ dàng quản lý các TreeType.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Giảm số lương đối tượng được tạo ra bằng cách chia sẻ đối tượng. Vì vậy tiết kiệm bộ nhớ và các thiết bị lưu trữ cần thiết
- Cải thiện khả năng cache dữ liệu vì thời gian đáp ứng nhanh
- Tăng Performance cho hệ thống

**Nhược điểm**

- Đánh đổi về mặt sử dụng CPU khi các flyweight object bị truy cập nhiều lần.
- Code trở nên phức tạp hơn nhiều. Các thành viên mới trong team sẽ luôn thắc mắc tại sao trạng thái của một thực thể lại được tách ra theo cách như vậy. Độ dễ hiểu (understandability) thấp

## 5. Khi nào thì sử dụng

Flyweight được sử dụng khi:

- Khi có một số lớn các đối tượng được ứng dụng tạo ra một cách lặp đi lặp lại.
- Khi việc tạo ra đối tượng đòi hỏi nhiều bộ nhớ và thời gian
- Khi muốn tái sử dụng đối tượng đã tồn tại thay vì phải tối thời gian để tạo mới
- Khi nhóm đối tượng chứa nhiều đối tượng tương tự và hai đối tượng trong nhóm không khác nhau nhiều

## 6. Ví dụ minh họa

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Composite: Các node lá trong design pattern Composite, nếu có “thuộc tính chung” có thể được cài đặt theo Flyweight Pattern
- Facade: Flyweight đưa ra cách xử lý đối với số lượng lớn các object nhỏ, trong khi Facade đưa ra cách xử lý đối với tạo ra một object duy nhất biểu diễn cho một hệ thống con.
- Singleton: Flyweight sẽ giống với Singleton nếu bằng cách nào đó giảm được tất cả các trạng thái được chia sẻ của các đối tượng xuống chỉ còn một đối tượng flyweight. Nhưng có hai điểm khác biệt cơ bản giữa các mẫu này:
  - Chỉ nên có một cá thể Singleton, trong khi một lớp Flyweight có thể có nhiều cá thể với các trạng thái nội tại khác nhau.
  - Đối tượng Singleton có thể thay đổi được. Đối tượng Flyweight là bất biến.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
