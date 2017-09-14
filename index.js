const webpack = require("webpack");
const paths = require("react-app-rewired/scripts/utils/paths");
const getClientEnvironment = require(paths.scriptVersion + "/config/env");

const rewireHost = (config, env, hostOptions) => {
  const envs = getClientEnvironment(config.output.publicPath.slice(0, -1));
  let host = hostOptions[process.env.HOST_NAME];
  if (typeof host === "object" && !(host instanceof RegExp)) {
    Object.keys(host).forEach(key => {
      host[key] = JSON.stringify(host[key]); 
    });
  } else {
    host = JSON.stringify(host || "");
  }
  config.plugins.unshift(
    new webpack.DefinePlugin({
      "process.env": Object.assign({}, envs.stringified["process.env"], {
        REACT_APP_HOST: host
      })
    })
  );
  if (env === "production") {
    console.log(`Production build with host ${JSON.stringify(host)}`);
    config.output.filename = addHostNameTag(config.output.filename, "js");
    config.output.chunkFilename = addHostNameTag(
      config.output.chunkFilename,
      "chunk"
    );
  }
  return config;
};

function addHostNameTag(filename, indexOfKey) {
  const splits = filename.split(".");
  const index = splits.indexOf(indexOfKey);
  splits.splice(index, 0, process.env.HOST_NAME);
  return splits.join(".");
}

module.exports = rewireHost;
