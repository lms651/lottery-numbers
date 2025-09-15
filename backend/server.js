// import http from "http";           
// import os from "node:os";
// import dotenv from "dotenv";       
// import { numbersArray } from './numbers/generateNumbers.js'
// import { saveLotteryRecord } from './numbers/history.js'

// dotenv.config();   

// console.log('process.env.PORT =', process.env.PORT); // should print 3001

// const PORT = process.env.PORT || 3000;

// const server = http.createServer(async (req, res) => {
//   if (req.url === '/generate') {
//     const numbers = numbersArray();

//     try {
//       // save the record
//       await saveLotteryRecord(numbers);
//     } catch (err) {
//       console.error("Error saving lottery record:", err);
//       // optionally return a 500
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('Server error');
//       return;
//     }

//     // send numbers to frontend
//     res.writeHead(200, {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     });
//     res.end(JSON.stringify(numbers));

//   } else {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//   }
// });

// server.listen(PORT, () => {
//     const rightNow = new Date();
//     const machineName = os.hostname();

//     console.log(`${rightNow} Server UP on ${machineName} listening on ${PORT}`);
// })

import http from "http";           
import os from "node:os";
import dotenv from "dotenv";       
import { numbersArray } from './numbers/generateNumbers.js'
import { saveLotteryRecord, loadHistory, deleteRecord } from './numbers/history.js'

dotenv.config();   

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    // ------------------- GENERATE -------------------
    if (req.url === '/generate' && req.method === 'GET') {
      const numbers = numbersArray();
      await saveLotteryRecord(numbers);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify(numbers));
    }

    // ------------------- GET HISTORY -------------------
    if (req.url === '/history' && req.method === 'GET') {
      const records = await loadHistory(); // returns only non-deleted
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify(records));
    }

    // ------------------- DELETE RECORD -------------------
    if (req.url.startsWith('/history/') && req.method === 'DELETE') {
      const id = req.url.split('/').pop();
        console.log('DELETE request received for ID:', id); // <-- add this

      await deleteRecord(id); // marks is_deleted = true

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify({ success: true }));
    }

    // ------------------- NOT FOUND -------------------
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

  } catch (err) {
    console.error("Server error:", err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  const rightNow = new Date();
  const machineName = os.hostname();
  console.log(`${rightNow} Server UP on ${machineName} listening on ${PORT}`);
});
