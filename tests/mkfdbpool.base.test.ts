import { expect, describe, it } from 'vitest'

import { MkfDbPool } from '../src'
import { type MkfDbconfig, MkfDbPoolAdapter } from '../src'

const dummydbcfg: MkfDbconfig = { host: 'localhost', port: 5432, path: 'dummy', user: 'dummy', password: 'dummy' }

class TestDbPoolAdapter extends MkfDbPoolAdapter {

    private readonly _total: number
    private readonly _idle: number
    private readonly _waiting: number

    constructor(cfg: MkfDbconfig, total: number, idle: number, waiting: number) {

        super(cfg)

        this._total = total
        this._idle = idle
        this._waiting = waiting
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
}

describe('MkfDbPool tests', () => {

    it ('Should initialise a DBPool when passed an adapter in constructor', () => {

        const cp: MkfDbPool = MkfDbPool.initialisePool(new TestDbPoolAdapter(dummydbcfg, 10, 5, 3))
        const mp: MkfDbPool = MkfDbPool.getPoolInstance()

        expect(mp).not.toBe(undefined)
        expect(mp).toBeInstanceOf(MkfDbPool)
        expect(mp.totalclients).toStrictEqual(10)
        expect(mp.idleclients).toStrictEqual(5)
        expect(mp.waitingclients).toStrictEqual(3)
        expect(mp).toStrictEqual(cp)
    })

    it('Should initialise a new pool when initialisePool is called again', () => {

        const poolone: MkfDbPool = MkfDbPool.initialisePool(new TestDbPoolAdapter(dummydbcfg, 1, 2, 3))
        const pooltwo: MkfDbPool = MkfDbPool.initialisePool(new TestDbPoolAdapter(dummydbcfg, 4, 5, 6))

        expect(poolone).not.toStrictEqual(pooltwo)
    } )
})
