
class BaseService {
    constructor(model) {
        this.model = model
        this.getAll = this.getAll.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
    }

    async getAll(query) {
        let { page, limit } = query

        limit = limit ? Number(limit) : null
        let skip = page && limit? (Number(page) - 1)*limit : 0
        
        try {
            let items
            if(limit) {
                items = await this.model
                .find()
                .skip(skip)
                .limit(limit);
            }else {
                items = await this.model
                .find()
                .skip(skip);
            }

            let total = await this.model.countDocuments()
  
            return {
            error: false,
            statusCode: 200,
            data: items,
            total
            }
        } catch (errors) {
            console.log(errors)
            return {
            error: true,
            statusCode: 500,
            errors
            }
        }
    }
    
    async get(params) {
        let {id} = params

        try{
            let item = await this.model
            .findById(id)

            if(item == null){
                return {
                    error: true,
                    statusCode: 500,
                    message:  "Not found",
                    }
            }
            return {
                error: false,
                statusCode: 200,
                data: item
                }
        }catch (error){
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to find",
                errors: error.errors
            };
        }
    }
  
    async insert(data) {
        try {
            let item = await this.model.create(data);
            if (item)
            return {
                error: false,
                item
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
                message: error.errmsg || "Not able to create",
                errors: error.errors
            };
        }
    }
  
    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, { new: true });
            return {
                error: false,
                statusCode: 202,
                item
            };
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                error
            };
        }
    }
}
  
export default BaseService