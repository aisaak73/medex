const express = require('express');
const router = express.Router();

const Pacientes = new require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Pacientes();

router.get('/', (req, res) =>{
    res.status(200).json(
        {
            endpoint: 'Pacientes',
            updates: new Date(2022,0,19,18,41,00)
        }
    );
}); //GET /

router.get('/all', async(req, res)=>{
    try{
        const rows = await pacienteModel.getAll();
        res.status(200).json({status:'ok', pacientes:rows})
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});

    }
}); //GET ALL/



router.get('/byid/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const row = await pacienteModel.getByID(id);
        res.status(200).json({status:'ok', paciente:row});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
}); //GET BY ID

//FACET SEARCH
const allowedItems = [10,15,20];
//
router.get('/facet/:page/:items', async (req, res)=>{
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10); 
    if(allowedItems.includes(items)){
        try{
            const pacientes = await pacienteModel.getFaceted(page, items);
            res.status(200).json({status:'ok', docs:pacientes});
        }catch(ex){
            console.log(ex);
            res.status(500).json({status:'failed'});
        }

    }else{
        res.status(403).json({status:'error', msg:'Bad Request'});
    }
}); //FACET SEARCH


router.get('/byname/:name/:page/:items', async (req, res)=>{
    const name = req.params.name;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10); 
    if(allowedItems.includes(items)){
        try{
            const pacientes = await pacienteModel.getFaceted(page, items, {nombres : name});
            res.status(200).json({status:'ok', docs:pacientes});
        }catch(ex){
            console.log(ex);
            res.status(500).json({status:'failed'});
        }

    }else{
        res.status(403).json({status:'error', msg:'Bad Request'});
    }
}); //BY NAME


router.post('/new', async (req, res) =>{
    const { nombres, apellidos, identidad, email, telefono } = req.body;

    try{
        rslt = await pacienteModel.new(nombres, apellidos, identidad, email, telefono);
        res.status(200).json(
            {
                status:'ok',
                result: rslt
            }
        );
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
        const {nombres, apellidos, identidad, email, telefono} =req.body;
        const {id} = req.params;
        const result = await pacienteModel.updateOne(id, nombres, apellidos, identidad, email, telefono)
        res.status(200).json({status:'ok', result});
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }

}); //UPDATE 

router.put('/addtag/:id', async(req, res)=>{
    try{
        const {tag} = req.body;
        const {id} = req.params;
        const result = await pacienteModel.updateAddTag(id, tag);
        res.status(200).json({status:'ok', result});
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }

}); //UPDATE ADD TAG


router.put('/addtagset/:id', async(req, res)=>{
    try{
        const {tag} = req.body;
        const {id} = req.params;
        const result = await pacienteModel.updateAddTagSet(id, tag);
        res.status(200).json({status:'ok', result});
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }

}); //UPDATE ADD TAG SET

router.delete('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await pacienteModel.deleteOne(id);
        res.status(200).json({status:'ok'});
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }

}); //DELETE ONE

module.exports = router;