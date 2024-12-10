export function distributeEqualPrice(
  amount: number,
  persons: Array<{
    id: string;
    name: string;
    amount?: number;
  }>
) {
  if (amount === 0) return;

  const totalPersons = persons.length;
  const baseShare = Math.floor((amount / totalPersons) * 100) / 100;
  let remainder = Math.round((amount - baseShare * totalPersons) * 100); // Convert remainder to cents for easier distribution

  // Initialize `amount` and distribute the base share in a single loop
  persons.forEach((person) => {
    person.amount = baseShare;
    if (remainder > 0) {
      person.amount += 0.01; // Add one cent if remainder allows
      remainder--;
    }
  });
  return persons;
}
