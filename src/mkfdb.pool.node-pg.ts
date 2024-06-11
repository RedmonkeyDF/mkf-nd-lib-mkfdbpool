import { MkfDbPool } from './mkfdb.pool'
import { MkfDbPoolClient } from './mkfdb.poolclient'

export class MkfNodepgPool implements MkfDbPool{

    get totalclients(): number {
        return 0
    }

    get idleclients(): number {
        return 0
    }

    get waitingclients(): number {
        return 0
    }

    async getClient() : Promise<MkfDbPoolClient> {

        return Promise.resolve({
            async query(sql: string, args?: []): Promise<any[]> { return Promise.resolve([])},
            async release(destroy?: boolean): Promise<void> {return Promise.resolve(undefined)},
        })
    }

    async close(): Promise<void> {

        return Promise.resolve()
    }

}
