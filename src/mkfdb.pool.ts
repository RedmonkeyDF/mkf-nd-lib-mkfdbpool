import { MkfDbPoolClient } from './mkfdb.poolclient'

export interface MkfDbPool {

    get totalclients(): number
    get idleclients(): number
    get waitingclients(): number

    getClient() : Promise<MkfDbPoolClient>
    close(): Promise<void>
}
