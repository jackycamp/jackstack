const head = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jackstack</title>
        <link rel="stylesheet" href="index.css">
    </head>
`;

const createPage = (body) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
        ${body}
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
          <a href="code_stuff.html">code stuff</a>
          <a id="systems-link">systems</a>
          <a href="books.html">books</a>
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

module.exports.createPage = createPage;
module.exports.createIndexPage = createIndexPage;