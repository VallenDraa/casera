const arr = [
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 1, name: 'one' },
];

const ids = arr.map((o) => o.id);
const filtered = arr.filter(({ id }, index) => {
  return !ids.includes(id, index + 1);
});

console.log(filtered);
