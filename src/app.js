import express from 'express';
import { createServer} from 'http';
import exphbs from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/config.js';
import jwt from 'jsonwebtoken';
import { authorizeRol } from './middleware/authorization.js';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import './database.js';
import ProductRepository from './repositories/product.repository.js';
import CartRepository from './repositories/cart.repository.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./outOpffPath/views.router.js";
import userRouter from "./routes/user.router.js";

dotenv.config();
//connectDB();

const app = express();
const PORT = process.env.PORT || 3000; 
 
const httpServer = createServer(app)
 const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'));
app.use(cookieParser());
app.use(passport.initialize());
//initializePassport();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/admin", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", userRouter);
app.use("/", viewsRouter);

app.get('/admin', passport.authenticate('jwt', { session: false }), authorizeRol('admin'), (req, res) => {
  res.redirect('/api/products/admin');
});

app.get('/', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect('/products');
    } catch (error) {
      return res.redirect('/login');
    }
  }
  return res.redirect('/login');
});

app.get('/login', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect('/products');
    } catch (error) {
      res.clearCookie('token');
    }
  }
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect('/products');
    } catch (error) {
      res.clearCookie('token');
    }
  }
  res.render('register', { title: 'Register' });
});

app.get('/products', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), async (req, res) => {
  const { limit = 10, page = 1, sort, query, cartId } = req.query;

  const products = await ProductRepository.getProducts({ limit, page, sort, query });
  const prevLink = products.hasPrevPage 
    ? Handlebars.helpers.buildUrl(limit, products.prevPage, sort, query, cartId) 
    : null;
  const nextLink = products.hasNextPage 
    ? Handlebars.helpers.buildUrl(limit, products.nextPage, sort, query, cartId) 
    : null;

  res.render('products', {
    title: 'Products',
    products: products.docs,
    totalPages: products.totalPages,
    prevPage: products.hasPrevPage,
    nextPage: products.hasNextPage,
    page: products.page,
    prevLink,
    nextLink,
    cartId,
    user: req.user
  });
});

app.get('/logout', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/carts', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), async (req, res) => {
  try {
    const cart = await CartRepository.getCartById(req.user.cart);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.render('cart', {
      title: 'Your Cart',
      products: cart.products,
      cartId: req.user.cart,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
  httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });




  