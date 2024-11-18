// src/app/models/user.ts
export class Users {
  constructor(
    public _id: any = null,
    public fullName: string = "",
    public email: string = "",
    public password: string = "",
    public contact: string = "", // Add contact property
    public admin: boolean = false, // Default to false if not specified
    public createdAt: Date = new Date(), // Creation date
    public updatedAt: Date | null = null // Update date (nullable)
  ) {}
}
