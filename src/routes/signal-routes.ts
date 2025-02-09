import { Router } from 'express'
import { SignalController } from '../controllers/signal-controller'
import { SignalModel } from '../models/signal-model'

export function createSignalsRoutes (signalModel: SignalModel): Router {
  const signalController = new SignalController(signalModel)
  const signalRoutes = Router()

  signalRoutes.get('/', signalController.getSignals)
  signalRoutes.get('/search', signalController.searchSignal)
  signalRoutes.get('/:id', signalController.findSignById)

  return signalRoutes
}
