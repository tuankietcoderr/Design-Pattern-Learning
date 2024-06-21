# Builder Pattern

> Bài viết được sao chép từ [Builder Design Pattern - Trợ thủ đắc lực của Developers](https://viblo.asia/p/builder-design-pattern-tro-thu-dac-luc-cua-developers-bWrZnowwlxw), tác giả: Hoàng Đinh

## 1. Giới thiệu

- Builder là một mẫu thiết kế thuộc nhóm Creational Pattern – những mẫu thiết kế cho việc khởi tạo đối tượng của lớp
- Builder Pattern là một mẫu thiết kế được dùng để cung cấp một giải pháp linh hoạt cho các vấn đề tạo đối tượng (object) khác nhau trong lập trình hướng đối tượng.
- Cho phép bạn xây dựng các đối tượng phức tạp bằng cách sử dụng các đối tượng đơn giản và sử dụng tiếp cận từng bước. Builder Pattern còn cho phép bạn tạo ra các kiểu thể hiện khác nhau của một đối tượng bằng cách sử dụng cùng một constructor code.

## 2. Mục đích ra đời

Hãy tưởng tượng một đối tượng phức tạp đòi hỏi nhiều công sức, khởi tạo từng bước của nhiều trường và các đối tượng lồng nhau. Code khởi tạo như vậy thường được chôn bên trong một hàm constructor khổng lồ với rất nhiều tham số. Hoặc thậm chí tệ hơn: nằm rải rác trên toàn bộ client code.

Ví dụ: hãy nghĩ về cách tạo object House. Để xây dựng một ngôi nhà đơn giản, bạn cần xây dựng bốn bức tường và nền nhà, lắp cửa ra vào, lắp một cặp cửa sổ và xây dựng một mái nhà. Nhưng nếu bạn muốn một ngôi nhà lớn hơn, sáng sủa hơn, có sân sau và các tiện ích khác (như hệ thống sưởi, hệ thống ống nước và hệ thống dây điện)?

Giải pháp đơn giản nhất là mở rộng lớp House và tạo một tập hợp các lớp con để bao gồm tất cả các tổ hợp của các tham số. Nhưng cuối cùng bạn sẽ có một số lượng đáng kể các lớp con. Bất kỳ thông số mới nào, chẳng hạn như kiểu hiên nhà, sẽ yêu cầu phát triển hệ thống phân cấp này nhiều hơn nữa.

![](https://images.viblo.asia/cc3ffee7-6db7-4dfc-b6f3-b82ec6241df5.png)

Có một cách tiếp cận khác không liên quan đến việc lai tạo các lớp con. Bạn có thể tạo một phương thức constructor khổng lồ ngay trong lớp House với tất cả các tham số có thể điều khiển object house. Mặc dù cách tiếp cận này thực sự loại bỏ sự cần thiết của các lớp con, nhưng nó lại tạo ra một vấn đề khác.

![](https://images.viblo.asia/e8911942-ef10-4353-a1a3-d54c48596425.png)

Trong hầu hết các trường hợp, hầu hết các tham số sẽ không được sử dụng, làm cho các lần gọi constructor khá rắc rối. Ví dụ, chỉ một phần nhỏ các ngôi nhà có bể bơi, vì vậy các thông số liên quan đến bể bơi sẽ vô dụng với các trường hợp khác.

Vì vậy Builder Pattern gợi ý rằng bạn trích xuất object construction code ra khỏi lớp của chính nó và di chuyển nó đến các object riêng biệt được gọi là Builder.

![](https://images.viblo.asia/5a5f13cb-7e4a-4473-9b2e-b52fdef982c4.png)

Pattern sắp xếp việc xây dựng object thành một tập hợp các bước (buildWalls, buildDoor, v.v.). Để tạo một object, bạn thực hiện một loạt các bước này trên một builder object. Phần quan trọng là bạn không cần phải gọi tất cả các bước. Bạn chỉ có thể gọi những bước cần thiết để tạo ra một cấu hình cụ thể của một object.

Một số bước construction có thể yêu cầu thực hiện khác nhau khi bạn cần xây dựng các thể hiện đại diện khác nhau của sản phẩm (build various representations of the product). Ví dụ, các bức tường của một cabin có thể được xây dựng bằng gỗ, nhưng các bức tường của lâu đài phải được xây dựng bằng đá.

Trong trường hợp này, bạn có thể tạo một số class builder khác nhau triển khai cùng một tập hợp các bước xây dựng, nhưng theo một cách khác. Sau đó, bạn có thể sử dụng các builder này trong quá trình xây dựng (tức là một tập hợp các lệnh gọi có thứ tự đến các bước xây dựng) để tạo ra các loại object khác nhau.

![](https://images.viblo.asia/a8d8ad0f-4317-476b-a407-21501f1b7e97.png)

Ví dụ, hãy tưởng tượng một người thợ xây dựng mọi thứ từ gỗ và kính, người thứ hai xây dựng mọi thứ bằng đá và sắt và người thứ ba sử dụng vàng và kim cương.

Bằng cách gọi cùng một nhóm các bước, bạn sẽ có được một ngôi nhà bình thường từ người xây dựng đầu tiên, một lâu đài nhỏ từ người thứ hai và một cung điện từ người thứ ba.

Tuy nhiên, điều này sẽ chỉ hoạt động nếu client code gọi các bước xây dựng có thể tương tác với các builder bằng giao diện chung.

Bạn có thể đi xa hơn và trích xuất một loạt lệnh gọi đến các bước của builder mà bạn sử dụng để xây dựng một sản phẩm thành một lớp riêng biệt có tên là director.

Lớp Director xác định thứ tự thực hiện các bước xây dựng, trong khi trình xây dựng cung cấp việc triển khai cho các bước đó.

![](https://images.viblo.asia/31bfc28b-7658-44c0-93d2-3a24e63a1c57.png)

Việc có một lớp director trong chương trình của bạn là không hoàn toàn cần thiết. Bạn luôn có thể gọi các bước xây dựng theo thứ tự cụ thể trực tiếp từ client code. Tuy nhiên, lớp director có thể là một nơi tốt để đưa các quy trình xây dựng khác nhau để bạn có thể sử dụng lại chúng trong chương trình của mình.

Ngoài ra, lớp director hoàn toàn ẩn các product construction với client code. Client chỉ cần liên kết builder với director, khởi chạy construction với director và nhận kết quả từ builder.

## 3. Kiến trúc

![](https://refactoring.guru/images/patterns/diagrams/builder/structure.png?id=fe9e23559923ea0657aa5fe75efef333)

Các thành phần trong mô hình:

- Builder: Giao diện Builder khai báo các bước product construction chung cho tất cả các loại builder. Abstract interface để tạo nên các đối tượng sản phẩm ( object product )
- Concrete Builder: cung cấp các cách triển khai khác nhau của các bước construction cho Builder. Các concrete builder có thể tạo ra các product không tuân theo giao diện chung.
- ConcreBuilder: là một object có thể xây dựng nên các object khác. Xây dựng và lắp ráp các phần để xây dựng object.
- Products: là các đối tượng kết quả. Các product do các builder khác nhau tạo ra không nhất thiết phải thuộc cùng một hệ thống phân cấp hoặc giao diện lớp.
- Director: Lớp Director xác định thứ tự gọi các bước construction, vì vậy bạn có thể tạo và sử dụng lại các cấu hình cụ thể của product.
- Client: Client phải liên kết một trong các đối tượng trình tạo với director. Thông thường, nó chỉ được thực hiện một lần, thông qua các tham số của hàm tạo của director. Sau đó, director sử dụng builder object đó cho tất cả các construction tiếp theo.

Tuy nhiên, có một cách tiếp cận thay thế khi client chuyển builder object sang production method của director. Trong trường hợp này, bạn có thể sử dụng một builder khác mỗi khi bạn sản xuất nội dung nào đó với director.

![](https://images.viblo.asia/8b617d3e-2cd3-4f77-9f65-6af1a290fb17.png)

Ví dụ: Class Director không trực tiếp tạo vào lắp ráp thành product là Car và Manual. Thay vào đó class Director chí đến Builder Interface để tạo nên các bộ phận của một complex object, làm cho Director độc lập với các lớp cụ thể nào được khởi tạo (biểu diễn nào được tạo ra).

Lớp CarBuilder triển khai giao diện Builder bằng cách tạo và lắp ráp các đối tượng Car và tương tự lớp CarManualBuilder triển khai giao diện Builder bằng ac1ch tạo và lắp ráp các đối tượng Manual.

## 4. Ưu & nhược điểm

**Ưu điểm**

- Có thể xây dựng các đối tượng theo từng bước, trì hoãn các bước xây dựng hoặc chạy các bước một cách đệ quy
- Có thể sử dụng lại cùng một Construction Code khi xây dựng các thể hiện khác nhau của sản phẩm.
- Nguyên tắc Trách nhiệm Đơn lẻ. Có thể tách biệt Construction Code phức tạp khỏi Business Logic Layer của sản phẩm.
- Cho phép bạn thay đổi các thể hiện khác nhau của từng sản phẩm.
- Tính đóng gói code cho construction.
- Cung cấp khả năng kiểm soát các bước của quy trình construction.

**Nhược điểm**

- Độ phức tạp tổng thể của mã tăng lên vì bạn cần xây dựng nhiều class mới.
- Mỗi ConcreteBuilder riêng biệt phải được tạo cho từng loại sản phẩm.
- Các lớp Builder phải có thể thay đổi được

## 5. Khi nào thì sử dụng

Builder được sử dụng khi:

- Sử dụng mẫu Builder để tránh sử dụng “telescopic constructor” ( Gọi là telescopic constructor là vì khi một class có nhiều constructor với nhiều parameter trong constructor sẽ gây khó khăn cho người lập trình để nhớ và sử dụng cái nào cho đúng ). Builder Pattern cho phép bạn xây dựng các object từng bước, chỉ sử dụng những bước bạn thực sự cần. Sau khi triển khai pattern, bạn không phải nhồi nhét hàng tá tham số vào các constructor của mình nữa.
- Sử dụng Builder Pattern khi bạn muốn code của mình có thể tạo các cách thể hiện khác nhau của một số sản phẩm (ví dụ: nhà bằng đá và bằng gỗ). Builder Pattern có thể được áp dụng khi việc xây dựng các bản trình bày khác nhau của sản phẩm bao gồm các bước tương tự chỉ khác nhau về chi tiết.
- Sử dụng Builder để tạo cây Composite hoặc các đối tượng phức tạp khác. Builder Pattern cho phép bạn tạo sản phẩm theo từng bước. Bạn có thể trì hoãn việc thực hiện một số bước mà không làm hỏng sản phẩm cuối cùng. Bạn thậm chí có thể gọi đệ quy các bước, điều này rất hữu ích khi bạn cần xây dựng một cây đối tượng. Một Builder không để lộ sản phẩm chưa hoàn thành khi đang chạy các bước xây dựng. Điều này ngăn không cho client code tìm nạp kết quả không đầy đủ.

## 6. Ví dụ minh họa

```ts
interface IFoodBuilder {
  reset(): IFoodBuilder;
  buildName(name: string): IFoodBuilder;
  buildDescription(description: string): IFoodBuilder;
  buildPrice(price: number): IFoodBuilder;
  buildImage(image: string): IFoodBuilder;
  build(): Food;
}

class Food {
  private name: string;
  private description: string;
  private price: number;
  private image: string;

  public setName(name: string) {
    this.name = name;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getPrice() {
    return this.price;
  }

  public getImage() {
    return this.image;
  }

  toString() {
    return `Name: ${this.name}, Description: ${this.description}, Price: ${this.price}, Image: ${this.image}`;
  }
}

class ConcreteFoodBuilder implements IFoodBuilder {
  private food: Food;

  constructor() {
    this.food = new Food();
  }

  public reset(): IFoodBuilder {
    this.food = new Food();
    return this;
  }

  public buildName(name: string): IFoodBuilder {
    this.food.setName(name);
    return this;
  }

  public buildDescription(description: string): IFoodBuilder {
    this.food.setDescription(description);
    return this;
  }

  public buildPrice(price: number): IFoodBuilder {
    this.food.setPrice(price);
    return this;
  }

  public buildImage(image: string): IFoodBuilder {
    this.food.setImage(image);
    return this;
  }

  public build(): Food {
    return this.food;
  }
}

class FoodDirector {
  private builder: IFoodBuilder;

  constructor(builder: IFoodBuilder) {
    this.builder = builder;
  }

  public makePizza(): Food {
    return this.builder
      .reset()
      .buildName("Pizza")
      .buildDescription("Delicious pizza")
      .buildPrice(10)
      .buildImage("pizza.jpg")
      .build();
  }
}

const builder = new ConcreteFoodBuilder();
const director = new FoodDirector(builder);

const pizza = director.makePizza();
console.log(pizza.toString());
```

Xem file [example.ts](./example.ts)

## 7. Design Pattern liên quan

- Composite: Cung cấp một cách để thể hiện một hệ thống phân cấp một phần toàn bộ nhưng một cấu trùng đối tượng cây (composite)
- Iterator: Cung cấp một cách để duyệt qua các phần tử của một cấu trúc đối tượng.
- Visitor: Cung cấp một cách để xác định các hoạt động mới cho các phần tử của một cấu trúc đối tượng.
- Interpreter: đại diện cho một câu bằng một ngôn ngữ đơn giản như một cấu trúc đối tượng dạng cây (composite) (cây cú pháp trừu tượng).

## Tài liệu tham khảo

[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern
