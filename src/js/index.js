const systemsPages = [
    { title: "Noob's guide to EKS", file: 'eks-getting-started.html'}
];

const bookPages = [];

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
        link.textContent = page.title;
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
    let subheadingText = "sometimes i collect notes and summaries from what i've read and compile them "
    subheadingText += "as an auxiliary mechanism for my own capture and retention purposes."
    subheading.textContent = subheadingText;

    contentNode.appendChild(subheading);

    let list = document.createElement('div');
    list.classList = ['scrollable link_list'];
    contentNode.appendChild(list);
    
    bookPages.forEach((page) => {
        let link = document.createElement('a');
        link.href = `pages/${page.file}`;
        link.textContent = page.title;
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
}


