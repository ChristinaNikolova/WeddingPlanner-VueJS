const { formatCreatedAt } = require("../parser");
const { categoryViewModel, categoryNameViewModel } = require("./category");

function articleListViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        shortContent: article.content.slice(0, 200) + '...',
        image: article.image,
        category: categoryNameViewModel(article.category),
        createdAt: formatCreatedAt(article.createdAt),
    };
}

function articleDetailsViewModel(article) {
    return {
        id: article._id,
        title: article.title,
        shortContent: article.content.slice(0, (article.content.indexOf('.') + 1)),
        content: splitContentIntoArray(article.content.slice((article.content.indexOf('.') + 1))),
        image: article.image,
        jumboImage: article.jumboImage,
        likesCount: article.likes.length,
        likes: article.likes,
        category: categoryViewModel(article.category),
        createdAt: formatCreatedAt(article.createdAt),
    };
}

function splitContentIntoArray(content) {
    let sentences = content
        .split('.')
        .map((x) => x.trim())
        .filter((x) => x !== '')
        .map((x) => x + '.');

    let result = [];

    while (sentences.length > 0) {
        const currentGroupSentences = sentences.splice(0, 5);
        result.push(currentGroupSentences.join(''));
    }

    return result;
}

module.exports = {
    articleListViewModel,
    articleDetailsViewModel,
}