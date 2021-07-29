/*
 * :file description: 
 * :name: /webpack/loader/replace-loader.js
 * :author: 胡东亮
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-27 11:38:15
 * :last editor: 胡东亮
 * :date last edited: 2021-07-27 11:52:22
 */
const loaderUtils = require('loader-utils');
module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
  
    return source;
}