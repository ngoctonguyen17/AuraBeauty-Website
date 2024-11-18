export class Blog {
    constructor(
      public _id:any=null,
      public title_big:string="",
      public title_small:string="",
      public date:string="",
      public content:string="",
      public anh1:string="",
      public anh1_note:string="",
      public anh2:string="",
      public anh2_note:string="",
      public writer:string="",
      public source:string="",
      public createdAt: Date = new Date(), // Ngày tạo
      public updatedAt: Date | null = null // Ngày cập nhật (có thể null nếu chưa cập nhật)
      ) {}
    }
