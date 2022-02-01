//const { Database } = require('sqlite3');
const getDB = require('../db');
let db = null;

class Pacientes{

    constructor(){
        getDB()
        .then((database)=>{
            db = database;
            if (process.env.MIGRATE === 'true'){
                const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';

                db.run(createStatement);
            }

        })
        .catch((err)=>{ console.error(err)});
    }//constructor

    new(nombres, apellidos, identidad, email, telefono){
        return new Promise((accept, reject)=>{
            db.run(
                'INSERT INTO pacientes(identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
                [identidad, nombres, apellidos, email, telefono],
                (err, rslt)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);                   
                }
            );
        });
    } //INSERT

    getAll(){
        return new Promise ((accept, reject)=>{
            db.all('SELECT * FROM pacientes;', (err, rows)=>{
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(rows);
                }
            });
        });
    } //GET all

    getByID(id){
        return new Promise((accept, reject)=>{
            db.get(
                'SELECT * FROM pacientes WHERE id=?;',
                [id],
                (err, row)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        accept(row);
                    }
                }
            )
        })
    } //GET BY ID

    updateOne(id, nombres, apellidos, identidad, telefono, correo){
        return new Promise(
            (accept, reject)=>{
                const sqlUpdate = 'UPDATE pacientes SET nombre=?, apellidos=?, telefono=?, identidad=?, email=?, WHERE id = ?;';
                db.run(
                    sqlUpdate,
                    [nombres, apellidos, telefono, identidad, email, id],
                    function (err){
                        if(err){
                            reject(err);
                        }else{
                            accept(this);
                        }
                    }
                );
            }
        );
    }// UPDATE

    deleteOne(id){
        return new Promise(
            (accept, reject)=>{
                const sqlDelete = 'DELETE pacientes WHERE id = ?;';
                db.run(
                    sqlDelete,
                    [id],
                    function (err){
                        if(err){
                            reject(err);
                        }else{
                            accept(this);
                        }
                    }
                );
            }
        );
    }// DELETE





}//CLASS

module.exports = Pacientes; 