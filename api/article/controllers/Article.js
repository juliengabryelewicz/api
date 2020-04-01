'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findForBot: async ctx => {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query,['titre', 'slug']);
    } else {
      entities = await strapi.services.article.find(ctx.query,['titre', 'slug']);
    }

    return entities.map(entity => {
      const article = sanitizeEntity(entity, { model: strapi.models.article });
      if(article.contenu){
        delete article.contenu;
      }
      if(article.seo_title){
        delete article.seo_title;
      }
      if(article.seo_keywords){
        delete article.seo_keywords;
      }
      if(article.seo_description){
        delete article.seo_description;
      }
      if(article.resume){
        delete article.resume;
      }
      if(article.categories){
        delete article.categories;
      }
      if(article.created_at){
        delete article.created_at;
      }
      if(article.updated_at){
        delete article.updated_at;
      }
      if(article.visible){
        delete article.visible;
      }
      if(article.langage){
        delete article.langage;
      }
      return article;
    })
  },
};
