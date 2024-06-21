class AccountService {
  getAccount(accountId: string) {
    console.log(`Getting account with id ${accountId}`);
  }
}

class EmailService {
  sendEmail(email: string) {
    console.log(
      `Sending email to ${email} with content: "Welcome to our website"`
    );
  }
}

class PaymentService {
  paymentByPaypal() {
    console.log("Payment by Paypal");
  }
  paymentByCreditCard() {
    console.log("Payment by Credit Card");
  }
  paymentByEbanking() {
    console.log("Payment by E-banking");
  }
  paymentByCash() {
    console.log("Payment by Cash");
  }
}

class ShippingService {
  freeShipping() {
    console.log("Free shipping");
  }
  standardShipping() {
    console.log("Standard shipping");
  }
  expressShipping() {
    console.log("Express shipping");
  }
}

class SmsService {
  sendSMS(phone: string) {
    console.log(
      `Sending SMS to ${phone} with content: "Your order is on the way"`
    );
  }
}

class ShopFacade {
  private static instance: ShopFacade;

  private accountService: AccountService;
  private emailService: EmailService;
  private paymentService: PaymentService;
  private shippingService: ShippingService;
  private smsService: SmsService;

  private constructor() {
    this.accountService = new AccountService();
    this.emailService = new EmailService();
    this.paymentService = new PaymentService();
    this.shippingService = new ShippingService();
    this.smsService = new SmsService();
  }

  static getInstance() {
    if (!ShopFacade.instance) {
      ShopFacade.instance = new ShopFacade();
    }
    return ShopFacade.instance;
  }

  buyProductByCashƯithFreeShipping(
    accountId: string,
    email: string,
    phone: string
  ) {
    this.accountService.getAccount(accountId);
    this.emailService.sendEmail(email);
    this.paymentService.paymentByCash();
    this.shippingService.freeShipping();
    this.smsService.sendSMS(phone);
  }

  buyProductByCreditCardWithStandardShipping(
    accountId: string,
    email: string,
    phone: string
  ) {
    this.accountService.getAccount(accountId);
    this.emailService.sendEmail(email);
    this.paymentService.paymentByCreditCard();
    this.shippingService.standardShipping();
    this.smsService.sendSMS(phone);
  }
}

const shopFacade = ShopFacade.getInstance();

shopFacade.buyProductByCashƯithFreeShipping(
  "my_account_id",
  "my_email",
  "my_phone"
);
shopFacade.buyProductByCreditCardWithStandardShipping(
  "my_account_id",
  "my_email",
  "my_phone"
);
