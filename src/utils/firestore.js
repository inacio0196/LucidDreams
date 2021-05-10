export function getItemsOnQuery (snapshot) {
  const items = []

  snapshot.forEach(doc => {
    items.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  return items
}