module.exports = {
  // フロントエンドのTS/JSファイル（ESLint + Prettier）
  "frontend/**/*.{js,jsx,ts,tsx}": (files) => {
    // ファイルパスをフロントエンドディレクトリからの相対パスに変換
    const relativePaths = files.map((file) => file.replace("frontend/", ""));
    return [
      // フロントエンドディレクトリに移動してからESLintを実行
      `cd frontend && eslint --fix ${relativePaths.join(" ")}`,
    ];
  },
  // その他のTS/JSファイル（Prettierのみ）
  "**/*.{js,jsx,ts,tsx}": ["prettier --write"],
  // JSONやCSSファイル（Prettierのみ）
  "**/*.{json,css,scss,md}": ["prettier --write"],
};
