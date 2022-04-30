import  express  from "express";
import diaryRouter from './routes/diaries'
import sheetRouter from './routes/sheets'
//var cors = require('cors')


const app = express()

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*
app.use(cors({
    
    origin:'*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE',"HEAD","PUT","PATCH"],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
*/
app.use(express.json())

const port = process.env.PORT || 3000
app.get('/ping',(_req, res)=>{
    console.log('ko')
    res.send('pong')
})

app.use('/api/diaries',diaryRouter)
app.use('/api/sheet',sheetRouter)


app.listen(port,()=>{
    console.log(`on port ${port}`)
})