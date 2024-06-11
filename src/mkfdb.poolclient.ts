export interface MkfDbPoolClient {

    query(sql: string, args?: any[]): Promise<any[]>
    release(destroy?: boolean): void
}
