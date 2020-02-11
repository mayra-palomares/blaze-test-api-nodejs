import BaseController from './BaseController'
import CustomerService from '../services/CustomerService'

class CustomerController extends BaseController{
    
    /**
     * @param {CustomerService} service
     */
    constructor(service){
        super(service)
    }

    /**
     * Generate customer with Faker JS
     *  @param {int} numGenerate - Number of customers to generate
     */ 
    async generateCustomers(req, res, next) {
        return this.service.generateCustomers(req,res,next)
    }
}


export default CustomerController
