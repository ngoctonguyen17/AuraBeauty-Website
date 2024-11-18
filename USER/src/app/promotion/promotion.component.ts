import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  endDate: Date; // Ngày kết thúc khuyến mãi
  remainingTime: string = ''; // Thời gian còn lại cho khuyến mãi
  vouchers: Array<{ 
    code: string; 
    discount: string; 
    description: string; 
    expirationDate: string;
    isSaved: boolean; // Thuộc tính để theo dõi trạng thái lưu
  }> = [
    { code: 'PROMO20', discount: '20% OFF', description: 'Giảm 20% cho tất cả sản phẩm', expirationDate: '2024-11-15', isSaved: false },
    { code: 'FREESHIP', discount: 'Miễn phí giao hàng', description: 'Miễn phí vận chuyển cho đơn từ 100k', expirationDate: '2024-11-18', isSaved: false },
    { code: 'SAVE10', discount: 'Giảm 10%', description: 'Giảm 10% cho đơn hàng đầu tiên', expirationDate: '2024-11-20', isSaved: false },
    { code: 'BOGO', discount: 'Mua 1 tặng 1', description: 'Mua 1 sản phẩm bất kỳ, tặng 1 sản phẩm cùng loại', expirationDate: '2024-11-25', isSaved: false },
    { code: 'BLACKFRIDAY', discount: '30% OFF', description: 'Giảm 30% cho tất cả sản phẩm trong dịp Black Friday', expirationDate: '2024-11-29', isSaved: false },
    { code: 'SUMMER2024', discount: '15% OFF', description: 'Giảm 15% cho đơn hàng mùa hè', expirationDate: '2024-12-15', isSaved: false },
    { code: 'WELCOME5', discount: '5% OFF', description: 'Giảm 5% cho lần mua hàng đầu tiên', expirationDate: '2024-12-31', isSaved: false },
    { code: 'HOLIDAYGIFT', discount: '25% OFF', description: 'Giảm 25% cho tất cả sản phẩm trong mùa lễ hội', expirationDate: '2024-12-24', isSaved: false },
    { code: 'STUDENT10', discount: '10% OFF', description: 'Giảm 10% cho sinh viên với thẻ sinh viên', expirationDate: '2024-11-30', isSaved: false }
  ];
  products: Array<{ 
    image: string; 
  }> = [
    { image: '../../assets/images/Promotion/product1.png'},
    { image: '../../assets/images/Promotion/product2.png'},
    { image: '../../assets/images/Promotion/product3.png'},
    { image: '../../assets/images/Promotion/product4.png'}
  ];
  
  constructor() {
    this.endDate = new Date('2024-11-20T00:00:00'); 
  }

  ngOnInit(): void {
    this.calculateRemainingTime(); 
    setInterval(() => {
      this.calculateRemainingTime(); 
    }, 1000);
  }

  calculateRemainingTime(): void {
    const now = new Date().getTime(); // Lấy thời gian hiện tại
    const distance = this.endDate.getTime() - now; // Tính khoảng cách giữa ngày kết thúc và hiện tại

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.remainingTime = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`; // Cập nhật thời gian còn lại
  }
  saveVoucher(voucherCode: string): void {
    const voucher = this.vouchers.find(v => v.code === voucherCode);
    if (voucher) {
      voucher.isSaved = true; // Cập nhật trạng thái lưu của voucher
    }
  }
}
