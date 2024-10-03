import UsuarioModel from "../models/usuarios.model.js";

class UserDao {
async create(userData){
  const user = new UsuarioModel(userData);
  return await user.save();
}
  async findById(id) {
    return await UsuarioModel.findById(id).populate('cart');
  }
  async findOne(query) {
    return await UsuarioModel.findOne(query);
  }
  async save(userData) {
    const user = new UsuarioModel(userData);
    return await user.save();
  }
}
export default new UserDao();
