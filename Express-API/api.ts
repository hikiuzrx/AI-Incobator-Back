import express,{Express} from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/Auth'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './utils/swagerConfig'
import userRouter from './routes/User'
import { authMiddleware } from './middlewares/authValidator'
configDotenv()
const api : Express = express()
api.use(cors())
console.log(process.env.PORT)
api.listen(process.env.PORT,()=> {
     console.log("it's working")    
})
const swaggerDocs = swaggerJsdoc(swaggerOptions);

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
api.use(express.urlencoded({ extended: true }));
api.use(express.json())
api.use(cookieParser())
api.use('/user',authMiddleware,userRouter)
api.use('/auth',authRouter)