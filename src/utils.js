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
          <a id="codestuff-link">code stuff</a>
          <a id="systems-link">systems</a>
          <a id="books-link">books</a>
          <a href="https://github.com/jackycamp">github</a>
          <a href="index.html">root</a>
        </div>
        <div id="content" class="content">
          <h1>jackstack</h1>
          <h3>welcome to the home of my personal logs.</h3>
          <h3>explore my writings on systems design, code stuff, books, and other randomness.</h3>
          <h3>reach me at: jackcampa at p m dot me</h3>
          <h3>lol</h3>
        </div>
      </div>
    
      <!-- small screen nav bar on bottom -->
      <div class="bottom-nav">
        <a href="code_stuff.html">code stuff</a>
        <a href="404.html">systems</a>
        <a href="books.html">books</a>
        <a href="https://github.com/jackycamp">github</a>
        <a href="index.html">root</a>
      </div>
      <footer>
        <p>&copy; 2023 jackstack.lol. All rights reserved.</p>
      </footer>
      </body>
    </html>
    `;

    return html;
}

const get404Html = () => {
  const html = 
  `
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
      <p>&copy; 2023 jackstack.lol. All rights reserved.</p>
    </footer>
    </body>
  </html>
  `;
  return html;
}

module.exports.createPage = createPage;
module.exports.createIndexPage = createIndexPage;
module.exports.get404Html = get404Html;