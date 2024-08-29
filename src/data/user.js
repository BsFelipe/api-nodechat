import user from '../model/user'

class UserData {
  async createUser(body) {
    try {
      const result = await user.create(body);
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const result = await user.findOne({ email })
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findByUserName(username) {
    try {
      const result = await user.findOne({ username })
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

export default new UserData();
