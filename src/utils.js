const head = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jackstack</title>
        <link rel="stylesheet" href="../styles/index.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark-dimmed.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/bash.min.js"></script>
    </head>
`;

const createPage = (pageHtml) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
        <div class="page">
          ${pageHtml}
        </div>
        <div class="whitespace"></div>
        <script>hljs.highlightAll();</script>
    </body>
    </html>
    `;

  return html;
};

const createIndexPage = () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jackstack</title>
        <link rel="stylesheet" href="styles/index.css">
      </head>
      <body>
        <script src="index.js"></script>
      
      <div class="main">  
        <div class="sidebar">
          <a href="index.html">root</a>
          <a id="programming-link">programming</a>
          <a id="books-link">books</a>
          <a id="else-link">else</a>
          <a href="https://github.com/jackycamp">github</a>
          <a href="about.html">about me</a>
        </div>
        <div id="content" class="content">
          <h1>jackstack</h1>
          <h3>explore my writings on programming, systems, books, etc.</h3>
          <br />
          <h3 >reach me at: jackcampa at p m dot me</h3>
          <h3>lol</h3>
        </div>
      </div>
    
      <!-- small screen nav bar on bottom -->
      <div class="bottom-nav">
          <a href="index.html">root</a>
          <a id="programming-link-sm">programming</a>
          <a id="books-link-sm">books</a>
          <a id="else-link-sm">else</a>
          <a href="https://github.com/jackycamp">github</a>
          <a href="about.html">about me</a>
      </div>
      <footer>
        <p>&copy; 2024 jackstack.lol. All rights reserved.</p>
      </footer>
      </body>
    </html>
    `;
  return html;
};

const createAboutPage = () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jackstack</title>
        <link rel="stylesheet" href="styles/index.css">
      </head>
      <body>
        <script src="index.js"></script>
      
      <div class="main">  
        <div class="sidebar">
          <a href="index.html">root</a>
          <a id="codestuff-link">code stuff</a>
          <a id="systems-link">systems</a>
          <a id="books-link">books</a>
          <a href="https://github.com/jackycamp">github</a>
          <a href="about.html">about me</a>
        </div>
        <div id="content" class="content">
          <h1>About me</h1>
          <h2>I&apos;m Jack Campanella.</h2>
          <p>I&apos;m calm under pressure, with a laid back intensity.</p>
          <p>I love solving problems, learning, and helping others grow.</p>
          <p>Building great products and debugging large complex systems are my thing.</p>
          <p>I could talk all day about my neovim setup, intelligence augmentation, and offline first robots.</p>
          <p>I&apos;m definitely a little crazy.</p>
        </div>
      </div>
    
      <!-- small screen nav bar on bottom -->
      <div class="bottom-nav">
          <a href="index.html">root</a>
          <a id="codestuff-link-sm">code stuff</a>
          <a id="systems-link-sm">systems</a>
          <a id="books-link-sm">books</a>
          <a href="https://github.com/jackycamp">github</a>
          <a href="about.html">about me</a>
      </div>
      <footer>
        <p>&copy; 2024 jackstack.lol. All rights reserved.</p>
      </footer>
      </body>
    </html>
    `;
  return html;
};

const get404Html = () => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>jackstack</title>
      <link rel="stylesheet" href="styles/index.css">
    </head>
    <body>

    <div class="main">
      <div class="content" style="flex-grow: 0">
        <h1>four oh four</h1>
        <h3>lol</h3>
      </div>
    </div>

    <footer>
      <p>&copy; 2024 jackstack.lol. All rights reserved.</p>
    </footer>
    </body>
  </html>
  `;
  return html;
};

module.exports.createPage = createPage;
module.exports.createIndexPage = createIndexPage;
module.exports.get404Html = get404Html;
module.exports.createAboutPage = createAboutPage;
