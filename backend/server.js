const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');


connectDatabase();
app.get('/', (req, res) => {
  res.send('Hello, World!');  // Or send your desired response here
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the  hello port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})


// 
// D:\paddysystem\backend\server.js
