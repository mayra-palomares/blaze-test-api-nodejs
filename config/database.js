import mongoose from 'mongoose'

class Connection {
    constructor() {
        const url = process.env.DATABASE_URL
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = mongoose.connection
        db.on('error', (error) => console.error(error))
        db.once('open', () => console.log('connected to database'))
    }
}

export default new Connection
