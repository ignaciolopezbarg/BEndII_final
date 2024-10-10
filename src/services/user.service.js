import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, role: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token, rol: user.rol };
  }

  async register(userData) {
    const existingUser = await UserRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newCart = await CartRepository.createCart();
    const newUser = await UserRepository.createUser({
      ...userData,
      cart: newCart._id,
    });

    return newUser;
  }

  async getCurrentUser(userId) {
    return await UserRepository.getUserById(userId);
  }
}

export default new UserService();
