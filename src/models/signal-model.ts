import { Signal } from '../types'

export class SignalModel {
  findSignalById (_id: number): Signal | null {
    return null
  }

  searchSignal (_query: string): Signal[] {
    return []
  }

  getSignals (): Signal[] {
    return []
  }
}
