const { MongoClient } = require("mongodb") 
const bcrypt = require("bcryptjs") 
require("dotenv").config({ path: ".env.local" }) 
