import { Request, Response, NextFunction } from 'express'
import { SignalModel } from '../models/signal-model'
import { Signal } from '../types'

export class SignalController {
  signalModel: SignalModel

  constructor (signalModel: SignalModel) {
    this.signalModel = signalModel
  }

  findSignById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id)

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' })
        return
      }

      const signal: Signal | null = this.signalModel.findSignalById(id)

      if (signal === null) {
        res.status(404).send('Not found.')
        return
      }

      res.status(200).json(signal)
    } catch (error) {
      next(error)
    }
  }

  getSignals = (_: Request, res: Response, next: NextFunction) => {
    try {
      const signals: Signal[] = this.signalModel.getSignals()

      res.status(200).json(signals)
    } catch (error) {
      next(error)
    }
  }

  searchSignal = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const query: string | undefined = req.query.q as string

      if (!query) {
        res.status(400).json({ error: "Query parameter 'q' is required" })
        return
      }

      const signals: Signal[] | Error = this.signalModel.searchSignal(query)

      if (signals instanceof Error) {
        res.status(500).json({ error: signals.message })
        return
      }

      if (signals.length === 0) {
        res.status(404).send('Not found.')
        return
      }

      res.status(200).json(signals)
    } catch (error) {
      next(error)
    }
  }
}
