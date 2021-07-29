/*
 * :file description: 
 * :name: /webpack/plugin/hello-world.js
 * :author: 胡东亮
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-27 11:50:40
 * :last editor: 胡东亮
 * :date last edited: 2021-07-27 11:51:10
 */
class HelloWorldPlugin {
    apply(compiler) {
      compiler.hooks.done.tap(
        'Hello World Plugin',
        (
          stats
        ) => {
          console.log('Hello World!');
        }
      );
    }
  }
  
  module.exports = HelloWorldPlugin;