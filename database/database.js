const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/certinova.db', (err) => {

    if(err){
        console.log(err.message);
    } else {
        console.log('Base de datos conectada 🚀');
    }

});

/* TABLA */

db.run(`

CREATE TABLE IF NOT EXISTS solicitudes (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nombre TEXT,
    correo TEXT,
    documento TEXT,
    certificado TEXT

)

`);

module.exports = db;