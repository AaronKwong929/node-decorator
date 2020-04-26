# node 引入 babel 并使用装饰器

```cmd
npm init -y
```

> 安装 babel 依赖

```cmd
npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/register
```

> package.json 写入命令

```json
"scripts": {
    "start": "npx babel-node index.js",
    "serve": "nodemon index.js --exec babel-node"
}
```

```cmd
npm run start
```

> 控制台可以输出 hello world 成功！

然后安装装饰器模块

```cmd
npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

> 然后.babelrc 写入

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
}
```

### index.js 完整代码

```js
// index.js
import time from './decorators/time';

class Test {
    @time // 注意装饰器后面不能有分号
    test() {
        console.log(`time test`);
    }
}

const test = new Test();

test.test();
```

> 此时 npm run start

    time test

    default: 2.618ms

成功！

另外也已经成功正常使用es6的 import和export模块

index.js内@time会语法检测错误

解决方法如下

打开settings.json

```json
"javascript.implicitProjectConfig.experimentalDecorators": true
```
