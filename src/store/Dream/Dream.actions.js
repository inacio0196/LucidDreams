export function registerDreamOfToday (dream) {
  return {
    type: 'REGISTER_DREAM_OF_TODAY',
    payload: dream,
  }
}