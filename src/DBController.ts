import { Request, Response } from "express";
import { Client } from "pg";

class DBController {
    async create(request: Request, response: Response){
        const client = new Client({
            host:'142.93.124.123',
            port: 5432,
            database: 'postgres',
            password: 'docker',
            user: 'postgres'
        });

        await client.connect();
        const data = await client.query('SELECT * FROM PHOTOS');
        return response.json(data);
    }
}

export default new DBController;