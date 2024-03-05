import { sanityClient } from '../../sanityConfig';

const query = (type) => `*[_type == "${ type }"] { ... }`;

const sanityFetch = async (type, pageSlug='') => {
  try {
    const data = (pageSlug === '') ? await sanityClient.fetch(query(type))
    :  await sanityClient.fetch(query(type), {pageSlug});
    if (!data) {
      return {
        notFound: true
      }
    } else {
      return data
    }
  } catch (err) {
    console.log(err);
    throw err;
  };
};

const deleteData = () => {
  //sanityClient.delete({ query: '*[_type == "servicePage"]'});
  // sanityClient.delete({ query: '*[_type == "homePage"]'});
  // sanityClient.delete({ query: '*[_type == "pageFont"]'});
  // sanityClient.delete({ query: '*[_type == "contactHeader"]'});
  // sanityClient.delete({ query: '*[_type == "nav"]'});
  // sanityClient.delete({ query: '*[_type == "footer"]'});
  // sanityClient.delete({ query: '*[_type == "service"]'});
  // sanityClient.delete({ query: '*[_type == "contactHeader"]'});
  // sanityClient.delete({ query: '*[_type == "global"]'});
  // sanityClient.delete({ query: '*[_type == "estimate"]'});
  // sanityClient.delete({ query: '*[_type == "font"]'});
  // sanityClient.delete({ query: '*[_type == "root"]'});
  // sanityClient.delete({ query: '*[_type == "aboutPage"][0]'});
  // sanityClient.delete({ query: '*[_type == "servicePage"][0]'});
  // sanityClient.delete({ query: '*[_type == "contactPage"][0]'});
  //sanityClient.delete({ query: '*[_type == "aboutPage" && _id == "ourstory1660612210442"]'});
};

// const getStyleDoc = async () => {
//   const query = '*[_type == "home"]';
//   const test= await sanityClient.fetch(query);
// };

export {
  sanityFetch,
  deleteData
}