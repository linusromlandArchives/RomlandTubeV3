const path = require("path");

module.exports = {
  pages: {
    'index': {
      entry: './src/pages/Home/home.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'profile': {
      entry: './src/pages/Profile/profile.js',
      template: 'public/index.html',
      title: 'Profile',
      chunks: [ 'chunk-vendors', 'chunk-common', 'profile' ]
    }
  },
  outputDir: path.resolve(__dirname, "../server/dist"),
};
