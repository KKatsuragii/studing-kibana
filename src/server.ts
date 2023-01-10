import  express, { Request, Response }  from "express";
import getClient from "./client/elasticsearch";
import DBController from "./DBController";

const app = express();

app.get('/', async (request: Request, response: Response) => {
    const client = getClient();

    //Criar um registro no elasticsearch
    const result = await client.index({
        index: 'elastictest',
        type: 'type_elastic_teste',
        body: {
            user: 'KKatsu',
            password: '123456',
            email: 'kkatsuragii@outlook.com'
        }
    })

    //Fazer uma busca
    return response.json(result)
})

app.get('/db/create', DBController.create);

app.listen(3333, () => console.log('Running'));