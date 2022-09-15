import { sanityFetch } from "../lib/sanity/sanityFetch";

const insertSingleStyle = ({ rootKey, data }) =>
    document.documentElement.style.setProperty(rootKey, data);

const insertStyles = (array) =>
    array.forEach((data) =>
        insertSingleStyle(data));
  
const insertFonts = (fontData) => {
  fontData.map((data) =>
    {
      const headElement = document.head;
      let link = document.createElement('link');
      link.rel = data.rel;
      link.href = data.href;
      headElement.appendChild(link);
  });
};

const getGlobalData = async () => {
  const nav = await sanityFetch('nav');
  const footer = await sanityFetch('footer');
  const pageFont = await sanityFetch('pageFont');
  const contactHeader = await sanityFetch('contactHeader');
  const allData = [
      ...nav,
      ...footer,
      ...pageFont,
      ...contactHeader
      ];
  return allData;
}

const globalCSSInit = async (data) => {
  data.forEach((d) => {
    if (d._type === 'pageFont') {
      insertFonts(d.fontInfo);
    }
    insertStyles(d.styles);
  });
};

export {
  insertStyles,
  globalCSSInit,
  getGlobalData
}