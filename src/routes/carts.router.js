import express from 'express';
import passport from 'passport';
import { addProductToCart, removeProductFromCart, purchaseCart } from '../controllers/cart.controller.js';
import { authorizeRol } from '../middleware/authorization.js';

const router = express.Router();

router.post('/add-product', passport.authenticate('jwt', { session: false }), authorizeRol('user'), addProductToCart);
router.delete('/remove-product', passport.authenticate('jwt', { session: false }), authorizeRol('user'), removeProductFromCart);
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), authorizeRol('user'), purchaseCart);

export default router;

///////////////////////////////////////////////////////////////////
// import express from "express";
// const router = express.Router();
// import CartManager from "../dao/db/cart-manager-db.js";
// const cartManager = new CartManager();
// import CartModel from "../models/cart.model.js";
// import ProductModel from "../models/product.model.js";
// import UsuarioModel from "../models/usuarios.model.js";
// import TicketModel from "../models/tickets.model.js";
// import calcularTotal  from "../utils/calcularTotal.js";


// //Nuevo carrito

// router.post("/", async (req, res) => {
//   try {
//     const nuevoCarrito = await cartManager.crearCarrito();
//     res.stautus(201).json(nuevoCarrito);
//   } catch (error) {
//     console.error("Error al crear un nuevo carrito", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// //Listado de productos en algun carrito.

// router.get("/:cid", async (req, res) => {
//   const cartId = req.params.cid;

//   try {
//     const carrito = await CartModel.findById(cartId);

//     if (!carrito) {
//       console.log("No existe ese carrito con el id");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }

//     return res.json(carrito.products);
//   } catch (error) {
//     console.error("Error al obtener el carrito", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// // Agregar productos a distintos carritos.

// router.post("/:cid/product/:pid", async (req, res) => {
//   const cartId = req.params.cid;
//   const productId = req.params.pid;
//   const quantity = req.body.quantity || 1;

//   try {
//     const actualizarCarrito = await cartManager.agregarProductoAlCarrito(
//       cartId,
//       productId,
//       quantity
//     );
//     res.json(actualizarCarrito.products);
//   } catch (error) {
//     console.error("Error al agregar producto al carrito", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });
// //Compra

// router.get("/:cid/purchase", async (req, res) => {
//     const carritoId = req.params.cid;
//     try {
//         const carrito = await CartModel.findById(carritoId);
//         const arrayProductos = carrito.products;

//         const productosNoDisponibles = [];

//         for (const item of arrayProductos) {
//             const productId = item.product;
//             const product = await ProductModel.findById(productId);
//             if (product.stock >= item.quantity) {
//                 product.stock -= item.quantity;
//                 await product.save();
//             } else {
//                 productosNoDisponibles.push(productId);
//             }
//         } 

//         const usuarioDelCarrito = await UsuarioModel.findOne({cart: carritoId});

//         const ticket = new TicketModel({
//             purchase_datetime: new Date(), 
//             amount: calcularTotal(carrito.products),
//             purchaser: usuarioDelCarrito.email
//         })

//         await ticket.save(); 

//         carrito.products = carrito.products.filter(item => productosNoDisponibles.some(productoId => productoId.equals(item.product))); 

//         await carrito.save(); 

//         //Testeamos con Postman: 
//         res.json({
//             message: "Compra generada",
//             ticket: {
//                 id: ticket._id,
//                 amount: ticket.amount,
//                 purchaser: ticket.purchaser
//             }, 
//             productosNoDisponibles
//         })

//     } catch (error) {
//         res.status(500).send("error server");
//     }
// })

// export default router;