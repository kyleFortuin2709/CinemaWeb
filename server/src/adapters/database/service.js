import { Pool, PoolClient } from 'pg';
import { loadDBSecrets } from '../../secrets';
const pool = new Pool();

async function getClient(tryCount){
    try {
        const client = await pool.connect();
        return client;
    } catch (err) {
        if (tryCount >= 3) {
            throw err;
        }
        await loadDBSecrets();
        return getClient(tryCount + 1);
    }
}

export async function query(statement, values = []) {
    const client = await getClient(0);
    const result = await client.query(statement, values);
    client.release();
    return result;
}