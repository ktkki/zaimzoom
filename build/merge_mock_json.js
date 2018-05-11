// merge_mock_json.js

const fs = require("fs");
const path = require("path");

// ルートパスを設定
const root = path.resolve("C:/Projects/zaimzoom/app/src/mock");

fs.watch(root, function(event, filename) {
  // /src/mock配下にあるjsonファイルの名前をエンドポイントとして読み込む
  const api = fs.readdirSync(root).reduce((api, file) => {
    const endpoint = path.basename(file, path.extname(file));
    console.log(api);
    api[endpoint] = JSON.parse(fs.readFileSync(root + "/" + file, "utf-8"));

    return api;
  }, {});
  fs.writeFile(root + "/../mock.json", JSON.stringify(api), function(err) {
    if (err) throw err;
    console.log("mock file updated.");
  });
});
