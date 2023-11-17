export const months = [
  { id: 1, num: "01", name: "Jan" },
  { id: 2, num: "02", name: "Feb" },
  { id: 3, num: "03", name: "Mar" },
  { id: 4, num: "04", name: "Apr" },
  { id: 5, num: "05", name: "May" },
  { id: 6, num: "06", name: "Jun" },
  { id: 7, num: "07", name: "Jul" },
  { id: 8, num: "08", name: "Aug" },
  { id: 9, num: "09", name: "Sep" },
  { id: 10, num: "10", name: "Oct" },
  { id: 11, num: "11", name: "Nov" },
  { id: 12, num: "12", name: "Dec" },
];

export let days = [];
export let years = [];
let startYear = new Date().getFullYear();

for (let i = 0; i < 31; i++) {
  days[i] = {
    id: i + 1,
    name: `${i + 1}`,
  };
}

for (let i = 0; i < 117; i++) {
  years[i] = {
    id: startYear,
    name: `${startYear}`,
  };
  startYear--;
}
