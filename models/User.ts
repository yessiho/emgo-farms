// models/User.ts
import { ObjectId } from "mongodb"

export type User = {
  _id: ObjectId
  name: string
  email: string
  password: string
}

// Example user
export const adminUser: User = {
  _id: new ObjectId(),
  name: "Peter",
  email: "admin@emgo.com",
  password: "hashed_password",
}