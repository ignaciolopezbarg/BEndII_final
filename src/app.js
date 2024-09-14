import express from 'express';
import productosRouter from './routes/productos.router.js';
import './database.js';
const app = express();
const PORT = process.env.PORT || 3000;  
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'));
app.use(cors());

app.use('/productos', productosRouter);

// app.engine('handlebars',engine());
// app.set('view engine', 'handlebars');
// app.set('views', './src/views');

app.listen (PORT, () => console.log( `Server on port ${PORT}`))