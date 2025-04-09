export function calculatePercentage(part, total) {
  if (total === 0) return '0.0'
  return ((part / total) * 100).toFixed(1)
}

