import { MkfDbPoolClient } from './mkfdb.poolclient'

export type MkfDbconfig = {

    host: string,
    port: number,
    path: string,
    user: string,
    password: string
}

export abstract class MkfDbPoolAdapter {

    protected constructor (dbconfig: MkfDbconfig) {}

    abstract get totalclients(): number
    abstract get idleclients(): number
    abstract get waitingclients(): number

    abstract getClient(): Promise<MkfDbPoolClient>
}
