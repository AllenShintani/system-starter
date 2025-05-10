export const getDifficultyStars = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return '★☆☆'
    case 2:
      return '★★☆'
    case 3:
      return '★★★'
    default:
      return '☆☆☆'
  }
}
