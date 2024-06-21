# Iterator Pattern

> Bài viết được sao chép từ [Iterator Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/iterator-design-pattern-tro-thu-dac-luc-cua-developers-jvElaNwY5kw), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Iterator hay còn gọi là Cursor là một mẫu thiết kế thuộc nhóm hành vi (Behavioral Pattern).
- Iterator được thiết kế cho phép xử lý nhiều loại tập hợp khác nhau bằng cách truy cập những phần tử của tập hợp với cùng một phương pháp, cùng một cách thức định sẵn, mà không cần phải hiểu rõ về những chi tiết bên trong của những tập hợp này.
- Nói cách khác, một Iterator được thiết kế cho phép xử lý nhiều loại tập hợp khác nhau bằng cách truy cập những phần tử của tập hợp với cùng một phương pháp, cùng một cách thức định sẵn, mà không cần phải hiểu rõ về những chi tiết bên trong của những tập hợp này.
- Ý tưởng thiết kế này là một trong những kỹ thuật được gọi là “đơn trách nhiệm – Single responsibility principle (SRP)” – một lớp chỉ có duy nhất một công việc để làm. Hãy suy nghĩ rằng tập hợp duy trì các phần tử, một iterator cung cấp cách thức làm việc với các phần tử đó. Đó cũng là lý do tại sao những Iterator có thể làm việc được trong các tập hợp khác nhau.

## 2. Mục đích ra đời

Tập hợp (collection) là một trong những kiểu dữ liệu được sử dụng nhiều nhất trong việc ghép chương trình. Hầu hết các collection lưu trữ các phần tử của chúng từ đơn giản như trong các danh sách đơn cho đến phức tạp như ngăn xếp, cây, đồ thị và các cấu trúc dữ liệu phức tạp khác.

Nhưng cho dù collection được cấu trúc như thế nào, nó phải cung cấp một số cách truy cập các phần tử của nó để chúng ta có thể sử dụng. Cần có một cách để đi qua từng phần của collection và không bị lặp lại các phần tử đã đi qua.

![](https://images.viblo.asia/77f0ed59-aa51-41be-8e41-83f868e6d216.png)

Điều này nghe có vẻ như là một công việc dễ dàng nếu bạn có một collection dựa trên trên một danh sách. Bạn chỉ cần lặp lại tất cả các phần tử. Nhưng làm thế nào để bạn tuần tự đi qua các phần tử của một cấu trúc dữ liệu phức tạp, với nhiều cách khác nhau.

![](https://images.viblo.asia/afad413c-cc70-41ef-a63f-a2d3fa9c887c.png)

Hiện nay chúng ta có rất nhiều thuật toán áp dụng cho collection, dần dần làm trách nhiệm chính của bản thân collection dần lu mờ đi, đó là hiệu quả lưu trữ dữ liệu. Ngoài ra, một số thuật toán có thể được điều chỉnh cho một ứng dụng cụ thể, vì vậy việc gộp chung vào một lớp collection chung chung sẽ rất kỳ lạ.

Mặt khác, source code của chúng ta phải hoạt động với những collection khác nhau thậm chí có thể không quan tâm đến cách chúng lưu trữ của chúng. Tuy nhiên, vì tất cả các collection đều cung cấp các cách khác nhau để truy cập các phần tử của chúng, bạn không có lựa chọn nào khác hơn là sử dụng những collection cụ thể vào những tình huống cụ thể

Vậy có cách nào để có 1 interface chung, cho phép chúng ta duyệt qua các phần tử mà không cần biết về kiểu của tập hợp không? Iterator pattern chính là câu trả lời trong tình huống này!

Ý tưởng chính của mẫu Iterator là trích xuất đường truyền hành vi của một collection thành một đối tượng riêng biệt được gọi là iterator. Ngoài việc triển khai chính thuật toán, một trình lặp đối tượng đóng gói tất cả các chi tiết truyền tải, chẳng hạn như vị trí hiện tại và bao nhiêu phần tử còn lại cho đến khi kết thúc.

![](https://images.viblo.asia/22c831bb-a317-4282-8f81-2f95d033c6fd.png)

Tất cả các iterator phải triển khai cùng một giao diện. Điều này làm cho source code tương thích với bất kỳ loại tập hợp nào hoặc bất kỳ thuật toán so sánh nào miễn là có một iterator thích hợp. Nếu bạn cần một cách đặc biệt để duyệt qua collection, bạn chỉ cần tạo một iterator, mà không cần phải thay đổi collection hoặc source code.

Một ví dụ thực tế, bạn có kế hoạch đến thăm Rome trong một vài ngày và thăm tất cả các danh lam thắng cảnh ở đây. Nhưng khi ở đó, bạn có thể lãng phí rất nhiều thời gian đi bộ lòng vòng, không thể tìm thấy những danh lam thắng cảnh đó.

Mặt khác, bạn có thể cài google maps sử dụng nó để điều hướng. Đó là cách đi lại thông minh và dễ hiểu, và bạn có thể ở tại một số địa điểm thú vị như miễn là bạn muốn. Một giải pháp thay thế khác là bạn có thể chi tiêu một số ngân sách của chuyến đi và thuê một hướng dẫn viên địa phương biết thành phố như lòng bàn tay. Hướng dẫn sẽ có thể điều chỉnh chuyến tham quan theo sở thích của bạn, cho bạn thấy mọi điểm thu hút và kể một rất nhiều câu chuyện thú vị. Nghe thì thú vị nhưng chi phí bỏ ra cũng không hề nhỏ.

![](https://images.viblo.asia/dea588b5-3ddb-4d44-97d8-5e28c37624a4.png)

Tất cả các tùy chọn này — các hướng ngẫu nhiên sinh ra trong đầu bạn, google maps hoặc người hướng dẫn con người — hoạt động như vòng lặp trên bộ sưu tập rộng lớn các điểm tham quan và điểm tham quan nằm ở Ở Rome.

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/iterator/structure.png?id=35ea851f8f6bbe51d79eb91e6e6519d0)

Các thành phần trong mô hình:

- Iterator : là một interface hay abstract class, khai báo các hoạt động cần thiết để tra so sánh một tập hợp: tìm nạp phần tử tiếp theo, truy xuất vị trí hiện tại, bắt đầu lại lặp lại, v.v.
- Concrete Iterator : implement các phương thức của Iterator, giữ index khi duyệt qua các phần tử. Cho phép một số trình vòng lặp đi qua cùng một bộ sưu tập độc lập với nhau.
- Collection Interface: khai báo một hoặc nhiều phương thức để nhận được các Iterator tương thích với collection. Lưu ý rằng kiểu trả về của các phương thức phải được khai báo dưới dạng Iterator Interface để các collection cụ thể có thể trả về các các loại Iterator.
- Concrete Collections: trả về các phiên bản mới của một lớp Concrete Iterator cụ thể mỗi khi client yêu cầu.
- Client : đối tượng sử dụng Iterator Pattern, nó yêu cầu một iterator từ một đối tượng collection để duyệt qua các phần tử mà nó giữ. Các phương thức của iterator được sử dụng để truy xuất các phần tử từ collection theo một trình tự thích hợp.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Đảm bảo nguyên tắc Single responsibility principle (SRP): chúng ta có thể tách phần cài đặt các phương thức của tập hợp và phần duyệt qua các phần tử (iterator) theo từng class riêng lẻ.
- Đảm bảo nguyên tắc Open/Closed Principle (OCP): chúng ta có thể implement các loại collection mới và iterator mới, sau đó chuyển chúng vào code hiện có mà không vi phạm bất cứ nguyên tắc gì.
- Chúng ta có thể truy cập song song trên cùng một tập hợp vì mỗi đối tượng iterator có chứa trạng thái riêng của nó.
- Trong một vài trường hợp, bạn có thể trì hoãn một lần lặp lại và tiếp tục nó khi cần thiết.

**Nhược điểm**:

- Sử dụng iterator có thể kém hiệu quả hơn so với việc duyệt qua các phần tử của bộ sưu tập một cách trực tiếp.
- Có thể không cần thiết nếu ứng dụng chỉ hoạt động với các collection đơn giản.

## 5. Khi nào thì sử dụng

Dưới đây chúng ta có thể liệt kê một số trường hợp mà khi gặp sẽ phải cân nhắc sử dụng Iterator pattern:

- Cần truy cập nội dung của đối tượng trong tập hợp mà không cần biết nội dung cài đặt bên trong nó: Sử dụng mẫu Iterator khi collection của bạn có một cấu trúc dữ phức tạp, nhưng bạn muốn ẩn tính phức tạp chung của nó với các máy khách (để thuận tiện hoặc bảo mật). => Trình lặp đóng gói các chi tiết làm việc với cấu trúc dữ liệu phức tạp, cung cấp cho client một số phương pháp mô phỏng để truy cập các phần tử của collection.
- Sử dụng mẫu để giảm sự trùng lặp của source code: code của các thuật toán lặp thường rất phức tạp và có xu hướng cồng kềnh. =>Khi được đặt trong logic kinh doanh của một ứng dụng, nó có thể làm lu mờ vai trò của source code gốc và làm cho nó khó bảo trì hơn. Với việc di chuyển source code đó đến các Iterator được chỉ định có thể giúp code của mình gọn gàng và sạch sẽ hơn.
- Sử dụng Iterator khi bạn muốn có một interface duy nhất để duyệt qua các phần tử của một tập hợp, code của mình có thể follow các cấu trúc dữ liệu khác nhau hoặc khi các loại cấu trúc chuỗi này chưa được biết trước. => Mẫu cung cấp một vài Interface chung cho cả hai collection và iterator. Giúp code của bạn bây giờ sẽ sử dụng những Interface, và nó sẽ vẫn hoạt động với nhiều collection và iterator khác nhau để triển khai các giao diện này.

## 6. Ví dụ minh họa

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Composite: Iterator thường được sử dụng để duyệt một cấu trúc đệ quy như Composite
- Factory Method: có thể kết hợp với Iterator để cho phép các lớp con của tập hợp trả về các loại trình vòng lặp khác nhau tương thích với nó
- Memento: có thể kết hợp với Iterator để nắm bắt trạng thái lặp lại hiện tại và khôi phục nó khi cần
- Visitor: có thể kết hợp với Iterator để xem qua một cấu trúc dữ liệu phức tạp và thực hiện một số thao tác trên các phần tử của nó.

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
