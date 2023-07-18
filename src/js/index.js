const systemsPages = [
    { title: "Noob's guide to EKS", file: 'eks-getting-started.html'}
];

const handleSystemsClick = () => {
    console.log("handle systems click");
    let contentNode = document.getElementById("content");
    contentNode.innerHTML = '';

    let heading = document.createElement('h1');
    heading.textContent = 'systems';

    contentNode.appendChild(heading);

    let subheading = document.createElement('h3');
    subheading.textContent = 'reflections on design and implementations.';

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


window.onload = () => {
    let sysLink = document.getElementById('systems-link');
    if(sysLink) {
        sysLink.addEventListener('click', handleSystemsClick);
    }
}


