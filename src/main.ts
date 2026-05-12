import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import rotas from "./routes/rotas.js";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/rotas', rotas);

app.get('/', (req, res) => {
    return res.send('root route');
});

server.listen(3000, () => {
    console.log("server on");
});
