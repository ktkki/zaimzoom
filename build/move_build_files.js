// move_build_files.js

const fs = require("fs-extra");
const path = require("path");

fs.copySync("./src/data", "../server/public/data");
fs.copySync("./dist", "../server/public");

console.log("build files deployed to server");
