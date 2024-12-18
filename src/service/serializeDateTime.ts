export const serializeDate = (timestamp: number): string => {
  if (!Number.isInteger(timestamp)) {
    throw new Error("Invalid timestamp. It should be an integer.");
  }

  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}.${month}.${year}`;
};

export const serializeTime = (timestamp: number): string => {
  if (!Number.isInteger(timestamp)) {
    throw new Error("Invalid timestamp. It should be an integer.");
  }

  const date = new Date(timestamp * 1000);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
