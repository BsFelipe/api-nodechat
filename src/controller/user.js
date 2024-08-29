import userService from '../service/user';

class UserController {
  async create(req, res, next) {
    try {
      const body = req.body;

      const result = await userService.createUser(body);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await userService.loginUser(email, password);

      return res.status(201).json({ token });
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();
