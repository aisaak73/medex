const getDB = require('../mongodb');
const ObjectId = require('mongodb').ObjectId;
let db = null;

class Expedientes{

    collection = null;

    constructor(){
        getDB()
        .then((database)=>{
            db = database;
            this.collection = db.collection('Expedientes');

            if(process.env.MIGRATE === 'true'){
                //Por si se ocupa
            }
        })
        .catch((err)=>{
            console.error(err)
        });
    }//constructor

    async new (identidad, fecha, descripcion, observacion, registro, ultimaActualizacion ){
        const newExpediente = {
            identidad,
            fecha,
            descripcion,
            observacion,
            registro,
            ultimaActualizacion 
        };

        const rslt = await this.collection.insertOne(newExpediente);
        return rslt;
    } //INSERT

    async getAll(){
        const cursor = this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    } //GET all

    async getByID(id){
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    } //GET BY ID

    async updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimaActualizacion){
        const filter = {_id: new ObjectId(id)};
        const updateCmd = {
            '$set':{
            identidad,
            fecha,
            descripcion,
            observacion,
            registro,
            ultimaActualizacion
            }
        };
        const rslt = await this.collection.updateOne(filter,updateCmd);
        return rslt;
    }// UPDATE

    async deleteOne(id){

    } //DELETE




}//CLASS

module.exports = Expedientes;

