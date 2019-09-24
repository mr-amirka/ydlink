#!/usr/bin/env node
const program = require("commander");
const pkg = require("./package.json");
const { get } = require('mn-back-utils/request');

program
  .version(pkg.version, '-v, --version')
  .option("-l, --link [link]", "set Yandex.Disk public link");

program.on("--help", function() {
  console.log("");
  console.log("Examples:");
  console.log("");
  console.log("$ ydlink --link https://yadi.sk/d/vZ-3Cx8mfnn_lw");
});

program.parse(process.argv);

const { link } = program;

get("https://cloud-api.yandex.net:443/v1/disk/public/resources/download", {
  query: {
    "public_key": link
  }
}).then(r => console.log(r.href));
