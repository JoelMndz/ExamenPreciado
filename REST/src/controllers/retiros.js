const RetirosModel = require('../models/retiros');

class RetirosController{

  async getAll(req, res){
   try {
      const data = await RetirosModel.find();
      res.json({data});
    } catch (error) {
      res.json({error})
    }
  } 

  async create(req, res){
    try {
      //Validacion no mayor a 500
      const {monto} = req.body;
      if(monto > 500){
        req.body.tipoError = 'Error, el monto maximo son $500';
      }
      const data = await RetirosModel.create(req.body);
      res.json({data});
    } catch (error) {
      res.json({error})
    }
  }

  async movimientosConError(req, res){
    try {
      const data = await RetirosModel.find({tipoError:{
        $ne: null
      }});
      res.json({data});
    } catch (error) {
      res.json({error})
    }
  }
}

module.exports = new RetirosController();