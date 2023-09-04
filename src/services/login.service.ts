import { ILogin, IPasswordUpdate } from './../interfaces/login.interface';
import User from '../models/user.model';
import Seller from '../models/seller.model';
import Cart from '../models/cart.model';

export class LoginService {
  async login(data: ILogin) {
    if(data.userType==='customer'){
      const user = await User.findOne({email:data.email}).exec();
      if(!user){
        throw{message: "User not found"};
      }
      // password encyption + decryption
      if(user.password === data.password){
        const cart = await Cart.findOne({ customerId: user._id });
        if (!cart) {
          // Cart doesn't exist, create a new one
          const newCart = new Cart({
            customerId: user._id,
            items: []
          });
        
          await newCart.save();
        }
        return {Login : "Succesful" , UserData : user};
      } else{
        return {Login : "UnSuccesful" , Comment : 'Password Not Match'};
      }
    }
    else if(data.userType==='seller'){
      const seller = await Seller.findOne({email:data.email}).exec();
      if(seller.password === data.password){
        return {Login : "Succesful" , UserData : seller};
      } else{
        return {Login : "UnSuccesful" , Comment : 'Password Not Match'};
      }
    } 
    else if(data.userType==='superAdmin'){
      
    }
  }
  async passwordUpdate(data: IPasswordUpdate) {
    const user = await User.findOne({_id:data.userId}).exec();
    if(user.password === data.old_password){
      user.password = data.new_password;
      const updatedUser =  await User.updateOne(user._id,user);
      return {Update : "Succesful" , UserData : updatedUser};
    } else{
      return {Update : "UnSuccesful" , Comment : 'Old Password Not Matched'};
    }
  }
}