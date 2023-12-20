const Article = require("../models/Article");
const {
  Types: { ObjectId },
} = require("mongoose");
const { articleListViewModel } = require("../utils/mapper/article");

async function getFavArticles(userId, take, skip) {
  const articles = (await Article.find({}))
    .filter((a) => a.likes.includes(ObjectId(userId)))
    .map(articleListViewModel);

  return articles.slice(skip, skip + take);
}

async function getUserTotalCount(userId) {
  return (await Article.find({})).filter((a) =>
    a.likes.includes(ObjectId(userId))
  ).length;
}

module.exports = {
  getFavArticles,
  getUserTotalCount,
};
