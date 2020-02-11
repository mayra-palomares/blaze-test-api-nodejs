import express from 'express'
import NDIMiddleware from 'node-dependency-injection-express-middleware'
import path from 'path'
import customersRouter from '../routes/customers'

require('dotenv').config()

const app = express()
app.use(express.json())

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain)

//Dependency Injection config
const srcDir = path.join(__dirname);
const options = {serviceFilePath: './config/dependency-injection-config.yml', defaultDir: srcDir + '/../'}
app.use(new NDIMiddleware(options).middleware())

//Add routes
app.use('/customers', customersRouter)

export default app