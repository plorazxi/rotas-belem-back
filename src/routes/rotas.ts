import express from 'express';
import repository from '../lib/repository.js';

const router = express.Router();
const db = new repository();

router.get('/', async (req, res) => {
    try{
        const rotas = await db.get();
        res.status(200).send(rotas);
    } catch(error) {
        res.status(500).send({
            mensagem: "Erro no Banco de dados"
        });
    }
});

router.post('/', async (req, res) => {
    try{
        const {nome, trajetoria} = req.body;
        if(!nome || !trajetoria) {
            return res.status(400).send({
                mensagem: "Nome e trajetória são obrigatorias"
            })
        }
        await db.post(nome, trajetoria);
        res.status(200).send({
            mensagem: "Rota salva com sucesso"
        });
    } catch (error) {
        console.error("ERRO NA ROTA POST:", error);
        res.status(500).send({
            mensagem: "Erro no Banco de dados"
        });
    }
});

router.delete('/', async (req, res) => {
    try {
        const id = req.body.id;
        if(!id) {
            return res.status(400).send({
                mensagem: "Id é obrigatório"
            });
    	}
        await db.delete(id);
        res.status(200).send({
            mensagem: "Rota deletada com sucesso"
        });
    } catch (error) {
        res.status(500).send({
            mensagem: "Erro no banco de dados"
        });
    }
});

export default router;
