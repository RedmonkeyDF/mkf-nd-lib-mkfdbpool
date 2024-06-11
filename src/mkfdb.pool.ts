import { MkfDbPoolClient } from './mkfdb.poolclient'

export abstract class MkfDbPool {

    private static _instance: MkfDbPool | undefined = undefined

    protected constructor() {
    }

    abstract get totalclients(): number
    abstract get idleclients(): number
    abstract get waitingclients(): number

    abstract getClient() : Promise<MkfDbPoolClient>

    static getPoolInstance<T extends MkfDbPool>(type: { new(): T ;}): MkfDbPool {

        if (!this._instance) {

            this._instance = new type()
        }

        if (this._instance) {

            return this._instance
        }

        throw new Error('error creating pool instance')
    }
}
