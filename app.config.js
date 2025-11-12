const config = require('./development.config.js');

module.exports = {
  expo: {
    name: "mobile-coccidiose-app",
    slug: "mobile-coccidiose-app",
    version: "1.0.0",
    extra: {
      ...config.extra, "eas": {
        "projectId": "f551b28d-0b7d-4868-834d-f9129dc0f815"
      }
    },
    android: {
      package: "com.roboticacesmac.mobilecoccidioseapp",
    },
  },
  
};