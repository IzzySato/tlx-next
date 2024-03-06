// Helper
const insertSingleStyle = ({ rootKey, data }) => {
  document.documentElement.style.setProperty(rootKey, data);
}

// Helper
const insertStyles = (stylesArray) => {
  stylesArray.forEach((data) => insertSingleStyle(data));
};

// Helper
const insertFonts = (fontData) => {
  fontData.map(({ rel, href }) => {
    const headElement = document.head;
    let link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    headElement.appendChild(link);
  });
};

// insert all CSS :root values from sanity
const globalCSSInit = async () => {
  const response = await fetch('/api/globalCSS');
  const { root, font } = await response.json();
  insertStyles(root);
  insertFonts(font);
};

export { globalCSSInit };
