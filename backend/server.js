import http from "http";           
import os from "node:os";
import dotenv from "dotenv";       
import { numbersArray } from './numbers/generateNumbers.js'

dotenv.config();   

console.log('process.env.PORT =', process.env.PORT); // should print 3001

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/generate') {
        const numbers = numbersArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(numbers));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
})

server.listen(PORT, () => {
    const rightNow = new Date();
    const machineName = os.hostname();

    console.log(`${rightNow} Server UP on ${machineName} listening on ${PORT}`);
})

