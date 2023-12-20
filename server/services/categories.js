const Category = require("../models/Category");
const { errors } = require("../utils/constants/global");
const { categoryViewModel } = require("../utils/mapper/category");

async function create(name, image) {
  let category = await getByName(name);

  if (category) {
    throw new Error(errors.NAME_TAKEN);
  }

  category = new Category({
    name,
    image,
  });

  await category.save();

  return category;
}

async function all() {
  return (await Category.find({}).sort({ name: 1 })).map(categoryViewModel);
}

async function deleteById(id) {
  return Category.findByIdAndDelete(id);
}

async function update(id, name, image) {
  const category = await getById(id);

  if (category.name.toLowerCase() !== name.toLowerCase()) {
    const result = await getByName(name);

    if (result) {
      throw new Error(errors.NAME_TAKEN);
    }
  }

  category.name = name;
  category.image = image;

  await category.save();

  return category;
}

async function getById(id) {
  return Category.findById(id);
}

async function getByName(name) {
  return await Category.findOne({ name }).collation({
    locale: "en",
    strength: 2,
  });
}

module.exports = {
  create,
  all,
  deleteById,
  getById,
  update,
};
