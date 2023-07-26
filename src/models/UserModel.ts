import mongoose from "mongoose";
import crypto from 'crypto'

/**
 * Main User Model Schema.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  salt: {
    type: String,
    required:true
  }
});
const userSchemaModel = mongoose.model("User", userSchema);

/**
 * Main Model User Class.
 * Contains wrapper functionality linking mongoDB with User Login.
 */
class User{
  id: string = ""
  username: string = ""
  email: string = ""
  password: string = ""
  salt: string = ""

  constructor(username: string,email: string){
    this.username = username,
    this.email = email
  }

  static async findById(id: string){
    const found = userSchemaModel.findOne({id: id})
  }

  static async findByEmail(email: string){
    const found = await userSchemaModel.findOne({email: email})
    if(found!=undefined){
      let user = new User(found.username, found.email)
      user.password = found.password
      user.salt = found.salt
      user.id = found.id
      return user
    }
    return null
  }

  async setPassword(password: string){
    // Hashes password and overrides it in userdata.
    this.salt = crypto.randomBytes(16).toString('hex');
    let hashed_password: string = await new Promise(resolve => {
        crypto.pbkdf2(password, this.salt, 100000, 64, 'sha256', (err, hashed) =>{
            resolve(hashed.toString('hex'))
        });
    });
    this.password = hashed_password
  }

  async save(){
    if(!this.id){
      const created = await userSchemaModel.create({
        username: this.username,
        email: this.email,
        password: this.password,
        salt: this.salt,
      })
      this.id = created.id
    }
    else{
      let found = await userSchemaModel.findOne({id: this.id})
      if(!found) throw Error()
      found.username = this.username
      found.email = this.email
      return true
    }
  }

}

export default User
