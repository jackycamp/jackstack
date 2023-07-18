const fs = require('fs');
const path = require('path');
const {marked} = require('marked')
const utils = require('./utils');

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

files.forEach((fileName) => {
    const filePath = path.resolve(pagesDir, fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const body = marked.parse(fileData);
    const html = utils.createPage(body);

    let htmlFileName = fileName.split(".md")[0];
    htmlFileName += ".html";
    console.log("htmlFileName", htmlFileName);

    const outPath = path.resolve(distDir, 'pages', htmlFileName);
    fs.writeFileSync(outPath, html);
});

// just copies over stylesheets, nothing fancy
const stylesDir = path.resolve(__dirname, 'styles');
const styleFiles = fs.readdirSync(stylesDir);

styleFiles.forEach((fileName) => {
    const srcPath = path.resolve(stylesDir, fileName);
    const dstPath = path.resolve(outStylesDir, fileName);

    fs.copyFileSync(srcPath, dstPath);
});
