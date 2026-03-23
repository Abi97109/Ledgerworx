export const CLIENT_RECEIPT_DEFAULTS = {
  serviceTitle: "Service Payment",
  requestId: "N/A",
  amount: "AED 0",
  paymentMethod: "Online Payment Gateway",
};

function pad2(value) {
  return String(value).padStart(2, "0");
}

export function formatReceiptDate(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
}

export function formatReceiptTime(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  let hour = date.getHours();
  const minute = pad2(date.getMinutes());
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }

  return `${pad2(hour)}:${minute} ${period}`;
}

export function buildTransactionId(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "TXN-";
  }

  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hour = pad2(date.getHours());
  const minute = pad2(date.getMinutes());
  const second = pad2(date.getSeconds());

  return `TXN-${year}${month}${day}${hour}${minute}${second}`;
}

export function decodeReceiptQueryParam(value, fallbackValue) {
  if (typeof value !== "string") {
    return fallbackValue;
  }

  const trimmed = value.trim();
  return trimmed || fallbackValue;
}