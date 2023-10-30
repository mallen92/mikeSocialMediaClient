export const months = [
  { id: 1, name: "Jan" },
  { id: 2, name: "Feb" },
  { id: 3, name: "Mar" },
  { id: 4, name: "Apr" },
  { id: 5, name: "May" },
  { id: 6, name: "Jun" },
  { id: 7, name: "Jul" },
  { id: 8, name: "Aug" },
  { id: 9, name: "Sep" },
  { id: 10, name: "Oct" },
  { id: 11, name: "Nov" },
  { id: 12, name: "Dec" },
];

export let days = [];

for (let i = 0; i < 31; i++) {
  days[i] = {
    id: i + 1,
    name: `${i + 1}`,
  };
}

export let years = [];
let startYear = new Date().getFullYear();

for (let i = 0; i <= 116; i++) {
  years[i] = {
    id: startYear,
    name: `${startYear}`,
  };
  startYear--;
}
