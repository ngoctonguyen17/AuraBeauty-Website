export class Orders{
    constructor(
        public paymentInfo: {
            _id: any,
            Customer_Name: string,
            Deliver_Address: string,
            Phone_Number: string,
            Email: string ,
            Address: string,
            Payment_Method: string,
            Shipping_Method: number,
            currentPrice: number ,
        },


      public cartInfo: {
        items: [{
            _id: any,
            Name: string,
            Artist: string,
            UnitPrice: string,
            category: string,
            Image: string,
            amount: Int32Array,
            Promotion: string,
        }]
       
       
        Price: string,
        Image: string,
        Description: string,
        Ingredients: string,
        Uses: string,
        Directions: string,
        Store: string,
        Warnings: string,
        Brand: string,
        Manufacturer: string,
        Category: string,
        SubCategory: string,
        quantity: string,
      }[]= []
    ){}
  }
 



