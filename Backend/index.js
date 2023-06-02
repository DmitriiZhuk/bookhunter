import express from 'express';
import path from 'path';
import {getAll} from './src/getAllResults.js';

const app = express();
const port = 3000;

const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, 'html')));
app.use(express.static(path.resolve(__dirname, 'scripts')));

app.get('/api/request', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.header('Access-Control-Allow-Origin', '*');
    const searchReq = req.query.search;
    const start = performance.now();
    console.log(`[${Date.now()}][${ip}] Searching: "${searchReq}"`);
    let answer = await getAll(searchReq);
    const time = Math.round((performance.now() - start)/1000);
    console.log(`[${Date.now()}][${ip}] Done in ${time}sec`);
    res.send({result: answer, time});
});

app.listen(port, () => {
    console.log(`[${Date.now()}] App listening on port ${port}`);
});
