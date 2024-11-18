import { Component, ElementRef, OnInit, inject} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../cart.service';
import { Cart } from '../models/cart';
import { ProductAPIService } from '../product-api.service';
import { Product } from '../models/Product';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { PaymentInfo, discountInfo } from '../models/Payment';
import { PaymentService } from '../payment.service';
import { Subscription } from 'rxjs';


interface DateSelection {
  month: string;
  year: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  public dateSelection: DateSelection = { month: '', year: '' };
  public months: { value: string; label: string }[] = [];
  public years: string[] = [];



  showCODInfo: boolean = false;
  showBankingInfo: boolean = false;
  errMessage: any;
  router: any;
  displayedDiscountPercent: any;

  toggleCODInfo(): void {
    this.showCODInfo = true;
    this.showBankingInfo = false;
  }

  toggleBankingInfo(): void {
    this.showBankingInfo = true;
    this.showCODInfo = false;
  }



  initPayment(): void {

    const PM = document.getElementById('PM') as HTMLButtonElement;
    const PaymentInfo = document.getElementById('PaymentInfo') as HTMLFormElement;
    const CustomerInfo = document.getElementById('CustomerInfo') as HTMLFormElement;

    PM.addEventListener('click', () => {
      if (PaymentInfo.classList.contains('hidden')) {
        PaymentInfo.classList.remove('hidden');
        CustomerInfo.classList.add('hidden');
      } else {
        PaymentInfo.classList.add('hidden');
        CustomerInfo.classList.remove('hidden');
      }
    });
    }

  private populateMonths(): void {
    for (let i = 1; i <= 12; i++) {
      const month = {
        value: i.toString().padStart(2, '0'),
        label: new Date(0, i - 1).toLocaleString('default', { month: 'short' })
      };
      this.months.push(month);
    }
  }

  private populateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const endYear = 2300;

    for (let i = startYear; i <= endYear; i++) {
      this.years.push(i.toString());
    }
  }

  public handleDateChange(): void {
    console.log(this.dateSelection);
  }
  paymentinfo = new PaymentInfo();
  paymentinfos:any;
  discountInfo : any;
  discountinfo = new discountInfo()
  products: any;
    constructor(private _service:  ProductAPIService, private titleService: Title,  private cartservice:CartService, private paymentservice:PaymentService) {
    this.titleService.setTitle("Payment - Rhythmix");
    this._service.getProdcut().subscribe((data: Product[]) => {
      this.products = data;
      this.populateMonths();
      this.populateYears();
    });

    this.paymentservice.getPayment().subscribe({
      next:(data)=>{this.paymentinfos=data},
      error:(err)=>{this.errMessage=err}
      });

      this.paymentservice.getDiscount().subscribe({
        next:(data)=>{this.paymentinfos=data},
        error:(err)=>{this.errMessage=err}
        });
      // this.paymentservice.getDiscount().subscribe(data => {
      //     this.discountPercent = data[1]?.discount_percent;
      //   });

  }

  tinhcurrent() {
    let cr: number = 0;
    this.items.forEach(item => {
      const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ''), 10);
      const promotion = parseFloat(item.Promotion.replace('%', '').trim()) / 100;
      cr = unitPrice - unitPrice * promotion;
    });

    const formattedCurrentPrice = cr.toLocaleString();
    return formattedCurrentPrice + ' VND';
  }

  public setDiscount(f: discountInfo) {
    this.discountinfo = f;
  }

putDiscount() {
    this.paymentservice.putDiscount(this.discountInfo).subscribe({
      next: (data: any) => {
        this.discountInfo=data
      },
      error: (err: any) => {
        this.errMessage=err
      }
    });
  }


  public setPayment(f: PaymentInfo) {
    this.paymentinfo = f;
  }

  postPayment() {

    this.paymentservice.postPayment(this.paymentinfo).subscribe({
    next: (data) => {
    let _id: number = data._id; // Sử dụng id trả về từ dịch vụ thanh toán

        // Lấy giá trị 'body' từ đối tượng 'data'
        let paymentBody = data['body'];

        // Lưu paymentBody vào localStorage hoặc thực hiện các xử lý khác
        // ...

        // Lấy thông tin giỏ hàng từ cartservice
        let cartItems = this.cartservice.getitems();

        // Tạo đối tượng JSON hai cấp
        let jsonData = {
          paymentInfo: paymentBody,
          cartInfo: {
            items: cartItems
          }
        };

        // Lưu jsonData vào localStorage hoặc thực hiện các xử lý khác

        // Gọi phương thức saveCartInfo để lưu thông tin giỏ hàng
        let currentPrice = this.calculateTotalWithDiscount();
        if (currentPrice !== null) {
          jsonData.paymentInfo.currentPrice = parseFloat(currentPrice.replace(/[^\d.]/g, ''));
        } else {
          jsonData.paymentInfo.currentPrice = null;
        }


        this.cartservice.saveCartInfo(_id, jsonData).subscribe((response) => {
          console.log('Cart info saved:', response);
        });
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    }


  items = this.cartservice.getitems();


getFormattedTotalPrice(item: any): string {
  const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ''), 10);
  const promotion = item.Promotion ? parseFloat(item.Promotion.replace('%', '').trim()) / 100 : 0;  const CurrentPrice = unitPrice - unitPrice * promotion;
  const totalPrice = item.amount * CurrentPrice;

  return totalPrice.toLocaleString('fr') + ' VND';
}

discount_code: string = '';
  discountInfos: discountInfo[] = [];
  selectedDiscountCode: string | undefined;
  discountPercent: number | null = null;

  inputDiscount() {
    // Loại bỏ khoảng trắng từ giá trị discount_code
    const trimmedDiscountCode = this.discount_code.trim();

    if (!trimmedDiscountCode) {
      return; // Ngăn chặn việc thực thi khi discount_code rỗng
    }

    this.paymentservice.getDiscountA(trimmedDiscountCode).subscribe({
      next: (data: discountInfo[]) => {
        this.discountInfos = data;
        // Assuming the discount_code is unique and available in the response
        this.selectedDiscountCode = data[0]?.discount_code;
        this.getDiscountPercent();
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      }
    });
  }
  calculateTotalWithDiscount(): string {
    const total: number = parseInt(this.tongtien().replace(/\D/g, ""), 10);
    const discountPercent: number = this.discountPercent || 0; // Chỉ định kiểu dữ liệu của biến discountPercent là number
    const discountAmount: number = total * (discountPercent / 100); // Chỉ định kiểu dữ liệu của biến discountAmount là number
    const totalWithDiscount: number = total - discountAmount; // Chỉ định kiểu dữ liệu của biến totalWithDiscount là number
    const formattedTotal: string = totalWithDiscount.toLocaleString("fr", { useGrouping: true });
    const formattedTotalWithCurrency: string = formattedTotal + " VND";

    return formattedTotalWithCurrency;

  }

  getDiscountPercent() {
    this.paymentservice.getDiscount().subscribe((data: any[]) => {
      const selectedDiscount = data.find((item: any) => item.discount_code === this.selectedDiscountCode);
      this.discountPercent = selectedDiscount ? selectedDiscount.discount_percent : null;
    });
  }
tongtien() {
  const tt = this.items.reduce((total, item) => {
    const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ""), 10);
    const totalPrice = item.amount * unitPrice;
    return total + totalPrice;
  }, 0);

  const formattedTotal = tt.toLocaleString('fr', { useGrouping: true });
  return formattedTotal + ' VND';
}

increaseQuantity(item: Cart): void {
  item.amount++;
}

decreaseQuantity(item: Cart): void {
  if (item.amount > 1) {
    item.amount--;
  }
}
fb = inject(FormBuilder);

CustomerInfoForm !: FormGroup;
PaymentInfoForm !: FormGroup;
discountcodeForm !: FormGroup;


  ngOnInit() {
    this.CustomerInfoForm  = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      DeliverAddress: ['', Validators.required],
      CustomerName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
    });
    this.PaymentInfoForm  = this.fb.group({
      ShippingMethod: ['', Validators.required],

    });
    this.discountcodeForm = this.fb.group(
      {
        DiscountInput: ['', Validators.required],
      }
    )
    this.initPayment();
}
isCheckboxChecked: boolean = false;
isRadioSelected: boolean = false;

radioChange(event: any, paymentinfo: PaymentInfo): void {
  const COD = document.getElementById('COD') as HTMLInputElement;
  const Banking = document.getElementById('Banking') as HTMLInputElement;
  this.isRadioSelected = false;

  if (event.target === COD) {
    paymentinfo.Payment_Method = event.target.value;
    this.isRadioSelected = true;
  } else if (event.target === Banking) {
    paymentinfo.Payment_Method = Banking.value;
    this.isRadioSelected = true;
  }
}
checkChange(event: any, paymentinfo: PaymentInfo): void {
const check = document.getElementById('Delivery') as HTMLInputElement;
this.isCheckboxChecked = true;

if (check.checked) {
paymentinfo.Shipping_Method = event.target.value;
} else {
paymentinfo.Shipping_Method = '';
}
}

isFormValid(): boolean {
return this.isCheckboxChecked && this.isRadioSelected;
}
CustomerForm(){
  console.log(this.CustomerInfoForm.value)
}
}

function getDiscountPercent(): any {
  throw new Error('Function not implemented.');
}

