import express from 'express';
import exphbs from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/config.js'
// import { Server } from 'socket.io';
import dotenv from 'dotenv';
import './database.js';

import productsRouter from './routes/products.router.js';
//import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
 

// const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

// io.on('connection', (socket) => {
//     console.log('New client connected');
    
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
  
//   httpServer.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });



app.listen (PORT, () => console.log( `Server on port ${PORT}`))