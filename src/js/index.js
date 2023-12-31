// populated at build time
const systemsPages = __SYSTEMS_PAGES__;
const bookPages = __BOOKS_PAGES__;
const codeStuffPages = __CODESTUFF_PAGES__;

const handleSystemsClick = () => {
    let contentNode = document.getElementById("content");
    contentNode.innerHTML = '';

    let heading = document.createElement('h1');
    heading.textContent = 'systems';

    contentNode.appendChild(heading);

    let subheading = document.createElement('h3');
    subheading.textContent = 'reflections, design, implementations, guides.';

    contentNode.appendChild(subheading);

    let list = document.createElement('div');
    list.classList = ['scrollable link_list'];
    contentNode.appendChild(list);
    
    systemsPages.forEach((page) => {
        let link = document.createElement('a');
        link.href = `pages/${page.file}`;
        link.textContent = page.name;
        list.appendChild(link);
    });
}

const handleBooksClick = () => {
    let contentNode = document.getElementById("content");
    contentNode.innerHTML = '';

    let heading = document.createElement('h1');
    heading.textContent = 'books';

    contentNode.appendChild(heading);

    let subheading = document.createElement('h3');
    let subheadingText = "sometimes i write about what i read."
    subheading.textContent = subheadingText;

    contentNode.appendChild(subheading);

    let list = document.createElement('div');
    list.classList = ['scrollable link_list'];
    contentNode.appendChild(list);
    
    bookPages.forEach((page) => {
        let link = document.createElement('a');
        link.href = `pages/${page.file}`;
        link.textContent = page.name;
        list.appendChild(link);
    });

};

const handleCodeStuffClick = () => {
    let contentNode = document.getElementById("content");
    contentNode.innerHTML = '';

    let heading = document.createElement('h1');
    heading.textContent = 'code stuff';

    contentNode.appendChild(heading);

    let subheading = document.createElement('h3');
    let subheadingText = "random code stuff, thoughts, and stories"
    subheading.textContent = subheadingText;

    contentNode.appendChild(subheading);

    let list = document.createElement('div');
    list.classList = ['scrollable link_list'];
    contentNode.appendChild(list);
    
    codeStuffPages.forEach((page) => {
        let link = document.createElement('a');
        link.href = `pages/${page.file}`;
        link.textContent = page.name;
        list.appendChild(link);
    });

};


window.onload = () => {
    let sysLink = document.getElementById('systems-link');
    if(sysLink) {
        sysLink.addEventListener('click', handleSystemsClick);
    }

    let booksLink = document.getElementById('books-link');
    if (booksLink) {
        booksLink.addEventListener('click', handleBooksClick)
    }

    let codestuffLink = document.getElementById('codestuff-link');
    if (codestuffLink) {
        codestuffLink.addEventListener('click', handleCodeStuffClick)
    }

    let sysLinkSm = document.getElementById("systems-link-sm");
    if (sysLinkSm) {
        sysLinkSm.addEventListener('click', handleSystemsClick);
    }

    let booksLinkSm = document.getElementById("books-link-sm");
    if (booksLinkSm) {
        booksLinkSm.addEventListener('click', handleBooksClick);
    }

    let codestuffLinkSm = document.getElementById("codestuff-link-sm");
    if (codestuffLinkSm) {
        codestuffLinkSm.addEventListener('click', handleCodeStuffClick);
    }
}


