export function convertYYYYMMddToIsosString(dateString: string) {
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-based
  const day = parseInt(parts[2], 10);

  return new Date(year, month, day).toISOString();
}
