import http from "http";           
import os from "node:os";
import dotenv from "dotenv";       
import { numbersArray } from './numbers/generateNumbers.js'
import { saveLotteryRecord, loadHistory, deleteRecord } from './numbers/history.js'
import Logger from "./logger.js";

dotenv.config();   

const PORT = process.env.PORT || 3000;

/**
 * Lottery Numbers HTTP Server
 * 
 * @scope public
 * - Handles generating lottery numbers, saving them to history.json
 * - Provides endpoints to load history and soft-delete records
 * - Uses native Node http module, async FS operations, and CORS headers
 */

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handles DELETE requests from different frontend origin
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  try {
    /**
     * GET /generate
     * Generates a new lottery numbers array
     * Saves record to history.json
     * Returns numbers as JSON
     */
    if (req.url === '/generate' && req.method === 'GET') {
      const numbers = numbersArray();
      await saveLotteryRecord(numbers);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(numbers));
    }

    /**
     * GET /history
     * Loads previously generated numbers
     * Filters out records marked as deleted
     * Returns JSON array
     */
    if (req.url === '/history' && req.method === 'GET') {
      const records = await loadHistory();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(records));
    }

    /**
     * DELETE /history/:id
     * Soft deletes a record by ID (marks is_deleted = true)
     * Returns { success: true } as JSON
     */
    if (req.url.startsWith('/history/') && req.method === 'DELETE') {
      const id = req.url.split('/').pop();
      Logger.info(`DELETE request received for ID: ${id}`);

      await deleteRecord(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true }));
    }

    // Not found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

  } catch (err) {
    Logger.error(`Server error: ${err.message}`, { stack: err.stack });
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
})

server.listen(PORT, () => {
  const rightNow = new Date();
  const machineName = os.hostname();
  Logger.info(`Server UP on ${machineName} listening on ${PORT}`);
})
