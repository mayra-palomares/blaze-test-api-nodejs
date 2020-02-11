import BaseService from './BaseService'
import Customer from './../models/Customer'
import faker from 'faker'

class CustomerService extends BaseService {
    
     /**
     * @param {Customer} model
     */
    constructor(model) {
        super(model)
    }

    async generateCustomers(req, res, next) {
        let numGenerate = 0
        let success = 0
        let error = 0
    
        if(req.body.numGenerate){
            numGenerate = req.body.numGenerate
        }
        
        for(let i = 0; i < numGenerate; i++) {
            const customer = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.phoneNumber()
            }
        
            try {
                const newCustomer = await this.model.create(customer)
                success++
            } catch (err) {
                console.log(err)
                error++
            }
        }
        
        res.json({"sucess": success, "error": error})
    }
}

export default CustomerService