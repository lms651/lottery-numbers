// handles fs functions

import { readFile, writeFile } from 'node:fs/promises';

const DATA_FILE = './data/history.json';

export async function saveLotteryRecord(numbers) {
  // numbers: array of 6 numbers (first 5 white, last is powerball)
  const newRecord = {
    id: Date.now(),
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

export async function loadHistory() {
  let existingData = [];

  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    // If file doesn’t exist yet, start empty
    if (err.code !== 'ENOENT') throw err;
  }

  // filter out deleted records
  const displayData = existingData.filter(r => r.is_deleted === false);

  return displayData;
}

// returns void
// deleteRecord(id) should locate the record by id and set is_deleted = true, then write back to the JSON file.

// export async function deleteRecord(recordId) {
//   let existingData = [];

//   try {
//     const fileContent = await readFile(DATA_FILE, 'utf8'); 
//     existingData = JSON.parse(fileContent);
//   } catch (err) {
//     if (err.code !== 'ENOENT') throw err;
//   }

//   // find the record by id and mark as deleted
//   const index = existingData.findIndex(r => r.id === recordId);
//   if (index !== -1) {
//     existingData[index].is_deleted = true;

//     // write updated array back to file
//     await writeFile(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');
//   }
// }

export async function deleteRecord(recordId) {
  let existingData = [];

  try {
    const fileContent = await readFile(DATA_FILE, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  // Convert id to number because Date.now() gave numeric IDs
  const idNum = Number(recordId);

  // Find record and mark it deleted
  for (const record of existingData) {
    if (record.id === idNum) {
      record.is_deleted = true;
      break;
    }
  }


  // Write updated array back to file
  await writeFile(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf8');
}