import { sanityClient } from '../../../sanityConfig';
import { 
  getUniqueStringId,
  transformToReferenceData } from '../../sanity/build/pageBuildSanity';

const transformContactPage = (
{
  contactTitle,
  styles
},
  imgBuffer
) => {
  const transformed = transformToReferenceData(styles);
  const formattedContactStyles = {
    _id: getUniqueStringId(contactTitle),
    _type: 'contactPage',
    contactTitle,
    contactStyles: transformed,
    contactImg: imgBuffer,
  }
  return formattedContactStyles;
};

const getContactPageData = async () => {
  const query = `*[_type=="contactPage"]{
    ...,
    "relatedStyles": *[_type=='root' && contactStyles._ref == root._id]{rootKey, data}
  }`;
  return await sanityClient.fetch(query);
};

export {
  transformContactPage,
  getContactPageData
}