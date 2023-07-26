import { Request, Response } from "express";
import {
  UserSignUpValidator,
  UserRetrieveValidator,
  UserLoginValidator,
} from "../validators/UserValidators";
import {InvalidFieldsError} from '../exceptions/Base'
import UserService from '../services/UserService'

class UserController{
  static async signUp(req: Request, res: Response, next: Function) {
    try{
      const {error, value} = UserSignUpValidator.validate(req.body)
      if(error)
        throw new InvalidFieldsError(error)
      let new_user = await UserService.create_new_user(value)
      res.send({user: UserRetrieveValidator.validate(new_user).value});
    }
    catch(e){
      console.log(e)
      return next(e)
    }
  }
  static async logIn(req: Request, res: Response, next: Function) {
    try{
      const { error, value } = UserLoginValidator.validate(req.body);
      if(error)
        throw new InvalidFieldsError(error)
      let found_user = await UserService.validate_credentials(value)
      res.send({user: UserRetrieveValidator.validate(found_user).value});
    }
    catch(e){
      console.log(e)
      return next(e)
    }
  }
}

export default UserController

