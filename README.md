# react-app-rewire-host
> Add a host to your create-react-app app process.env via react-app-rewired when build 

* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [react-app-rewired](https://github.com/timarney/react-app-rewired)

## Install

```bash
# use npm
$ npm install --save-dev react-app-rewire-host  

# use yarn
$ yarn add --dev react-app-rewire-host
```

## Usage

In the `config-overrides.js` for [react-app-rewired](https://github.com/timarney/react-app-rewired) add code

```javascript
/* config-overrides.js */
const rewireHost = require('react-app-rewire-host');

module.exports = (config, env)=>{
  
   // Also support object for config, like
   // const hostConfig = {
   //   uat: {
   //     api: 'http://xxxuat.api.com',
   //     otherurl: 'http://xxxother.url.com',
   //   },
   //   pro: ...
   // }
  const hostConfig = {
    uat: 'http://xxxuat.api.com',
    pro: 'https://xxx.api.com'
  }
  config = rewireHost(config, env, hostConfig)
  return config;
}
```  

Then add a env `HOST_NAME` when you build project in `package.json`
```diff
  "scripts": {
-   "build": "react-scripts build",
+   "build": "react-app-rewired HOST_NAME=pro build",
+   "build:uat": "react-app-rewired HOST_NAME=uat build",
}
```

Finally you can use `process.env.REACT_APP_HOST` in your code and also the build dir will make a subdir that the name is `HOST_NAME`.

## License
MIT
