import { describe, it, expect } from 'vitest'
import { MkfNodepgPool, MkfDbPool } from '../src'

describe('MkfNodepgPool tests', () => {

    it('Should return the results from a db query', async () => {

        const cfg = {
            allowexitonidle: true,
            path: process.env.VITE_DB_PATH ?? '',
            user: process.env.VITE_DB_USER ?? '',
            password: process.env.VITE_DB_PASSWORD ?? ''
        }
        const pool: MkfDbPool = new MkfNodepgPool(cfg)
        const cli = await pool.getClient()

        const rows: {id: number, testname: string, testnumber: number}[] = await cli.query('select * from testdata order by id;')

        expect(rows.length).toStrictEqual(2)
        expect(rows[0].id).toStrictEqual(1)
        expect(rows[1].id).toStrictEqual(2)

        const filt = await cli.query('select * from testdata where id=$1', [2])
        expect(filt.length).toStrictEqual(1)
        expect(filt[0].id).toStrictEqual(2)

        cli.release()

        await pool.close()
    })
})
