function SnackList() {
  const snacks = [
    { name: 'Oranges', rank: 3 },
    { name: 'Baby carrots', rank: 2 },
    { name: 'Pink Lady Apples', rank: 1 },
  ];
  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);
  return (
    <div>
      <h2>Snack list</h2>
      <ul>
        {sortedSnacks.map((snack) => (
          <li key={snack.name}>
            {snack.rank} - {snack.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SnackList;
