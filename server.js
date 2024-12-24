import express from 'express'
import 'dotenv/config'
import { dbConnection } from './databases/config/dbConnection.js'
import morgan from 'morgan'
import { init } from './src/modules/index.routes.js'
import helmet from 'helmet'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(express.static('uploads'))
app.use(morgan('dev'))
init(app)

app.get('/', (req, res) => res.send('Hello World!'))

dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))