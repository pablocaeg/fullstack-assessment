import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This function and the CSV file in the '../../assets' folder is used in the backend to verify that the number sent to the Create/Update methods is VALID. 
// I could check this only on the frontend part of the application (blocking invalid values using typescript validation), but I think its more appropriate to check this here on the backend too.

const validPhoneNumbers: Set<number> = new Set();

const csvFilePath = path.join(__dirname, '../../assets/available_numbers.csv');

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: false }))
  .on('data', (row) => {
    const phoneNumber = parseInt(row[0], 10);
    if (!isNaN(phoneNumber)) {
      validPhoneNumbers.add(phoneNumber);
    }
  });

export const isValidPhoneNumber = (phone: number): boolean => {
  return validPhoneNumbers.has(phone);
};
