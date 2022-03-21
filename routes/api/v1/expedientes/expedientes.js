const express = require('express');
const router = express.Router();

const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res)=>{
    res.status(200).json(
        {
            endpoint: 'Expedientes',
            updates: new Date(2022,0,20,20,30,00)
        }
    );
}); //GET /

router.get('/all', async(req, res)=>{
    try{
        const rows = await expedienteModel.getAll();
        res.status(200).json({status: 'ok', expedientes:rows})
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
}); //GET ALL

router.get('/byid', async(req, res)=>{
    try{
        const {id} = req.params;
        const row = await expedienteModel.getAll();
        res.status(200).json({status: 'ok', expediente:row});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});

    }
}); //GET BY ID

router.post('/new', async(req, res)=>{
    const {identidad, fecha, descripcion, observacion, registro, ultimaActualizacion} = req.body;
    try{
        const rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registro, ultimaActualizacion);
        res.status(200).json({
            status:'ok',
            result: rslt
        });
    }catch(ex){
        console.log(ex);
        res.status(500).json({
            status:'failed',
            result: {}
        });
    }

}); //POST /new

router.put('/update/:id', async(req, res)=>{
    try{
        const {identidad, fecha, descripcion, observacion, registro, ultimaActualizacion} = req.body;
        const {id} = req.params;
        const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimaActualizacion);
        res.status(200).json({status:'ok', result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
}); //UPDATE

router.delete('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await expedienteModel.deleteOne(id);
        res.status(200).json({status:'ok'});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
}); //DELETE 


module.exports = router;