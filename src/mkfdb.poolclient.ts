import { MkfDbPoolAdapter } from './mkfdb.adapterbase'

export interface MkfDbPoolClient {

    query(sql: string, args?: []): Promise<any[]>
    release(destroy?: boolean): Promise<void>
}
