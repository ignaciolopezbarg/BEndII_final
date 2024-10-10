import UserDTO from "../dto/user.dto.js";
import UsuarioModel from "../models/usuarios.model.js";

class UserDao {

async findUserByEmail(email) {
  return await UsuarioModel.findOne ({ email }).lean();
}

async create(userData){
  try {
    const user = new UsuarioModel(userData);
    return await user.save();
  } catch (error) {
    console.error('Error al crear usuario en la bd',error)
    throw new Error(error);
  } 
}
async getUserByEmail( email, includePassword = false){
  const user = await UsuarioModel.findUserByEmail(email);
  if(!user) return null;
  return includePassword ? user : new UserDTO(user);
}
  async findById(id) {
    return await UsuarioModel.findById(id).lean().populate('cart');
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

