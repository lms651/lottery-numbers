import { readFile, writeFile } from 'node:fs/promises';

const DATA_FILE = './data/history.json';

/**
 * Persists Generated Lottery Numbers
 * 
 * @scope private
 * @param {Array} numbers An array of 6 integers (first 5 are lottery numbers, last is Powerball)
 * @returns {Object} newRecord object stored to history.json
 */

export async function saveLotteryRecord(numbers) {
  const newRecord = {
    id: Date.now(),
    date_generated: new Date().toISOString(),
    lottery_numbers: numbers.slice(0,5),
    power_ball: numbers[5],
    is_deleted: false
  }

  let existingData = [];
  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  existingData.push(newRecord);
  await writeFile(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');

  return newRecord;
}

/**
 * Loads saved lottery numbers from history.json
 * 
 * @scope private
 * @param none
 * @returns {Array<Object>} Array of record objects that are not marked as deleted
 */

export async function loadHistory() {
  let existingData = [];

  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  // filter out deleted records
  const displayData = existingData.filter(r => r.is_deleted === false);

  return displayData;
}

/**
 * Marks a lottery record in history.json as deleted (soft delete)
 * 
 * @scope private
 * @param {string} recordId - The ID of the record to mark deleted from URL
 * @returns {Promise<void>} Resolves once the record is marked deleted and the file is updated
 */

export async function deleteRecord(recordId) {
  let existingData = [];

  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  // Convert id to number
  const idNum = Number(recordId);

  // Find record and mark it deleted
  for (const record of existingData) {
    if (record.id === idNum) {
      record.is_deleted = true;
      break;
    }
  }

  // Write updated array back to history.json
  await writeFile(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');
}