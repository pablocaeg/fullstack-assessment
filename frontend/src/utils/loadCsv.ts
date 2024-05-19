const CSV_PATH = '/available_numbers.csv';

export const loadCsv = async (): Promise<string[]> => {
  const response = await fetch(CSV_PATH);
  const csvText = await response.text();
  const phoneNumbers = csvText.trim().split('\n');
  return phoneNumbers;
};
