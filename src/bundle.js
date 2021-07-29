/*
 * :file description: 
 * :name: /webpack/src/bundle.js
 * :author: 胡东亮
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-07-26 16:23:20
 * :last editor: 胡东亮
 * :date last edited: 2021-07-27 13:54:41
 */

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const getModuleInfo = (file) => {
    const body = fs.readFileSync(file, "utf-8");
    const ast = parser.parse(body, {
        sourceType: 'module'
    })
    const deps = {};
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(file);
            const abspath = `./${path.join(dirname, node.source.value)}`;
            deps[node.source.value] = abspath;
        },
        
    })
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    return {
        code,
        deps,
        file
    }
 
}
const getDeps = (temp, {deps}) => {
    Object.keys(deps).forEach(key=>{
        const moduleInfo = getModuleInfo(deps[key]);
        temp.push(moduleInfo);
        if(Object.keys(moduleInfo?.deps).length > 0) {
            getDeps(temp, moduleInfo);
        }
    })
}
const parseModules = (file) => {
    const entry = getModuleInfo(file);
    const depsGraph = {};
    const temp = [entry];
    getDeps(temp, entry)
    temp.forEach(info=> {
        depsGraph[info.file] = {
            deps: info.deps,
            code: info.code
        }
    })
  return depsGraph;

}
const bundle =(file) => {
    const depsGraph = JSON.stringify(parseModules(file));
  
    // return `
    // (function(graph){
    //     function require(path) {
    //         function asbRequire(relPath) {
    //             return require(graph[path].deps[relPath])
    //         }
    //         var exports = {}
    //         function run(require, exports, code){
    //             eval(code)
    //         }
    //         run(asbRequire, exports, graph[path].code)
    //         return exports;
    //     }
    //     require('${file}')
    // })(${depsGraph})
    // `
   


}
const content = bundle("./demo/index.js");
console.log(content);
fs.stat('./dist',  (err, stats) => {
    if(!stats.isDirectory()){
        fs.mkdirSync('./dist');
    }
    fs.writeFileSync('./dist/bundle.js', content);
  });

