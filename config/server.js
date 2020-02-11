import express from 'express'
import NDIMiddleware from 'node-dependency-injection-express-middleware'
import path from 'path'
import customersRouter from '../routes/customers'

require('dotenv').config()

const app = express()
app.use(express.json())

//Dependency Injection config
const srcDir = path.join(__dirname);
const options = {serviceFilePath: './config/dependency-injection-config.yml', defaultDir: srcDir + '/../'}
app.use(new NDIMiddleware(options).middleware())

//Add routes
app.use('/customers', customersRouter)

export default app