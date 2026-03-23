export const CLIENT_SIGNOUT_CONTENT = {
  title: "You Are Signed Out",
  subtitle:
    "Your session has been ended successfully. For security, close the browser if you are on a shared device.",
  signedOutPrefix: "Signed out on",
  loginAgainLabel: "Login Again",
  contactSupportLabel: "Contact Support",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatSignedOutAt(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }

  return `${month} ${day}, ${year} ${hour}:${minute} ${period}`;
}