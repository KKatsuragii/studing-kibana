//O nome do controller se deve ao nome da tabela de teste que criei, por isso TesteController

import { Request, Response } from "express";
import { Client } from "pg";
import getClient from "./client/elasticsearch";

class TesteController {

    async create(request: Request, response: Response) {
        const client = new Client({
        host:'localhost',
            port: 5432,
            database: 'postgres',
            password: 'docker',
            user: 'postgres'
        });

        await client.connect();
        const { rows } = await client.query('SELECT * FROM TESTE');
        for await(let row of rows) {
            await getClient().index({
                index: 'teste',
                type: 'type_teste',
                body: row
            }, (erro) => {
                if(erro){
                    return response.status(400).json({error: erro})
                }
            })
        }

        return response.json({ message: 'Index ok!'})
    }

    async findAll(request: Request, response: Response) {
        const data = await getClient().search({
            index: 'teste',
            size: 1024
        });

        return response.json(data);
    }

    async findById(request: Request, response: Response) {
        const { id } = request.params;
        const data = await getClient().search({
            index: 'teste',
            q: `id:${id}`
        });

        return response.json(data.hits.hits);
    }

    async createTeste(request: Request, response: Response) {
        const teste = {
            "id": 11,
            "name": "cássio",
            "alias": "goleiro"
        }

        const data = await getClient().index({
            index: 'teste',
            type: 'type_teste',
            body: teste
        })

        return response.json(data);
    }

    async findByQuery(request: Request, response: Response) {
        const data = await getClient().search({
            index: 'teste',
            body: {
                query: {
                    match: {
                        alias: 'teste'
                    }
                }
            }
        });

        return response.json(data.hits.hits);
    }
}

export default new TesteController;