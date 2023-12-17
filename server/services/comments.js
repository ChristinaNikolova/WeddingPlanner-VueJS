const Article = require("../models/Article");
const Comment = require("../models/Comment");

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

module.exports = {
  create,
};
