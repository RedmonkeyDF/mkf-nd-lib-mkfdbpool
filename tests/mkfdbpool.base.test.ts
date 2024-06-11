import { expect, describe, it } from 'vitest'

import { MkfDbPool } from '../src'
import { MkfDbPoolClient } from '../src'

class TestDbPoolClient implements MkfDbPoolClient {

    query(sql: string, args?: []): Promise<any[]> {

        return Promise.resolve([])
    }

    release(destroy?: boolean): Promise<void> {

        return Promise.resolve()
    }
}

class TestDbPool extends MkfDbPool {

    private _total: number = 0
    private _idle: number = 0
    private _waiting: number = 0

    constructor() {
        super()
    }

    get waitingclients(): number {
        return this._waiting
    }

    get idleclients(): number {
        return this._idle
    }

    get totalclients(): number {
        return this._total
    }

    setPoolInfo(total : number, idle: number, waiting: number = 0): void {

        this._idle = idle
        this._total = total
        this._waiting = waiting
    }

    async getClient(): Promise<MkfDbPoolClient> {

        return Promise.resolve(new TestDbPoolClient())
    }

    async close(): Promise<void> {

        return Promise.resolve()
    }
}

describe('MkfDbPool tests', () => {

    it ('Should initialise a DBPool when passed an adapter in constructor', () => {

        const cp: TestDbPool = MkfDbPool.getPoolInstance(TestDbPool) as TestDbPool
        cp.setPoolInfo(10, 5, 3)
        const mp: MkfDbPool = MkfDbPool.getPoolInstance(TestDbPool)

        expect(mp).not.toBe(undefined)
        expect(mp).toBeInstanceOf(MkfDbPool)
        expect(mp.totalclients).toStrictEqual(10)
        expect(mp.idleclients).toStrictEqual(5)
        expect(mp.waitingclients).toStrictEqual(3)
        expect(mp).toStrictEqual(cp)
    })

    it('Should return an instance of MkfDbPoolClient when getClient is called', async () => {

        const cp: MkfDbPool = MkfDbPool.getPoolInstance(TestDbPool)

        await expect(cp.getClient()).resolves.toSatisfy((ob: any): ob is MkfDbPoolClient => ob.query !== undefined)
    })
})
