const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { saveVote } = require('../controller/socket');

io.on('connection', client => {
    console.log('usuario conectado');
    
    const [ valido, uid ] = validateJWT(client.handshake.headers['x-token']);

    if(!valido){
        return client.disconnect();
    }    
    
    client.on('vote', async (payload)=>{
        await saveVote( payload );
        io.emit('vote', payload);
    });

    client.on('disconnect', ()=>{
        console.log('usuario desconectado');
    });
});
