const Article = require("../models/Article");
const Comment = require("../models/Comment");
const { commentViewModel } = require("../utils/mapper/comment");

async function create(articleId, userId, content) {
  const comment = new Comment({
    content,
    creator: userId,
  });

  const result = await comment.save();

  const article = await Article.findById(articleId);
  article.comments.push(result._id);
  await article.save();

  return result;
}

async function all(articleId) {
  const article = await Article.findById(articleId).populate({
    path: "comments",
    populate: {
      path: "creator",
    },
  });

  return article.comments
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(commentViewModel);
}

module.exports = {
  create,
  all,
};
