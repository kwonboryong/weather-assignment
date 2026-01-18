export function getGreeting(date = new Date()): {
  prefix: "Good";
  word: string;
} {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return { prefix: "Good", word: "Morning" };
  if (hour >= 12 && hour < 18) return { prefix: "Good", word: "Afternoon" };
  if (hour >= 18 && hour < 21) return { prefix: "Good", word: "Evening" };
  return { prefix: "Good", word: "Night" };
}
