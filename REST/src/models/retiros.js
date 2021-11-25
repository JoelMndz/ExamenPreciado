const mongoose = require("mongoose");
const {Schema} = mongoose;

const retirosSchema = new Schema({
    numeroCuenta: String,
    Sucursal: String,
    fecha: String,
    hora: String,
    monto: Number,
    comision: Schema.Types.Decimal128,
    tipoError: {
        type: String,
        default: null
    }
});

 module.exports = mongoose.model('Retiros',retirosSchema);