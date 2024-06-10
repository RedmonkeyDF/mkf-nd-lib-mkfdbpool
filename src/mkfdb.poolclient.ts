import { MkfDbPoolAdapter } from './mkfdb.adapterbase'

export class MkfDbPoolClient {

    private _adapter: MkfDbPoolAdapter

    constructor (adapter: MkfDbPoolAdapter) {

        this._adapter = adapter
    }
}
