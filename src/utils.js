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

module.exports.createPage = createPage;