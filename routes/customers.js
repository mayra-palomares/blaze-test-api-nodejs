import express from 'express'
//import customerController from '../controllers/CustomerController'
import {check} from 'express-validator'

const router = express.Router()

// Get all customers
router.get('/', (req, res, next) => {
    const container = req.container
    const customerController = container.get('controller.customer')
    return customerController.getAll(req,res,next)
})

/// Get one customer
router.get('/:id',(req, res, next) => {
    const container = req.container
    const customerController = container.get('controller.customer')
    return customerController.get(req, res, next)
})

// Create one customer
router.post('/',[
    check('firstName').exists(),
    check('lastName').exists(),
    check('email').isEmail(),
    check('phoneNumber').exists(),
],(req, res, next) => {
    const container = req.container
    const customerController = container.get('controller.customer')
    return customerController.insert(req, res, next)
})

// Update one customer
router.patch('/:id', (req, res, next) => {
    const container = req.container
    const customerController = container.get('controller.customer')
    return customerController.update(req, res, next)
})

//Generate customers
router.post('/generate', (req, res, next) => {
    const container = req.container
    const customerController = container.get('controller.customer')
    return customerController.generateCustomers(req,res,next)
})

export default router
