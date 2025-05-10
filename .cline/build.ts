/**
 * プロンプトファイルを結合して .clinerules を生成するスクリプト
 */

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

// ファイルパスの設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RULES_DIR = path.join(__dirname, "./rules");
const ROO_MODES_DIR = path.join(__dirname, "./roomodes");
const OUTPUT_FILE = path.join(process.cwd(), ".clinerules");

// デバッグ情報を出力
console.log("Script is running!");
console.log("__filename:", __filename);
console.log("__dirname:", __dirname);
console.log("RULES_DIR:", RULES_DIR);
console.log("ROO_MODES_DIR:", ROO_MODES_DIR);
console.log("OUTPUT_FILE:", OUTPUT_FILE);
console.log("RULES_DIR exists:", fs.existsSync(RULES_DIR));
console.log("ROO_MODES_DIR exists:", fs.existsSync(ROO_MODES_DIR));

function parseFrontMatter(content: string): [any, string] {
  const frontMatter = content.match(/^---\n([\s\S]+?)\n---\n/);
  if (!frontMatter) {
    return [{}, content];
  }
  const parsed = yaml.load(frontMatter[1]);
  return [parsed, content.replace(frontMatter[0], "")];
}

type RooMode = {
  slug: string;
  name: string;
  roleDefinition: string;
  groups: string[];
  source: string;
  // additionalProperty
  __filename: string;
};

async function main() {
  console.log("Main function is running!");

  const roomodes: { customModes: Array<RooMode> } = {
    customModes: [],
  };

  if (fs.existsSync(ROO_MODES_DIR)) {
    console.log("Reading from ROO_MODES_DIR");
    const modeFiles = fs.readdirSync(ROO_MODES_DIR);
    console.log("Mode files found:", modeFiles);

    for (const file of modeFiles) {
      const content = fs.readFileSync(path.join(ROO_MODES_DIR, file), "utf-8");
      const slug = file.replace(".md", "");
      const [frontMatter, body] = parseFrontMatter(content);
      const results = {
        ...frontMatter,
        slug,
        roleDefinition: body,
        __filename: path.join(ROO_MODES_DIR, file),
      };
      roomodes.customModes.push(results);
    }
  } else {
    console.log("ROO_MODES_DIR does not exist");
  }

  try {
    // プロンプトファイルを読み込む
    const files: string[] = [];

    if (fs.existsSync(RULES_DIR)) {
      console.log("Reading from RULES_DIR");
      // Node.jsでのディレクトリ読み込み（非同期処理を同期的に書き換え）
      const entries = fs.readdirSync(RULES_DIR);
      console.log("Rule files found:", entries);

      for (const entry of entries) {
        const stat = fs.statSync(path.join(RULES_DIR, entry));
        if (stat.isFile() && entry.endsWith(".md") && !entry.startsWith("_")) {
          files.push(entry);
        }
      }
    } else {
      console.log("RULES_DIR does not exist");
    }

    console.log("Valid files to process:", files);

    // ファイル名でソート
    files.sort();

    // 各ファイルの内容を結合
    const contents: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(`${RULES_DIR}/${file}`, "utf-8");
      contents.push(content);
    }
    // .clinerules に書き出し
    let result = contents.join("\n\n");
    if (roomodes.customModes.length > 0) {
      // result = `${modeOutput}${result}`;
      result += `このプロジェクトには以下のモードが定義されています:`;
      // console.log(roomodes.customModes);
      for (const mode of roomodes.customModes) {
        // const def = roomodes.customModes.find((m) => m.name === mode)!;
        result += `\n- ${mode.slug} ${mode.name} at ${path.relative(
          process.cwd(),
          mode.__filename
        )}`;
      }
    }

    fs.writeFileSync(
      path.join(process.cwd(), ".roomodes"),
      JSON.stringify(roomodes, null, 2)
    );
    console.log(
      `Generated .roomodes from ${roomodes.customModes.length} mode files`
    );

    fs.writeFileSync(OUTPUT_FILE, result);
    console.log(`Generated ${OUTPUT_FILE} from ${files.length} prompt files`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    process.exit(1);
  }
}

// 条件を修正して必ず実行されるようにする
console.log("process.argv[1]:", process.argv[1]);
console.log("fileURLToPath(import.meta.url):", fileURLToPath(import.meta.url));
console.log(
  "Are they equal?",
  process.argv[1] === fileURLToPath(import.meta.url)
);

// 常に実行
main();
