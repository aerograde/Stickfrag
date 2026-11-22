#!/usr/bin/env node
/*
 * Remove the dormant online transport from the offline client.
 *
 * Input:  readable/main.fast.js
 * Output: readable/main.offline.js
 *
 * The offline path never calls NetClient.connect, so these top-level classes
 * are dead weight. Function bodies that mention them are left alone; JS does
 * not resolve those names until the function runs.
 *
 * Requires: npm i --no-save @babel/parser @babel/traverse @babel/generator
 */
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const root = path.resolve(__dirname, "..");
const src = path.join(root, "readable", "main.fast.js");
const dst = path.join(root, "readable", "main.offline.js");
const names = new Set(["NetClient", "MultiplayerClient", "EC", "Room", "Auth", "HttpApi"]);

const code = fs.readFileSync(src, "utf8");
const ast = parser.parse(code, {
  sourceType: "script",
  errorRecovery: true,
  plugins: ["classProperties", "classPrivateProperties", "classPrivateMethods", "dynamicImport", "optionalChaining"],
});

let removed = [];
traverse(ast, {
  Program(program) {
    for (const [name, binding] of Object.entries(program.scope.bindings)) {
      if (!names.has(name)) continue;
      const decl = binding.path;
      if (decl.isVariableDeclarator()) {
        const parent = decl.parentPath;
        if (parent.isVariableDeclaration() && parent.node.declarations.length === 1) parent.remove();
        else decl.remove();
        removed.push(name);
      } else if (decl.isClassDeclaration() || decl.isFunctionDeclaration()) {
        decl.remove();
        removed.push(name);
      }
    }
    program.stop();
  },
});

if (removed.length !== names.size) {
  console.warn("removed", removed.join(", "), "expected", [...names].join(", "));
}

const out = generate(ast, { comments: true, retainLines: true, jsescOption: { minimal: true } }).code;
fs.writeFileSync(dst, out + "\n");
console.log(`removed ${removed.length}: ${removed.join(", ")}`);
console.log(`wrote ${dst}: ${out.split("\n").length} lines`);
