import express from 'express'
import path from 'path'
import { getAll } from './scripts/getAllResults.js'

const app = express()
const port = 3000

const __dirname = path.resolve();
console.log(__dirname)

app.use(express.static(path.resolve(__dirname, 'html')))
app.use(express.static(path.resolve(__dirname, 'scripts')))


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get("/request", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const searchReq = req.query.first;
    
    let answer = await getAll(searchReq)
    res.send(answer)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})