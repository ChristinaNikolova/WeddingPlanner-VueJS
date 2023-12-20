function costViewModel(cost) {
  return {
    id: cost._id,
    title: cost.title,
    price: Number(cost.price).toFixed(2),
    category: cost.category,
  };
}

module.exports = {
  costViewModel,
};
