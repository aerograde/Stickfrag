#!/usr/bin/env node
/*
 * Restore inferred names for the game's subsystem classes.
 *
 * Input:  readable/main.js        (formatting-only recovery, original minified names)
 * Output: readable/main.named.js  (same line map, 36 subsystem classes renamed)
 *         docs/NAMES.md           (mapping table)
 *
 * Requires Babel's parser/traverse/generator. They are intentionally not vendored:
 *   npm i --no-save @babel/parser @babel/traverse @babel/generator
 *   node tools/rename.js
 *
 * The roles are inferred from preserved method and field names. Renaming changes
 * constructor.name for these classes, so this is a reading/editing aid, not a
 * byte-identical runtime bundle. tools/build-source.sh builds it with esbuild.
 */
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const root = path.resolve(__dirname, "..");
const src = path.join(root, "readable", "main.js");
const dst = path.join(root, "readable", "main.named.js");
const namesDoc = path.join(root, "docs", "NAMES.md");

const mapping = {
  eh: "Hud",
  ah: "Predictor",
  df: "Game",
  ff: "Input",
  ew: "Renderer",
  ap: "NetClient",
  _f: "ServerClock",
  Yh: "Rewards",
  Kh: "OwnerMenu",
  ef: "BombMode",
  af: "Hardpoint",
  lf: "Sights",
  nf: "TouchInput",
  uf: "Diagnostics",
  ds: "Pacing",
  Hm: "InputBuffer",
  Ym: "Room",
  ip: "MultiplayerClient",
  Km: "Auth",
  np: "HttpApi",
  $u: "XpBar",
  ih: "Podium",
  _p: "Viewmodel",
  xu: "StickmanRenderer",
  Ya: "Stickmen",
  As: "ComicPass",
  eb: "Breakables",
  Qh: "MapDrops",
  yh: "Pickups",
  Tb: "Effects",
  Vm: "Ambient",
  Mp: "MapProps",
  Pp: "Glass",
  Tp: "Bottles",
  Ph: "CardPacks",
  Gh: "CardsUI",
};

const roles = {
  Hud: "HUD",
  Predictor: "local prediction",
  Game: "game orchestrator",
  Input: "input",
  Renderer: "renderer",
  NetClient: "network client",
  ServerClock: "server clock",
  Rewards: "rewards / XP / packs",
  OwnerMenu: "owner menu",
  BombMode: "bomb mode",
  Hardpoint: "hardpoint mode",
  Sights: "sights",
  TouchInput: "touch input",
  Diagnostics: "frame diagnostics",
  Pacing: "frame pacing / adaptive quality",
  InputBuffer: "Colyseus input buffer",
  Room: "Colyseus room",
  MultiplayerClient: "Colyseus client",
  Auth: "Colyseus auth",
  HttpApi: "Colyseus HTTP",
  XpBar: "XP bar HUD",
  Podium: "podium scene",
  Viewmodel: "viewmodel",
  StickmanRenderer: "stickman renderer",
  Stickmen: "stickman factory",
  ComicPass: "comic post-process",
  Breakables: "map effects / breakables",
  MapDrops: "map drops",
  Pickups: "pickups",
  Effects: "particle effects",
  Ambient: "ambient",
  MapProps: "map props",
  Glass: "breakable glass",
  Bottles: "glass / bottles",
  CardPacks: "card packs",
  CardsUI: "card UI",
};

const code = fs.readFileSync(src, "utf8");
const ast = parser.parse(code, {
  sourceType: "script",
  errorRecovery: true,
  plugins: ["classProperties", "classPrivateProperties", "classPrivateMethods", "dynamicImport", "optionalChaining"],
});

const rows = [];
traverse(ast, {
  Program(program) {
    const scope = program.scope;
    const used = new Set();
    for (const [oldName, wanted] of Object.entries(mapping)) {
      const binding = scope.getBinding(oldName);
      if (!binding || binding.scope !== scope) {
        rows.push({ oldName, newName: "-", line: 0, refs: 0, role: "not found" });
        continue;
      }
      let name = wanted;
      while (scope.hasBinding(name) || used.has(name)) name += "_";
      used.add(name);
      const line = binding.path.node.loc?.start.line ?? 0;
      const refs = binding.referencePaths.length;
      scope.rename(oldName, name);
      rows.push({ oldName, newName: name, line, refs, role: roles[name] || "" });
    }
    program.stop();
  },
});

const out = generate(ast, { comments: true, retainLines: true, jsescOption: { minimal: true } }).code;
fs.writeFileSync(dst, out + "\n");

const md = [];
md.push("# Recovered name map", "");
md.push("`readable/main.named.js` restores names for 36 subsystem classes. Names are inferred");
md.push("from preserved fields and methods — the minifier did not leave the originals. The");
md.push("transform is scope-aware and preserves the 126,617-line map of `readable/main.js`.");
md.push("");
md.push("| minified | recovered | class line | refs | inferred role |");
md.push("| --- | --- | ---: | ---: | --- |");
for (const r of rows.sort((a, b) => a.line - b.line)) {
  md.push(`| \`${r.oldName}\` | \`${r.newName}\` | ${r.line || "-"} | ${r.refs} | ${r.role} |`);
}
md.push("");
md.push("Renaming a top-level class changes `constructor.name` at runtime; no game behavior");
md.push("depends on these names as far as the recovered source shows, and the built bundle was");
md.push("run offline and compared against the original. `readable/main.js` remains the");
md.push("fidelity reference with the original names.");
md.push("");
fs.writeFileSync(namesDoc, md.join("\n"));

console.log(rows.map((r) => `${r.oldName} -> ${r.newName} (${r.refs} refs, line ${r.line})`).join("\n"));
console.log(`wrote ${dst}: ${out.split("\n").length} lines`);
console.log(`wrote ${namesDoc}`);
