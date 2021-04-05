const { LiveApi } = require('telldus-api');

const api = new LiveApi({
  key: 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU', // publicKey
  secret: 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF', // privateKey
  tokenKey: 'a16ce8e245888fa36cec8f816719148405f90237b', // token
  tokenSecret: '9dfdc7e45ea6a59bb97af8caecb5222f', // tokensecret
});


module.exports.api=api
