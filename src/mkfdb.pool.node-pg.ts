import pg from 'pg'
import type { Pool, PoolClient } from 'pg'

import { MkfDbPool } from './mkfdb.pool'
import { MkfDbPoolClient } from './mkfdb.poolclient'

pg.types.setTypeParser(20, (val) => { //parse bigint values to number

    return parseInt(val, 10)
})

export type MkfNodepgPoolConfig = {
    host?: string,
    port?: number,
    path: string,
    user: string,
    password: string,
    maxclients?: number,
    conntimeout?: number,
    idletimeout?: number,
    allowexitonidle?: boolean
}

export class MkfNodepgPoolClient implements MkfDbPoolClient {

    private readonly _client: PoolClient

    constructor(cli: PoolClient) {

        this._client = cli
    }

    async query(sql: string, args?: any[]): Promise<any[]> {

       try {

           let res: pg.QueryResult<any>

           if (args) res = await this._client.query(sql, args); else res = await this._client.query(sql)

           return Promise.resolve(res.rows)

       }  catch(e) {

           return Promise.reject(e)
       }
    }
    release(destroy?: boolean): void {

        if(this._client) this._client.release(destroy)
    }
}

export class MkfNodepgPool implements MkfDbPool{

    private _pool: Pool

    constructor(cfg: MkfNodepgPoolConfig) {

        this._pool = new pg.Pool({
            host: cfg.host ?? 'localhost',
            port: cfg.port ?? 5432,
            user: cfg.user,
            password: cfg.password,
            database: cfg.path,
            connectionTimeoutMillis: cfg.conntimeout ?? 30000,
            idleTimeoutMillis: cfg.idletimeout ?? 120000,
            max: cfg.maxclients ?? 10,
            allowExitOnIdle: cfg.allowexitonidle ?? false
        })
    }

    get totalclients(): number {
        return this._pool.totalCount
    }

    get idleclients(): number {
        return this._pool.idleCount
    }

    get waitingclients(): number {
        return this._pool.waitingCount
    }

    async getClient() : Promise<MkfDbPoolClient> {

        try {

            const cli: pg.PoolClient = await this._pool.connect()

            return new MkfNodepgPoolClient(cli)

        } catch(e) {

            return Promise.reject(e)
        }
    }

    async close(): Promise<void> {

        try {
            await this._pool.end()
            return Promise.resolve()
        } catch(e) {

            return Promise.reject(e)
        }
    }

}
