import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
    required: true,
  },

  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const UsuarioModel = mongoose.model("users", usuarioSchema);

export default UsuarioModel;
