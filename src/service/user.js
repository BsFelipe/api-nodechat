import userData from '../data/user';
import CustomError from '../utils/customError';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

class UserService {
  async createUser(body) {
    try {
      if(!body.name || !body.username || !body.email || !body.password) {
        throw new CustomError('invalidBody', 400)
      }
      const [checkEmail, checkUsername] = await Promise.all([
        userData.findByEmail(body.email),
        userData.findByUserName(body.username)
      ])

      if(checkEmail) {
        throw new CustomError('alreadyExist', 400, {param: 'email' })
      }

      if(checkUsername) {
        throw new CustomError('alreadyExist', 400, {param: 'username' })
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);

      const newUser = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: hashPassword
      }
      const result = await userData.createUser(newUser);
      return result;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async loginUser(email, password) {
    try {
      const user = await userData.findUser(email);
      if(!user) {
        throw new CustomError('unauthorized', 401);
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        throw new CustomError('unauthorized', 401);
      }

      const payload = { userId: user._id };

      const token = jwt.sign(payload, process.env.TOKEN_JWT, { expiresIn: process.env.JWT_EXPIRES });

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UserService();
