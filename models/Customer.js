const mongoose = require('mongoose')

class Customer {

    initSchema(){
        const customerSchema = new mongoose.Schema({
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type:String,
                required:true
            },
            phoneNumber: {
                type:String,
                required:true
            }
        })

        mongoose.model('Customers', customerSchema)
    }

    getInstance() {
        this.initSchema()
        return mongoose.model('Customers')
    }
}

export default Customer