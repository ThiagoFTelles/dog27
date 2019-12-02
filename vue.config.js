// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ?
//     '/dog27' : '/'
// }

// module.exports = {
//   publicPath: "/dog27"
// };

module.exports = {
  publicPath: "/",
  configureWebpack: {
    devtool: 'source-map'
  }
};