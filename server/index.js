const express = require("express");
const app = express();
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')

const AuthRoute = require('./routes/auth')

app.set('port' , process.env.PORT || 5000)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/api' , cors(), AuthRoute)
app.use(cors())

if (process.env.NODE_ENV !== 'test'){
    const server = http.createServer(app);
    server.listen(app.get('port'),() => {
        console.log('Server is running at port %s', app.get('port'));
    });
}
