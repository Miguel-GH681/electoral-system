const express = require('express');
const cors = require('cors');

const sequelize = require('./database/config');
require('dotenv').config();

sequelize.authenticate().then(()=>{

    const app = express();
    app.use(express.json({limit: '10mb'}));
    app.use(cors());

    app.use( '/api/users', require('./routes/auth'));
    app.use( '/api/campaign', require('./routes/campaign'));
    app.use( '/api/candidate', require('./routes/candidate'));

    app.listen( process.env.SERVER_PORT, ( err ) => {
        if ( err ) throw new Error(err);

        console.log('Servidor corriendo en puerto', process.env.SERVER_PORT );
    });
}).catch((err)=>{
    console.error('Unable to connect to the database:', err);
});