import { sanityClient } from '../../../sanityConfig';
import { getUniqueStringId, transformToReferenceData } from '../build/pageBuildSanity';

const transformHomePage = (
{
  homeTitle,
  styles
},
  imgBuffer
) => {
  const transformed = transformToReferenceData(styles);
  const formattedHomeStyles = {
    _id: getUniqueStringId(homeTitle),
    _type: 'homePage',
    homeTitle,
    homeStyles: transformed,
    homeMainImg: imgBuffer,
  };
  return formattedHomeStyles;
};

const getHomeData = async () => {
  const query = `*[_type=="homePage"]{
    ...,
    "relatedStyles": *[_type=='root' && homeStyles._ref == root._id]{rootKey, data}
  }`;
  return await sanityClient.fetch(query);
};

export {
  transformHomePage,
  getHomeData
}