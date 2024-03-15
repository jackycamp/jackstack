// populated at build time
const bookPages = __BOOKS_PAGES__;
const programmingPages = __PROGRAMMING_PAGES__;
const elsePages = __ELSE_PAGES__;

const handleProgrammingClick = () => {
  let contentNode = document.getElementById("content");
  contentNode.innerHTML = "";

  let heading = document.createElement("h1");
  heading.textContent = "programming";

  contentNode.appendChild(heading);

  let subheading = document.createElement("h3");
  subheading.textContent = "reflections, systems, guides, notes, ya know.";

  contentNode.appendChild(subheading);

  let list = document.createElement("div");
  list.classList = ["scrollable link_list"];
  contentNode.appendChild(list);

  programmingPages.forEach((page) => {
    let link = document.createElement("a");
    link.href = `pages/${page.file}`;
    link.textContent = page.name;
    list.appendChild(link);
  });
};

const handleBooksClick = () => {
  let contentNode = document.getElementById("content");
  contentNode.innerHTML = "";

  let heading = document.createElement("h1");
  heading.textContent = "books";

  contentNode.appendChild(heading);

  let subheading = document.createElement("h3");
  let subheadingText = "some books i've read that i felt like writing about";
  subheading.textContent = subheadingText;

  contentNode.appendChild(subheading);

  let list = document.createElement("div");
  list.classList = ["scrollable link_list"];
  contentNode.appendChild(list);

  bookPages.forEach((page) => {
    let link = document.createElement("a");
    link.href = `pages/${page.file}`;
    link.textContent = page.name;
    list.appendChild(link);
  });
};

const handleElseClick = () => {
  let contentNode = document.getElementById("content");
  contentNode.innerHTML = "";

  let heading = document.createElement("h1");
  heading.textContent = "else";

  contentNode.appendChild(heading);

  let subheading = document.createElement("h3");
  let subheadingText = "the dungeon for all the other stuff";
  subheading.textContent = subheadingText;

  contentNode.appendChild(subheading);

  let list = document.createElement("div");
  list.classList = ["scrollable link_list"];
  contentNode.appendChild(list);

  elsePages.forEach((page) => {
    let link = document.createElement("a");
    link.href = `pages/${page.file}`;
    link.textContent = page.name;
    list.appendChild(link);
  });
};

window.onload = () => {
  let booksLink = document.getElementById("books-link");
  if (booksLink) {
    booksLink.addEventListener("click", handleBooksClick);
  }
  let programmingLink = document.getElementById("programming-link");
  if (programmingLink) {
    programmingLink.addEventListener("click", handleProgrammingClick);
  }
  let elseLink = document.getElementById("else-link");
  if (elseLink) {
    elseLink.addEventListener("click", handleElseClick);
  }

  let booksLinkSm = document.getElementById("books-link-sm");
  if (booksLinkSm) {
    booksLinkSm.addEventListener("click", handleBooksClick);
  }
  let programmingLinkSm = document.getElementById("programming-link-sm");
  if (programmingLinkSm) {
    programmingLinkSm.addEventListener("click", handleProgrammingClick);
  }
  let elseLinkSm = document.getElementById("else-link-sm");
  if (elseLinkSm) {
    elseLinkSm.addEventListener("click", handleElseClick);
  }
};
