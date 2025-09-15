// handles fs functions

import { readFile, writeFile } from 'node:fs/promises';

const DATA_FILE = './data/history.json';

export async function saveLotteryRecord(numbers) {
  // numbers: array of 6 numbers (first 5 white, last is powerball)
  const newRecord = {
    date_generated: new Date().toISOString(),
    lottery_numbers: numbers.slice(0,5),
    power_ball: numbers[5],
    is_deleted: false
  };

  let existingData = [];
  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    // If file doesn’t exist yet, start empty
    if (err.code !== 'ENOENT') throw err;
  }

  existingData.push(newRecord);
  await writeFile(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');

  return newRecord;
}