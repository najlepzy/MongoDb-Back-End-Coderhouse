import { InvalidCredentialsError } from "../exceptions/Base";
import User from "../models/UserModel";
import crypto from 'crypto'

class UserService{
    static async create_new_user(userdata: any){
        let newUser = new User(userdata['username'], userdata['email'])
        await newUser.setPassword(userdata['password'])
        await newUser.save();
        return newUser
    }

    static async validate_credentials(usercredentials: any){
        // Hashes password and overrides it in userdata.
        // TODO remove as any
        const found_user = await User.findByEmail(usercredentials.email)
        if(!found_user)
            throw new InvalidCredentialsError()
        // Step 1. Hash received password with salt in database to compare hashes.
        let check_password_hash  = await new Promise(resolve => {
            crypto.pbkdf2(usercredentials['password'], found_user.salt, 100000, 64, 'sha256', (err, hashed) =>{
                resolve(hashed.toString('hex'))
            });
        });
        // If hash in database is the same as received hash password.
        if(check_password_hash == found_user.password)
            return found_user // Login.
        throw new InvalidCredentialsError()
    }

    static async generate_password_change_request(email: string){
        const unique_code_for_user = crypto.randomBytes(128).toString('hex');
        // const found_change_request = await PasswordChangeCode.find(secret_code)
    }

    static async change_password_using_forgot_code(secret_code: string, new_password: string){
        // const found_change_request = await PasswordChangeCode.find(secret_code)
        // if(!found_change_request) throw new Error("No existe codigo para cambiar password")
        // let user_to_change_password = await User.findById(found_change_request.user_id)
        // await user_to_change_password.setPassword(new_password)
        // user_to_change_password.save()
        // found_change_request.delete()
    }
}

export default UserService