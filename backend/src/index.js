import express from 'express'
import cors from 'cors'
import routes from './routes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api', routes)

export function setupServer () {
  app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`)
  })
}

setupServer()
