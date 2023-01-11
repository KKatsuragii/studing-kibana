import  express, { Request, Response }  from "express";
import getClient from "./client/elasticsearch";
import DBController from "./DBController";
import TesteController from "./TesteController";

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
app.get('/teste/create', TesteController.create);
app.get('/teste/findAll', TesteController.findAll);
app.get('/teste/findById/:id', TesteController.findById);
app.get('/teste/createTeste', TesteController.createTeste);
app.get('/teste/findByQuery', TesteController.findByQuery);

app.listen(3333, () => console.log('Running'));