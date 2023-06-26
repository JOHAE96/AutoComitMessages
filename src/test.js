const simpleGit = require("simple-git");
const baseDir = "/Users/johanneshauser/Developer/MyPlayground";

const options = {
  baseDir: "./",
  maxConcurrentProcesses: 6,
  trimmed: false,
};
const sGit = simpleGit(options); //.clean(CleanOptions.FORCE);

const status = JSON.stringify(sGit.status());
const diff = JSON.stringify(sGit.diff(["--staged"]));

console.log(status, "-->", diff);
