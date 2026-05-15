const express = require('express');
const path = require('path');
const db = require('./src/database/database');
const { error } = require('console');
const app = express();

/* ARCHIVOS PUBLICOS */
app.use(express.static('public'));

/* LEER FORMULARIOS */
app.use(express.urlencoded({ extended: true }));
/* PAGINA PRINCIPAL */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/AllUsers', (req, res) => {
    /* TABLA */
    db.query('SELECT * FROM solicitudes', (err, results) => {
        if(err) {
            console.error(err);
            
            return res.statusCode(500).json({
                error: 'Error en la consulta'
            });
        }

        res.json(results);
    });
});

/* FORMULARIO */

app.post('/solicitud', (req, res) => {

    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const documento = req.body.documento;
    const certificado = req.body.certificado;

    console.log('===== NUEVA SOLICITUD =====');

    console.log('Nombre:', nombre);

    console.log('Correo:', correo);

    console.log('Documento:', documento);

    console.log('Certificado:', certificado);

    console.log('===========================');

    res.send(`
        <html>
        <head>

            <title>Solicitud enviada</title>

            <style>

                body{

                    background:#020617;
                    color:white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    font-family:Arial;

                }

                .card{

                    background:#111827;
                    padding:40px;
                    border-radius:20px;
                    width:500px;
                    text-align:center;

                }

                h1{

                    color:#00ffcc;

                }

            </style>

        </head>

        <body>

            <div class="card">

                <h1>✅ Solicitud enviada</h1>

                <p>Tu solicitud fue registrada correctamente.</p>

            </div>

        </body>

        </html>
    `);
});

/* SERVIDOR */
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});