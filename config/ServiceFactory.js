import CustomerService from './../services/CustomerService'
import Customer from './../models/Customer'

class ServiceFactory {
    
    /**
     * @param {Customer} model
     */
    static createCustomerService(model) {
        let customerService = new CustomerService(new Customer().getInstance())
        return customerService
    }
}

export default ServiceFactory