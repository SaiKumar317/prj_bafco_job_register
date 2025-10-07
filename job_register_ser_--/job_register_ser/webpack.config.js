const path = require("path");

module.exports = {
  entry: {
    // Main entry
    server: "./src/app.js",

    // Config
    dbConfig: "./src/config/dbConfig.js",
    dbConfigParser: "./src/config/dbConfigParser.js",

    // Routes
    jobRegRoute: "./src/routes/jobReg_routes.js",

    // Services
    jobStatusService: "./src/service/jobStatusService_service.js",
  },
  output: {
    path: path.join(
      "C:\\inetpub\\wwwroot\\prj_bafco_job_register",
      "job_register_server"
    ),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  mode: "production",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
