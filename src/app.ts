import 'dotenv/config'
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import {appRouter} from "./routes/api";
import DatabaseConnection from './database/database-init'
import RedisStore from "./config/redis-store";
import bodyParser from "body-parser";

const app: express.Application = express();
const server: http.Server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Gomoney assessment ');
});

DatabaseConnection.connect();

new RedisStore(app).connectStore();

app.use('/api', appRouter);

server.listen(port, () => {
    return console.log(`server listening at http://localhost:${port}`);
});
