const fs = require('fs');
const path = require('path');
const {marked} = require('marked')
const utils = require('./utils');

marked.setOptions({ mangle: false, headerIds: false });

console.log("..starting build");

// preparing dist/ directory
const distDir = path.resolve(__dirname, '..', 'dist');
const outPagesDir = path.resolve(distDir, 'pages');
const outStylesDir = path.resolve(distDir, 'styles');

if (fs.existsSync(distDir)) {
    console.log("cleaning up cached dist directory");
    fs.rmSync(distDir, {recursive: true});
}

fs.mkdirSync(distDir);
fs.mkdirSync(outPagesDir);
fs.mkdirSync(outStylesDir);


// filling dist/ with stuff from src/
// generating pages, stylesheets, etc.
const pagesDir = path.resolve(__dirname, 'pages');
const files = fs.readdirSync(pagesDir);

const systemsPages = [];
const booksPages = [];
const codestuffPages = [];

console.log("building pages")

files.forEach((fileName) => {
    const filePath = path.resolve(pagesDir, fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const lines = fileData.split("\n");

    // meta portion of the file
    const metaLines = lines.slice(0,3);
    const label = metaLines.find((m) => m.startsWith("label")).split(":")[1];

    // actual content that is converted to html
    const content = lines.slice(3).join("\n");
    const body = marked.parse(content);
    const html = utils.createPage(body);

    // create the html file
    let htmlFileName = fileName.split(".md")[0];
    htmlFileName += ".html";
    console.log("htmlFileName", htmlFileName);
    const outPath = path.resolve(distDir, 'pages', htmlFileName);
    fs.writeFileSync(outPath, html);

    // classify the page
    if (label === 'systems') systemsPages.push(htmlFileName);
    if (label === 'books') booksPages.push(htmlFileName);
    if (label === 'codestuff') codestuffPages.push(htmlFileName);
});

console.log("systemsPages: ", systemsPages);
console.log("booksPages", booksPages);
console.log("code stuff pages: ", codestuffPages);


console.log("generating stylesheets");
// just copies over stylesheets, nothing fancy
const stylesDir = path.resolve(__dirname, 'styles');
const styleFiles = fs.readdirSync(stylesDir);

styleFiles.forEach((fileName) => {
    const srcPath = path.resolve(stylesDir, fileName);
    const dstPath = path.resolve(outStylesDir, fileName);

    fs.copyFileSync(srcPath, dstPath);
});

console.log("generating js");
// copy over the js
const jsDir = path.resolve(__dirname, 'js');
const jsFiles = fs.readdirSync(jsDir);

jsFiles.forEach((fileName) => {
    const srcPath = path.resolve(jsDir, fileName);
    const dstPath = path.resolve(distDir, fileName);

    fs.copyFileSync(srcPath, dstPath);
});

console.log("build done");
