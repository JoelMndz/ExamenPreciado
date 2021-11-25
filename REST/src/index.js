const mongoose = require("mongoose");
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const app = express();
 
//Variables de entorno
const {MONGO_URL, PORT} = require('./config');


//PORT
app.set('port', PORT);


app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Conexion DB
mongoose.connect(MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});

//Routes
app.use('/api',require('./routes/retiros'));

//Arrancar el servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
