import UserDao from "../dao/user.dao.js";

class UserRepository {
  async createUser(userData) {
    const newUser = new UserDao(userData)
    return await newUser.save();
  }

  async getUserById(id) {
    return await UserDao.findById(id);
  }

  async getUserByEmail(email) {
    return await UserDao.findOne({ email });
  }
}

export default new UserRepository();

