# Module Resolver handbook

[offical babel-plugin-module-resolver](https://yarnpkg.com/package/babel-plugin-module-resolver)

#### Install Module Resolver package in the project

```bash
$    yarn add -D babel-plugin-module-resolver
```

##### 1. Create jsconfig.json for VS Code Configure the path mapping

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@assets": ["./src/assets"]
    }
  }
}
```

##### 2. Specify the plugin in your .babelrc with the custom root or alias.

```
{
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["."],
        "alias": {
          "@assets": "./src/assets",
        }
      }
    ]
  ]
}
```

### Usage

```js
import { Assets } from "@assets";
```
