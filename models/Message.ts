
import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
})

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

export default Message
