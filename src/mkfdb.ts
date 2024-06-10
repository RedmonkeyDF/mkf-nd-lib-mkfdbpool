import { MkfDbPoolAdapter } from './mkfdb.adapterbase'

export class MkfDbPool {

    private static _instance: MkfDbPool

    private _adapter: MkfDbPoolAdapter

    private constructor (adapter: MkfDbPoolAdapter) {

        this._adapter = adapter
    }

    get totalclients(): number {

        return this._adapter.totalclients
    }

    get idleclients(): number {

        return this._adapter.idleclients
    }

    get waitingclients(): number {

        return this._adapter.waitingclients
    }

    static initialisePool (adapter: MkfDbPoolAdapter): MkfDbPool {

        this._instance = new MkfDbPool(adapter)

        return this._instance
    }

    static getPoolInstance (): MkfDbPool {

        return this._instance
    }
}
