const releasedAt = new Date(2025, 3, 17)

export function getDaysAfterRelease() {
  const now = new Date()
  const utc1 = Date.UTC(releasedAt.getFullYear(), releasedAt.getMonth(), releasedAt.getDate());
  const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(Math.abs(utc2 - utc1) / oneDay);
}
