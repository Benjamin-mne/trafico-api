import localdb from '../db/localdb.json'
import { Signal } from '../types'
import { SignalModel } from './signal-model'

export class TrafficSignalLocal extends SignalModel {
  searchSignal (query: string): Signal[] {
    const foundedSigns: Signal[] = localdb
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

    return foundedSigns.length > 0 ? foundedSigns : []
  }

  findSignalById (id: number): Signal | null {
    const foundedSign: Signal | undefined = localdb.find((s) => s.id === id)

    return foundedSign || null
  }

  getSignals(): Signal[] {

    if(!localdb){
      return []
    }

    return localdb;
  }
}
