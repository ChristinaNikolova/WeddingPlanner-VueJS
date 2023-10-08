const Article = require("../models/Article");
const { Types: { ObjectId } } = require('mongoose');
const { articleListViewModel } = require("../utils/mapper/article");

async function getFavArticles(userId) {
    return (await Article
        .find({}))
        .filter((a) => a.likes.includes(ObjectId(userId)))
        .map(articleListViewModel);
}

module.exports = {
    getFavArticles,
}