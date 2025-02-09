import express from 'express'
import { SignalModel } from './models/signal-model'
import { createSignalsRoutes } from './routes/signal-routes'
import { config } from 'dotenv'
import cors from 'cors'


export function createApp (signalModel: SignalModel) {
  const PORT = process.env.PORT ?? 3000
  const app = express()
  config()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(express.static('public'))
  app.use('/signals', createSignalsRoutes(signalModel))

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}
