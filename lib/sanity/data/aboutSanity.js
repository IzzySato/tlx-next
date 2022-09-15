import { sanityClient } from '../../../sanityConfig';
import { getUniqueStringId, transformToReferenceData } from '../build/pageBuildSanity';

const transformAboutPage = (
{
  aboutTitle,
  aboutDesc,
  styles
},
  imgBuffer
) => {
  const transformed = transformToReferenceData(styles);
  const formattedHomeStyles = {
    _id: getUniqueStringId(aboutTitle),
    _type: 'aboutPage',
    aboutTitle,
    aboutDesc,
    aboutStyles: transformed,
    aboutImg: imgBuffer,
  }
  return formattedHomeStyles;
};

const getAboutData = async () => {
  const query = `*[_type=="aboutPage"]{
    ...,
    "relatedStyles": *[_type=='root' && aboutStyles._ref == root._id]{rootKey, data}
  }`;
  return await sanityClient.fetch(query);
};

export {
  transformAboutPage,
  getAboutData
}