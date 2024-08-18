const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const utils = require("./utils");

marked.setOptions({ mangle: false, headerIds: false });

console.log("..starting build");

// preparing dist/ directory
const distDir = path.resolve(__dirname, "..", "dist");
const outPagesDir = path.resolve(distDir, "pages");
const outStylesDir = path.resolve(distDir, "styles");

if (fs.existsSync(distDir)) {
  console.log("cleaning up cached dist directory");
  fs.rmSync(distDir, { recursive: true });
}

fs.mkdirSync(distDir);
fs.mkdirSync(outPagesDir);
fs.mkdirSync(outStylesDir);

// filling dist/ with stuff from src/
// generating pages, stylesheets, etc.
const pagesDir = path.resolve(__dirname, "pages");
const files = fs.readdirSync(pagesDir);

const fileGroups = {};

console.log("building pages");
files.forEach((fileName) => {
  const filePath = path.resolve(pagesDir, fileName);
  const fileData = fs.readFileSync(filePath, "utf8");
  const lines = fileData.split("\n");

  // meta portion of the .md file
  const metaLines = lines.slice(0, 3);
  const label = metaLines.find((m) => m.startsWith("label")).split(":")[1];
  const name = metaLines.find((m) => m.startsWith("name")).split(":")[1];
  const rawDate = metaLines.find((m) => m.startsWith("date")).split(":")[1];
  const [month, day, year] = rawDate.split("/");
  const date = new Date(year, month - 1, day);
  console.log("date", rawDate, date);

  // actual content that is converted to html
  const content = lines.slice(3).join("\n");
  const body = marked.parse(content);
  const html = utils.createPage(body);

  // create the html file
  let htmlFileName = fileName.split(".md")[0];
  htmlFileName += ".html";
  console.log("htmlFileName", htmlFileName);
  const outPath = path.resolve(distDir, "pages", htmlFileName);
  fs.writeFileSync(outPath, html);

  if (!(label in fileGroups)) {
    fileGroups[label] = [];
  }

  fileGroups[label].push({ name, file: htmlFileName, date });
});

console.log("File Groups", fileGroups);

// TODO: build side bar with keys from FileGroups
const links = Object.keys(fileGroups);
console.log("dynamic links: ", links);
const sidebar = utils.sidebar(links);
const smallScreenNavBar = utils.smallScreenNavBar(links);

// for each key in FileGroups
// -> build a page that renders each file-meta
// -> for each category page, they will use the sidebar
Object.keys(fileGroups).forEach((group) => {
  console.log("generating page for group", group);
  const pages = fileGroups[group];
  const groupPage = utils.categoryPage(
    group,
    pages,
    sidebar,
    smallScreenNavBar,
  );
  const outpath = path.resolve(distDir, `${group}.html`);
  fs.writeFileSync(outpath, groupPage);
});

console.log("generating stylesheets");
// just copies over stylesheets, nothing fancy
const stylesDir = path.resolve(__dirname, "styles");
const styleFiles = fs.readdirSync(stylesDir);

styleFiles.forEach((fileName) => {
  const srcPath = path.resolve(stylesDir, fileName);
  const dstPath = path.resolve(outStylesDir, fileName);

  fs.copyFileSync(srcPath, dstPath);
});

console.log("generating js");
const jsDir = path.resolve(__dirname, "js");
const jsFiles = fs.readdirSync(jsDir);

jsFiles.forEach((fileName) => {
  const srcPath = path.resolve(jsDir, fileName);
  const dstPath = path.resolve(distDir, fileName);

  fs.copyFileSync(srcPath, dstPath);

  // for the index.js file, need to inject the category arrays
  // into the distributed version.
  if (fileName === "index.js") {
    let indexJsData = fs.readFileSync(dstPath, "utf8");
    // NOTE: any custom js can be injected  into index.js
    // at build time here
    // For example, you could do:
    // indexJsData.replace(__PAGES__, JSON.stringify(myPagesArray));
    // where __PAGES__ is a placeholder defined in the index.js file.
    fs.writeFileSync(dstPath, indexJsData);
  }
});

// generate entrypoint (dist/index.html)
const indexOutPath = path.resolve(distDir, "index.html");
const indexHtml = utils.createIndexPage(sidebar, smallScreenNavBar);
fs.writeFileSync(indexOutPath, indexHtml);

const aboutPath = path.resolve(distDir, "about.html");
const aboutHtml = utils.createAboutPage();
fs.writeFileSync(aboutPath, aboutHtml);

const _404OutPath = path.resolve(distDir, "404.html");
const _404Html = utils.get404Html();
fs.writeFileSync(_404OutPath, _404Html);

console.log("build done");
