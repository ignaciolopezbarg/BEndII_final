import mongoose from 'mongoose';
// import configObject from './config/config.js';
// const{ mongo_url }= configObject;

mongoose.connect('mongodb+srv://nacho:holanacho@cluster0.g6mfb4u.mongodb.net/entregaFinalBE2?retryWrites=true&w=majority&appName=Cluster0')

.then(() => console.log('Conectados a la BD'))
.catch((error) =>console.log('Error al conectarnos :', error))

