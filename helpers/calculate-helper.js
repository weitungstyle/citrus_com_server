const getTotal = (carts, discount = 100) => {
  const total = carts.reduce((accumulator, currentValue) => accumulator + currentValue.productId.price, 0)
  const finals = total * discount / 100
  return finals
}

const sample = (array) => {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = {
  getTotal,
  sample
}
