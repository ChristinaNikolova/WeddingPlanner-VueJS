function categoryViewModel(category) {
    return {
        id: category._id,
        name: category.name,
        image: category.image,
    }
}

function categoryNameViewModel(category) {
    return {
        id: category._id,
        name: category.name,
    }
}

module.exports = {
    categoryViewModel,
    categoryNameViewModel
}