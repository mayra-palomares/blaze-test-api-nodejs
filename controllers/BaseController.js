import {validationResult}  from 'express-validator'

class BaseController {

    constructor(service) {
      this.service = service
      this.getAll = this.getAll.bind(this)
      this.get = this.get.bind(this)
      this.insert = this.insert.bind(this)
      this.update = this.update.bind(this)
    }
  
    async getAll(req, res) {
        return res.status(200).send(await this.service.getAll(req.query))
    }
  
    async get(req, res) {
        const response = await this.service.get(req.params)
        return res.status(response.statusCode).send(response)
    }
  
    async insert(req, res) {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).send({message: errors.array()})
        }

        let response = await this.service.insert(req.body)
        if (response.error) return res.status(response.statusCode).send(response)
        return res.status(201).send(response)
    }
  
    async update(req, res) {
        const { id } = req.params;
  
        let response = await this.service.update(id, req.body)
  
        return res.status(response.statusCode).send(response)
    }
    
}
  
export default BaseController