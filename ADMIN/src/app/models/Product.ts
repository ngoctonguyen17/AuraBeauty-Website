export class Product{
  constructor(
  public _id:any=null,
  public Name:string="",
  public Artist:string="",
  public category:string="",
  public UnitPrice:string="",
  public Image:string="",
  public Image_1:string="",
  public Image_2:string="",
  public Promotion:string="",
  public Status:string="",
  public createdAt: Date = new Date(), // Ngày tạo
  public updatedAt: Date | null = null // Ngày cập nhật (có thể null nếu chưa cập nhật)
  ) {}
}
