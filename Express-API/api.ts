import express,{Express} from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'


configDotenv()
const api : Express = express()

api.use(cors())
console.log(process.env.PORT)
api.listen(process.env.PORT,()=> {
     console.log("it's working")    
})
api.use(errorHandler)
api.use(express.json())
api.use(cookieParser())