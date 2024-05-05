const mongoose = require('mongoose')
const dotenv =require('dotenv')
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log(err.stack);
    process.exit(1);
});
dotenv.config({ path: './config.env' });
const app =require('./app')
const DB =process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
//console.log(DB)
mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con=>{
    console.log('DB Connection Successful')
})



const port = process.env.PORT ;
//console.log(app.get('env'))
//console.log(process.env.NODE_ENV)
const server =app.listen(port,()=>{
    console.log(`app running on port ${port}...`)

    //=> this callback will call as soon as server start listening
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
